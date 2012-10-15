Pointerly.Renderer = function(){
	var canvas = document.createElement('canvas'),
		context = this.canvas.getContext('2d');

	this.domElement = canvas;

	this.setSize = function( width, height ){
		canvas.width = width;
		canvas.height = height;
	};

	this.render = function( scene, camera ){
		scene.objects.forEach(function(a, b){
			console.log(a, b);
		});
	};
};
