Pointerly.Shape = function(){
	var material = Pointerly.Material.red,
		geometry = new THREE.CubeGeometry( 800, 100, 800 );

	THREE.Mesh.call( this, geometry, material );
};

Pointerly.Shape.prototype = new THREE.Mesh();
Pointerly.Shape.prototype.constructor = Pointerly.Shape;
