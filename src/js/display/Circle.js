Pointerly.Shapes.Circle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

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

Pointerly.Shapes.Circle.prototype.toString = function(){
	return 'Circle';
};
