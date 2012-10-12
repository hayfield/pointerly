Pointerly.Circle = function( shapeSetup ){
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

Pointerly.Circle.prototype = new Pointerly.Shape;
Pointerly.Circle.prototype.constructor = Pointerly.Circle;

Pointerly.Circle.prototype.toString = function(){
	return "Circle";
};
