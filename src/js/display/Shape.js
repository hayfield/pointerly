Pointerly.Shape = function( setup ){
	var shape = this;

	this.width = 512;
	this.height = 512;

	if( typeof setup === 'object' ){
		this.geometry = new THREE.CubeGeometry( setup.width, 1, setup.height );
	} else {
		this.geometry = new THREE.CubeGeometry( this.width, 1, this.height );
	}
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.texture = new THREE.Texture( this.canvas );
	this.material = new THREE.MeshBasicMaterial( { map: this.texture } );

	this.display = function( drawing ){
		drawing( shape.canvas );

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

	if( typeof setup === 'object' && setup.hasOwnProperty('color') ){
		this.setColor( setup.color );
	}

	THREE.Mesh.call( this, this.geometry, this.material );

	if( typeof setup === 'object' && setup.hasOwnProperty('position') ){
		//console.log('bobble');
		this.position = setup.position;
	}
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;
