Pointerly.Home = function( homeSetup ){
	var home = this,
		width,
		height,
		color;

	if( typeof homeSetup === 'undefined' ){
		return;
	}

	this.setPosition = function( x, y ){
		home.domElement.style.left = x + 'px';
		home.domElement.style.top = y + 'px';
	};

	this.setSize = function( newWidth, newHeight ){
		width = newWidth;
		height = newHeight;
		home.domElement.style.width = width + 'px';
		home.domElement.style.height = height + 'px';
	};

	width = typeof homeSetup.width === 'number' ? homeSetup.width : 40;
	height = typeof homeSetup.height === 'number' ? homeSetup.height : 40;
	color = typeof homeSetup.color !== 'undefined' ? homeSetup.color : 'orange';

	this.domElement = document.createElement('div');

	this.setSize( width, height );
	this.domElement.style.backgroundColor = color;
	this.domElement.className += 'homePosition';

	document.body.appendChild( this.domElement );

	var onHomeEnter = function(){
		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaEnter();
		if( typeof homeSetup.onEnter === 'function' ){
			homeSetup.onEnter();
		}
	};

	var onHomeExit = function(){
		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaExit();
		if( typeof homeSetup.onExit === 'function' ){
			homeSetup.onExit();
		}
	};

	this.domElement.addEventListener( 'mouseover', onHomeEnter );
	this.domElement.addEventListener( 'mouseout', onHomeExit );
};
