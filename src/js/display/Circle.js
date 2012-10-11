Pointerly.Circle = function( setup ){
	Pointerly.Shape.call( this, setup );

	this.draw = function( canvas ){
		var width = canvas.width,
			height = canvas.height,
			ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.arc( width/2, height/2, Math.min(width/2, height/2), 0, Math.PI*2, true );
		ctx.fill();
	};

	this.display( this.draw );
};

Pointerly.Circle.prototype = new Pointerly.Shape;
Pointerly.Circle.prototype.constructor = Pointerly.Circle;
