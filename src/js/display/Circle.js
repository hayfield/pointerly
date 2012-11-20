/**
	A Circle shape
	@constructor
	@extends Pointerly.Shape
	@param {object} shapeSetup The setup for the shape
*/
Pointerly.Shapes.Circle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

	/**
		Draws a Circle on the given context
		@param {object} settings An object which specifies how and where the drawing should be done
	*/
	this.draw = function( settings ){
		var width = settings.width,
			height = settings.height,
			ctx = settings.ctx;

		ctx.beginPath();
		ctx.arc( width/2, height/2, Math.min(width/2, height/2), 0, Math.PI*2, true );
		ctx.fill();
	};

	this.display( this.draw );
};

Pointerly.Shapes.Circle.prototype = new Pointerly.Shape;
Pointerly.Shapes.Circle.prototype.constructor = Pointerly.Shapes.Circle;

/**
	@returns The name of the shape
*/
Pointerly.Shapes.Circle.prototype.toString = function(){
	return 'Circle';
};
