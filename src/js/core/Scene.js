Pointerly.Scene = function(){
	this.objects = [];
};

Pointerly.Scene.prototype.addObject = function( obj ) {
	if( this.objects.indexOf(obj) === -1 ){
		this.objects.push(obj);
	}
};

Pointerly.Scene.prototype.removeAllObjects = function(){
	this.objects = [];
};
