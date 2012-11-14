Pointerly.Home = function( homeSetup ){
	var home = this,
		width, height;

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

	this.domElement = document.createElement('div');

	this.setSize( width, height );
	this.domElement.style.backgroundColor = 'blue';
	this.domElement.className += 'homePosition';

	document.body.appendChild( this.domElement );
};
