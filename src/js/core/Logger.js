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

	this.displayMousePositions = function( ctx ){
		var dataArr = logger.data.mousePosition,
			numberOfPositions = 100;
		ctx.fillStyle = 'blue';

		dataArr.slice(Math.max(0, dataArr.length-numberOfPositions), dataArr.length).forEach(function(el, idx){
			ctx.fillStyle = 'rgba( 0, 0, 255, ' + idx / Math.min(numberOfPositions, dataArr.length) + ' )';
			ctx.beginPath();
			ctx.arc( el.x, el.y, 4, 0, Math.PI*2, true );
			ctx.fill();
		});
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
