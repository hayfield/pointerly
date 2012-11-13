Pointerly.Home = function(){
	var home = this;

	this.domElement = document.createElement('div');

	this.domElement.style.width = '100px';
	this.domElement.style.height = '100px';
	this.domElement.style.backgroundColor = 'blue';
	this.domElement.className += 'homePosition';

	this.setPosition = function( x, y ){

	};

	this.setSize = function( width, height ){
		home.domElement.style.width = width;
		home.domElement.style.height = height;
	};

	document.body.appendChild( this.domElement );
};
