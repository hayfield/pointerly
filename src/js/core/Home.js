Pointerly.Home = function(){
	this.domElement = document.createElement('div');

	this.domElement.width = 100;
	this.domElement.height = 100;
	this.domElement.backgroundColor = 'blue';
	this.domElement.id = 'homePosition';

	document.body.appendChild( this.domElement );
};
