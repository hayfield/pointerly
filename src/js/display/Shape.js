Pointerly.Shape = function( shapeSetup ){
	var shape = this;

	this.width = 200;
	this.height = 200;

	if( typeof shapeSetup === 'object' ){
		this.geometry = new THREE.CubeGeometry( shapeSetup.width, shapeSetup.height, 1 );
	} else {
		this.geometry = new THREE.CubeGeometry( this.width, this.height, 1 );
	}
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.texture = new THREE.Texture( this.canvas );
	this.material = new THREE.MeshBasicMaterial( { map: this.texture } );

	this.display = function( drawing ){
		var settings = {
			canvas: shape.canvas,
			width: shape.width,
			height: shape.height,
			ctx: shape.canvas.getContext('2d')
		};

		drawing( settings );

		shape.texture.needsUpdate = true;
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

	THREE.Mesh.call( this, this.geometry, this.material );

	if( typeof shapeSetup === 'object' && shapeSetup.hasOwnProperty('position') ){
		this.position = shapeSetup.position;
	}
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;

Pointerly.Shape.prototype.toString = function(){
	return 'Shape';
};
