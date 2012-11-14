Pointerly.Home = function( homeSetup ){
	var home = this,
		width, height;

	width = typeof homeSetup.width === 'number' ? homeSetup.width : 40;
	height = typeof homeSetup.height === 'number' ? homeSetup.height : 40;

	this.domElement = document.createElement('div');

	this.domElement.style.width = width + 'px';
	this.domElement.style.height = height + 'px';
	this.domElement.style.backgroundColor = 'blue';
	this.domElement.className += 'homePosition';

	this.setPosition = function( x, y ){
		home.domElement.style.left = x + 'px';
		home.domElement.style.top = y + 'px';
	};

	this.setSize = function( width, height ){
		home.domElement.style.width = width;
		home.domElement.style.height = height;
	};

	document.body.appendChild( this.domElement );
};
