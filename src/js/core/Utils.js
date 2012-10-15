Pointerly.Utils = Pointerly.Utils || {};

Pointerly.Utils.ObjToVector3 = function( obj ){
	if( typeof obj !== 'object' ){
		return new Pointerly.Vector3( 0, 0, 0 );
	}

	var x = typeof obj.x === 'number' ? obj.x : 0,
		y = typeof obj.y === 'number' ? obj.y : 0,
		z = typeof obj.z === 'number' ? obj.z : 0;

	return new Pointerly.Vector3( x, y, z );
};

Pointerly.Utils.ObjToVector2 = function( obj ){
	if( typeof obj !== 'object' ){
		return new Pointerly.Vector2( 0, 0 );
	}

	var x = typeof obj.x === 'number' ? obj.x : 0,
		y = typeof obj.y === 'number' ? obj.y : 0;

	return new Pointerly.Vector2( x, y );
};

Pointerly.Vector3 = function( x, y, z ){
	THREE.Vector3.call( this, x, y, z );
};

Pointerly.Vector3.prototype = new THREE.Vector3;
Pointerly.Vector3.prototype.constructor = Pointerly.Vector3;

Pointerly.Vector2 = function( x, y ){
	THREE.Vector2.call( this, x, y );
};

Pointerly.Vector2.prototype = new THREE.Vector2;
Pointerly.Vector2.prototype.constructor = Pointerly.Vector2;
