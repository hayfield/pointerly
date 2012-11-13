Pointerly.Home = function(){
	this.domElement = document.createElement('div');

	this.domElement.style.width = '100px';
	this.domElement.style.height = '100px';
	this.domElement.style.backgroundColor = 'blue';
	this.domElement.id = 'homePosition';

	document.body.appendChild( this.domElement );
};
