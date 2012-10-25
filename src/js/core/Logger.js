Pointerly.Logger = function( loggerSetup ){
	var logger = this,
		setup = loggerSetup;

	this.data = {};
	this.lastMousePosition = {
		x: 0,
		y: 0
	};

	this.resetData = function( reallySure ){
		if( reallySure === true ){
			logger.data = {};
			logger.data.startTime = Date.now();
			logger.data.lastCheck = logger.data.startTime;

			if( setup.mousePosition ){
				logger.data.mousePosition = [];
			}
		}
	};

	this.displayMousePositions = function( ctx, displayMethod ){
		var dataArr = logger.data.mousePosition,
			numberOfPositions = 500,
			displayMethod = displayMethod || 'line';
		if( dataArr.length === 0 ){
			return;
		}

		var displayedData = dataArr.slice(Math.max(0, dataArr.length-numberOfPositions), dataArr.length);
		if( displayMethod === 'dot' ){
			displayedData.forEach(function( el, idx ){
				ctx.fillStyle = 'rgba( 255, 100, 0, ' + idx / Math.min(numberOfPositions, dataArr.length) + ' )';
				ctx.beginPath();
				ctx.arc( el.x, el.y, 4, 0, Math.PI*2, true );
				ctx.fill();
			});
		} else if( displayMethod === 'line' ){
			ctx.lineWidth = 3;
			ctx.lineJoin = 'round';
			for( var idx = 1; idx < displayedData.length; idx++ ){
				var el = displayedData[idx];
				ctx.strokeStyle = 'rgba( 255, 100, 0, ' + idx / Math.min(numberOfPositions, dataArr.length) + ' )';
				ctx.beginPath();
				ctx.moveTo( displayedData[idx-1].x, displayedData[idx-1].y );
				ctx.lineTo( el.x, el.y );
				ctx.stroke();
			};
		}
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