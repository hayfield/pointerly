/**
	A scene which contains things
	@constructor
*/
Pointerly.Scene = function(){
	/**
		The objects which exist in a scene
		@type Array
	*/
	this.objects = [];
};

/**
	If an object does not already exist within the scene, add it to the scene
	@param obj The object to add to the scene
*/
Pointerly.Scene.prototype.addObject = function( obj ) {
	if( this.objects.indexOf(obj) === -1 ){
		this.objects.push(obj);
	}
};

/**
	If an object is within the scene, remove it
	@param obj The object to remove
*/
Pointerly.Scene.prototype.removeObject = function( obj ){
	var idx = this.objects.indexOf( obj );

	if( idx !== -1 ){
		this.objects.splice( idx, 1 );
	}
};

/**
	Removes all objects from the scene
*/
Pointerly.Scene.prototype.removeAllObjects = function(){
	this.objects = [];
};
