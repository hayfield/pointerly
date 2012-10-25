Pointerly.Logger = function( loggerSetup ){
	var logger = this,
		setup = loggerSetup;

	this.replaying = false;
	this.replayEnv = null;
	this.replayStartTime = Number.MAX_VALUE;
	this.replayData = null;

	this.data = {};
	this.lastMousePosition = {
		x: 0,
		y: 0
	};
	this.shapes = [];

	var replayLoop = function(){
		replayEnv.render();
		replayEnv.logger.displayMousePositions( replayEnv.renderer.domElement.getContext('2d') );
		window.requestAnimationFrame( replayLoop );
	};
	this.replay = function( data ){
		logger.replayEnv = new Pointerly.Environment({
			replaying: true
		});
		logger.replaying = true;
		logger.replayStartTime = Date.now();
		logger.replayData = data;
		replayLoop();
	};

	this.resetData = function( reallySure ){
		if( reallySure === true ){
			logger.data = {};
			logger.data.startTime = Date.now();
			logger.data.lastCheck = logger.data.startTime;

			logger.data.createdShapes = [];
			if( setup.mousePosition ){
				logger.data.mousePosition = [];
			}
			if( setup.mouseClicks ){
				logger.data.mouseClicks = [];
			}
		}
	};

	this.renderMousePositions = function( ctx, displayMethod, mousePositions, clickPositions, numberOfPositions ){
		var displayedData = mousePositions;
		if( displayMethod === 'dot' ){
			displayedData.forEach(function( el, idx ){
				ctx.fillStyle = 'rgba( 255, 100, 0, ' + idx / Math.min(numberOfPositions, displayedData.length) + ' )';
				ctx.beginPath();
				ctx.arc( el.x, el.y, 4, 0, Math.PI*2, true );
				ctx.fill();
			});
		} else if( displayMethod === 'line' ){
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
		}
	};

	this.displayMousePositions = function( ctx, displayMethod ){
		var dataArr = logger.data.mousePosition,
			numberOfPositions = 150,
			displayMethod = displayMethod || 'line';
		if( dataArr.length === 0 ){
			return;
		}
		var mousePositions = dataArr.slice(Math.max(0, dataArr.length-numberOfPositions), dataArr.length);
		var mouseClicks = logger.data.mouseClicks.filter(function( el ){
			return el.timestamp > mousePositions[0].timestamp;
		});
		logger.renderMousePositions( ctx, displayMethod, mousePositions, mouseClicks, numberOfPositions );
	};

	this.logMouseMovement = function( timestamp ){
		logger.data.mousePosition.push(new Pointerly.LoggedMousePosition(
			timestamp,
			logger.lastMousePosition.x,
			logger.lastMousePosition.y
		));
	};

	this.log = function(){
		var timestamp = Date.now();
		if( setup.mousePosition ){
			logger.logMouseMovement( timestamp );
		}

		logger.data.lastCheck = timestamp;
	};

	this.trackMouseMovement = function( event ){
		logger.lastMousePosition = {
			x: event.clientX,
			y: event.clientY
		};
	};

	this.logCreatedShape = function( shape ){
		logger.shapes.push( shape );
		logger.data.createdShapes.push(new Pointerly.LoggableShape(shape, logger.data.createdShapes.length));
	};

	this.logRemovedShape = function( shape ){
		var idx = logger.shapes.indexOf( shape );
		if( idx !== -1 ){
			logger.data.createdShapes[idx].removeTime = Date.now();
		}
	};

	this.getShapeID = function( shape ){
		if( !(shape instanceof Pointerly.Shape) ){
			return -2;
		} else {
			return logger.shapes.indexOf( shape );
		}
	};

	this.logMouseClick = function( event, object ){
		logger.data.mouseClicks.push(new Pointerly.LoggedMouseClick(
			Date.now(),
			event.clientX,
			event.clientY,
			logger.getShapeID(object)
		));
	};

	if( setup.mousePosition ){
		document.addEventListener( 'mousemove', logger.trackMouseMovement );
	}

	logger.resetData( true );
};

Pointerly.LoggedMousePosition = function( timestamp, x, y ){
	this.timestamp = timestamp;
	this.x = x;
	this.y = y;
};

Pointerly.LoggedMouseClick = function( timestamp, x, y, shapeID ){
	this.timestamp = timestamp;
	this.x = x;
	this.y = y;
	this.clickedShapeID = shapeID;
};

Pointerly.LoggableShape = function( shape, id ){
	this.id = id;
	this.color = shape.color;
	this.height = shape.height;
	this.width = shape.width;
	this.position = shape.position;
	this.type = shape.toString();
	this.createTime = Date.now();
	this.removeTime = Number.MAX_VALUE;
};
