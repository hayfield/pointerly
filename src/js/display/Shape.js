Pointerly.Shape = function( shapeSetup ){
	var shape = this;

	this.width = 200;
	this.height = 200;
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.display = function( drawing ){
		var settings = {
			canvas: shape.canvas,
			width: shape.width,
			height: shape.height,
			ctx: shape.canvas.getContext('2d')
		};

		drawing( settings );
	};

	this.setColor = function( color ){
		if( arguments.length === 0 ){
			color = shape.color;
		} else {
			shape.color = color;
		}

		var ctx = shape.canvas.getContext('2d');
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
	};

	this.setColor( 'red' );

	if( typeof shapeSetup === 'object' && shapeSetup.hasOwnProperty('color') ){
		this.setColor( shapeSetup.color );
	}

	if( typeof shapeSetup === 'object' && shapeSetup.hasOwnProperty('position') ){
		this.position = shapeSetup.position;
	}
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;

Pointerly.Shape.prototype.toString = function(){
	return 'Shape';
};
