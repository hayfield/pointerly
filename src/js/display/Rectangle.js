Pointerly.Shapes.Rectangle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

	this.draw = function( settings ){
		var width = settings.width,
			height = settings.height,
			ctx = settings.ctx;

		ctx.fillRect( 0, 0, width, height );
	};

	this.display( this.draw );
};

Pointerly.Shapes.Rectangle.prototype = new Pointerly.Rectangle;
Pointerly.Shapes.Rectangle.prototype.constructor = Pointerly.Rectangle;

Pointerly.Shapes.Rectangle.prototype.toString = function(){
	return 'Rectangle';
};
