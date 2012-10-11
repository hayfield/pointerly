Pointerly.Shape = function(){
	var material = Pointerly.Material.red,
		geometry = new THREE.CubeGeometry( 800, 100, 800 );

	var shape = this;

	this.width = 512;
	this.height = 512;
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.texture = new THREE.Texture( this.canvas );
	this.material = new THREE.MeshBasicMaterial( { map: this.texture } );

	this.draw = function( drawing ){
		drawing( shape.canvas );

		shape.texture.needsUpdate = true;
	};

	this.draw(function(){
	var canvas = arguments[0];
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "orange";
	ctx.fillRect(0,0,512,512);
	ctx.fillStyle = "red";
	ctx.fillRect(25,25,220,220);
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
	ctx.moveTo(110,75);
	ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
	ctx.moveTo(65,65);
	ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
	ctx.moveTo(95,65);
	ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
	ctx.stroke();
	});

	THREE.Mesh.call( this, geometry, this.material );
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;
