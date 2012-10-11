Pointerly.Triangle = function(){
	Pointerly.Shape.call( this );

	this.setColor( 'blue' );

	this.draw = function( canvas ){
		var width = canvas.width,
			height = canvas.height,
			ctx = canvas.getContext('2d');

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
