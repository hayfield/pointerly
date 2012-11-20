/**
	A Logger that logs the status of a Pointerly environment
	@constructor
*/
Pointerly.Logger = function(){
	var logger = this;

	/**
		Whether the logger is currently replaying
		@type boolean
	*/
	this.replaying = false;
	this.replayEnv = null;
	this.replayStartTime = Number.MAX_VALUE;
	this.replayPreviousStepTime = Number.MIN_VALUE;
	this.replayCurrentTime = Number.MIN_VALUE;
	this.replayData = null;

	/**
		The logged data
		@type Pointerly.LoggerData|object
	*/
	this.data = {};
	/**
		The last position that a mouse was moved to
		@type object
	*/
	this.lastMousePosition = {
		x: 0,
		y: 0
	};
	this.shapes = [];
	this.numberOfPositions = 150;

	// can replay by clicking around and then calling:
	// Pointerly.CURRENT_ENVIRONMENT.logger.replay( Pointerly.CURRENT_ENVIRONMENT.logger.data )
	/**
		Updates the current time in a replay
	*/
	var updateReplayTime = function(){
		logger.replayPreviousStepTime = logger.replayCurrentTime;
		logger.replayCurrentTime = Pointerly.now() - logger.replayStartTime + logger.replayData.startTime;
	};

	/**
		Updates the visible shapes in a replay
	*/
	var updateReplayShapes = function(){
		logger.replayData.createdShapes.forEach(function( el ){
			if( el.createTime > logger.replayPreviousStepTime && el.createTime <= logger.replayCurrentTime ){
				var createdShape = Pointerly.Shapes.CreateFromLogger(el);
				el.replayShape = createdShape;
				logger.replayEnv.addShape( createdShape );
			} else if( el.removeTime > logger.replayPreviousStepTime && el.removeTime <= logger.replayCurrentTime ){
				logger.replayEnv.removeShape( el.replayShape );
			}
		});
	};

	/**
		Updates the canvas size in a replay
	*/
	var updateReplayCanvasSize = function(){
		logger.replayData.canvasSize.forEach(function( el ){
			if( el.timestamp > logger.replayPreviousStepTime && el.timestamp <= logger.replayCurrentTime ){
				logger.replayEnv.renderer.setSize( el.width, el.height );
			}
		});
	};

	/**
		A loop to cause replaying to occur
	*/
	var replayLoop = function(){
		updateReplayTime();
		updateReplayCanvasSize();
		updateReplayShapes();
		logger.replayEnv.render();
		var mousePositions = logger.replayData.mousePosition.filter(function( el ){
			return el.timestamp <= logger.replayCurrentTime;
		});
		mousePositions = mousePositions.slice(Math.max(0, mousePositions.length-logger.numberOfPositions), mousePositions.length);
		var mouseClicks = logger.replayData.mouseClicks.filter(function( el ){
			if( mousePositions.length === 0 ){
				return false;
			}
			return (el.timestamp >= mousePositions[0].timestamp) && (el.timestamp <= logger.replayCurrentTime);
		});
		logger.renderMousePositions( logger.replayEnv.renderer.domElement.getContext('2d'), mousePositions, mouseClicks, logger.numberOfPositions );
		
		window.requestAnimationFrame( replayLoop );
	};

	/**
		Replays a series mouse, shape and canvas events
		@param {object} data The logged data to replay
	*/
	this.replay = function( data ){
		document.body.removeChild( Pointerly.CURRENT_ENVIRONMENT.renderer.domElement );
		logger.replayEnv = new Pointerly.Environment({
			replaying: true
		});
		logger.replaying = true;
		logger.replayStartTime = Pointerly.now();
		logger.replayData = data;
		replayLoop();
	};

	/**
		Saves the currently logged data to the available storage
	*/
	this.save = function(){
		console.log('logger saving');
		Pointerly.CURRENT_ENVIRONMENT.storage.save( 'logger-data', JSON.stringify(logger.data) );
	};

	/**
		Resets the data object that stores the log of what's happened
		@param {boolean} [reallySure] Set to <code>true</code> to actually reset the data
	*/
	this.resetData = function( reallySure ){
		if( reallySure === true ){
			logger.data = {};
			logger.data.startTime = Pointerly.now();
			logger.data.lastCheck = logger.data.startTime;

			logger.data.createdShapes = [];

			logger.data.homeAreaInteractions = [];
			logger.data.homeAreaSize = [];
			logger.data.homeAreaPosition = [];

			logger.data.mousePosition = [];
			logger.data.mouseClicks = [];

			logger.data.canvasSize = [];
		}
	};

	/**
		Renders the positions that the mouse has been in to the screen
		@param {CanvasRenderingContext2D} ctx The canvas context to draw on
		@param {Pointerly.LoggedPosition[]} mousePositions The positions that the mouse has been in
		@param {Pointerly.LoggedMouseClick[]} clickPositions The positions that the mouse clicked
		@param {number} numberOfPositions The number of positions to render
	*/
	this.renderMousePositions = function( ctx, mousePositions, clickPositions, numberOfPositions ){
		var displayedData = mousePositions;
		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		for( var idx = 1; idx < displayedData.length; idx++ ){
			var el = displayedData[idx];
			ctx.strokeStyle = 'rgba( 255, 100, 0, ' + idx / Math.min(numberOfPositions, displayedData.length) + ' )';
			ctx.beginPath();
			ctx.moveTo( displayedData[idx-1].x, displayedData[idx-1].y );
			ctx.lineTo( el.x, el.y );
			ctx.stroke();
		};

		clickPositions.forEach(function( el ){
			ctx.fillStyle = 'rgb( 255, 100, 0 )';
			ctx.beginPath();
			ctx.arc( el.x, el.y, 8, 0, Math.PI*2, true );
			ctx.fill();
		});
	};

	/**
		Displays mouse positions so they can be seen
		@param {CanvasRenderingContext2D} ctx The context on which to draw the mouse positions
	*/
	this.displayMousePositions = function( ctx ){
		var dataArr = logger.data.mousePosition;
		if( dataArr.length === 0 ){
			return;
		}
		var mousePositions = dataArr.slice(Math.max(0, dataArr.length-logger.numberOfPositions), dataArr.length);
		var mouseClicks = logger.data.mouseClicks.filter(function( el ){
			return el.timestamp > mousePositions[0].timestamp;
		});
		logger.renderMousePositions( ctx, mousePositions, mouseClicks, logger.numberOfPositions );
	};

	/**
		Logs the last recorded mouse position with the provided timestamp
		@param (number) timestamp The time to log the position as occurring
	*/
	this.logMouseMovement = function( timestamp ){
		logger.data.mousePosition.push(new Pointerly.LoggedPosition(
			timestamp,
			logger.lastMousePosition.x,
			logger.lastMousePosition.y
		));
	};

	/**
		Logs mouse movement as occurring at the current point in time
	*/
	this.log = function(){
		var timestamp = Pointerly.now();

		logger.logMouseMovement( timestamp );

		logger.data.lastCheck = timestamp;
	};

	/**
		Caches mouse movement in an object so that it can be logged at 60fps rather than when the mousemove events fire
		@param {MouseEvent} event The mouse movement event
	*/
	this.trackMouseMovement = function( event ){
		logger.lastMousePosition = {
			x: event.clientX,
			y: event.clientY
		};
	};

	/**
		Convert the given shape into a loggable format and log it
		@param {Pointerly.Shape} shape The shape to log the creation of
	*/
	this.logCreatedShape = function( shape ){
		logger.shapes.push( shape );
		logger.data.createdShapes.push(new Pointerly.LoggableShape(shape, logger.data.createdShapes.length));
	};

	/**
		Update the <code>removeTime</code> of the given shape to the current point in time
		@param {Pointerly.Shape} shape The shape to log the removal of
	*/
	this.logRemovedShape = function( shape ){
		var idx = logger.shapes.indexOf( shape );
		if( idx !== -1 ){
			logger.data.createdShapes[idx].removeTime = Pointerly.now();
		}
	};

	/**
		Finds the LoggerID of a shape
		@param {Pointerly.Shape} shape The shape to find the ID of
		@returns The ID of the shape or <code>Pointerly.NO_SHAPE_CLICKED</code> if not found
	*/
	this.getShapeID = function( shape ){
		if( !(shape instanceof Pointerly.Shape) ){
			return Pointerly.NO_SHAPE_CLICKED;
		} else {
			return logger.shapes.indexOf( shape );
		}
	};

	/**
		Log the resizing of the canvas at the current point in time
		@param {number} width The width of the canvas
		@param {number} height The height of the canvas
	*/
	this.logCanvasResize = function( width, height ){
		logger.data.canvasSize.push(new Pointerly.LoggedSize(
			Pointerly.now(),
			width,
			height
		));
	};

	/**
		Log the position of a mouse click and what has been clicked
		@param {MouseEvent} event The mouse click event
		@param {Pointerly.Shape|null} object The shape that has been clicked if a shape was clicked, otherwise <code>null</code>
	*/
	this.logMouseClick = function( event, object ){
		logger.data.mouseClicks.push(new Pointerly.LoggedMouseClick(
			Pointerly.now(),
			event.clientX,
			event.clientY,
			logger.getShapeID(object)
		));
	};

	/**
		Log the interaction with the Home Position
		@param {number} interaction Either <code>Pointerly.HOME_ENTER</code> or <code>Pointerly.HOME_EXIT</code>
	*/
	var logHomeInteraction = function( interaction ){
		logger.data.homeAreaInteractions.push(new Pointerly.HomeAreaInteraction(
			Pointerly.now(),
			interaction
		));
	};

	/**
		Log an ENTER interaction with the Home Position
	*/
	this.logHomeAreaEnter = function(){
		logHomeInteraction( Pointerly.HOME_ENTER );
	};

	/**
		Log an EXIT interaction with the Home Position
	*/
	this.logHomeAreaExit = function(){
		logHomeInteraction( Pointerly.HOME_EXIT );
	};

	/**
		Log the positioning of the Home Position at the current point in time
		@param {number} x The x position of the Home Position
		@param {number} y The y position of the Home Position
	*/
	this.logHomeAreaPosition = function( x, y ){
		logger.data.homeAreaPosition.push(new Pointerly.LoggedPosition(
			Pointerly.now(),
			logger.lastMousePosition.x,
			logger.lastMousePosition.y
		));
	};

	/**
		Log the resizing of the Home Position at the current point in time
		@param {number} width The width of the Home Position
		@param {number} height The height of the Home Position
	*/
	this.logHomeAreaSize = function( width, height ){
		logger.data.homeAreaSize.push(new Pointerly.LoggedSize(
			Pointerly.now(),
			width,
			height
		));
	};

	document.addEventListener( 'mousemove', logger.trackMouseMovement );

	logger.resetData( true );
};

/**
	Returns the current point in time. Uses high resolution timing if available
	@returns The current point in time
*/
Pointerly.now = function(){
	return (typeof performance === 'object' && typeof performance.webkitNow === 'function') ? performance.webkitNow() : Date.now();
};
