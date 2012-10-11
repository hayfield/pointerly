Pointerly.Shape = function(){
	var material = Pointerly.Material.red,
		geometry = new THREE.CubeGeometry( 800, 100, 800 );

	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "orange";
	ctx.fillRect(0,0,256,256);
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
	
	var texture = new THREE.Texture( canvas );
	texture.needsUpdate = true;

	var texMaterial = new THREE.MeshBasicMaterial( { map: texture } );

	THREE.Mesh.call( this, geometry, texMaterial );
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;
