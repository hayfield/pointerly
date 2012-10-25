Pointerly.Scene = function(){
	this.objects = [];
};

Pointerly.Scene.prototype.addObject = function( obj ) {
	if( this.objects.indexOf(obj) === -1 ){
		this.objects.push(obj);
	}
};

Pointerly.Scene.prototype.removeObject = function( obj ){
	var idx = this.objects.indexOf( obj );

	if( idx !== -1 ){
		this.objects.splice( idx, 1 );
	}
};

Pointerly.Scene.prototype.removeAllObjects = function(){
	this.objects = [];
};
