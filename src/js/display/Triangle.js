Pointerly.Triangle = function(){
	Pointerly.Shape.call( this );

	this.display();

	this.draw();
};

Pointerly.Triangle.prototype = new Pointerly.Shape;
Pointerly.Triangle.prototype.constructor = Pointerly.Triangle;

