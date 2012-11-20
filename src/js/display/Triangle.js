/**
	A Triangle shape
	@constructor
	@extends Pointerly.Shape
	@param {Pointerly.Setup.Shape|object} shapeSetup The setup for the shape
*/
Pointerly.Shapes.Triangle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

	/**
		Draws a Triangle on the given context
		@param {Pointerly.Setup.ShapeDrawing|object} settings An object which specifies how and where the drawing should be done
	*/
	this.draw = function( settings ){
		var width = settings.width,
			height = settings.height,
			ctx = settings.ctx;

		ctx.beginPath();
		ctx.moveTo( width / 2, 0 );
		ctx.lineTo( width, height );
		ctx.lineTo( 0, height );
		ctx.fill();
	};

	this.display( this.draw );
};

Pointerly.Shapes.Triangle.prototype = new Pointerly.Shape;
Pointerly.Shapes.Triangle.prototype.constructor = Pointerly.Shapes.Triangle;

/**
	@returns The name of the shape
*/
Pointerly.Shapes.Triangle.prototype.toString = function(){
	return 'Triangle';
};
