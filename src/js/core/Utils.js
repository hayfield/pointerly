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
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

Pointerly.Vector2 = function( x, y ){
	this.x = x || 0;
	this.y = y || 0;
};
