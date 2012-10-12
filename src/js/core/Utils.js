Pointerly.Utils = Pointerly.Utils || {};

Pointerly.Utils.ObjToVector3 = function( obj ){
	if( typeof obj !== 'object' ){
		return new THREE.Vector3( 0, 0, 0 );
	}

	var x = typeof obj.x === 'number' ? obj.x : 0,
		y = typeof obj.y === 'number' ? obj.y : 0,
		z = typeof obj.z === 'number' ? obj.z : 0;

	return new THREE.Vector3( x, y, z );
};
