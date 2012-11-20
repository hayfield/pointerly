/**
	A Rectangle shape
	@constructor
	@param {object} shapeSetup The setup for the shape
*/
Pointerly.Shapes.Rectangle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

	/**
		Draws a Rectangle on the given context
		@param {object} settings An object which specifies how and where the drawing should be done
	*/
	this.draw = function( settings ){
		var width = settings.width,
			height = settings.height,
			ctx = settings.ctx;

		ctx.fillRect( 0, 0, width, height );
	};

	this.display( this.draw );
};

Pointerly.Shapes.Rectangle.prototype = new Pointerly.Shape;
Pointerly.Shapes.Rectangle.prototype.constructor = Pointerly.Shapes.Rectangle;

/**
	Returns the name of the shape in upper case
*/
Pointerly.Shapes.Rectangle.prototype.toString = function(){
	return 'Rectangle';
};
