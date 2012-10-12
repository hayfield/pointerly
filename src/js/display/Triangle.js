Pointerly.Triangle = function( shapeSetup ){
	Pointerly.Shape.call( this, shapeSetup );

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

Pointerly.Triangle.prototype = new Pointerly.Shape;
Pointerly.Triangle.prototype.constructor = Pointerly.Triangle;

Pointerly.Triangle.prototype.toString = function(){
	return 'Triangle';
};
