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
				logger.data.mousePosition = {};
			}
		}
	};

	this.logMouseMovement = function( event ){
		logger.data.lastMousePosition = {
			x: event.screenX,
			y: event.screenY
		};
	};

	if( setup.mousePosition ){
		document.addEventListener( 'mousemove', logger.logMouseMovement );
	}
};
