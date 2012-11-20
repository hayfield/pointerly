/**
	@namespace The Pointerly utility namespace
*/
Pointerly.Utils = Pointerly.Utils || {};

/**
	Converts an object to a Pointerly.Vector2
	@param {object} [obj] The object to convert, preferably containing <code>x</code> and <code>y</code> properties
	@returns {Pointerly.Vector2} The <code>x</code> and <code>y</code> properties are set to the corresponding properties of the provided object, otherwise default to 0
*/
Pointerly.Utils.ObjToVector2 = function( obj ){
	if( typeof obj !== 'object' ){
		return new Pointerly.Vector2( 0, 0 );
	}

	var x = typeof obj.x === 'number' ? obj.x : 0,
		y = typeof obj.y === 'number' ? obj.y : 0;

	return new Pointerly.Vector2( x, y );
};

/**
	Creates a new Vector in 2D space
	@constructor
	@param {number} x The x coordinate
	@param {number} y The y coordinate
*/
Pointerly.Vector2 = function( x, y ){
	/**
		The x coordinate
		@default 0
	*/
	this.x = x || 0;
	/**
		The y coordinate
		@default 0
	*/
	this.y = y || 0;
};
