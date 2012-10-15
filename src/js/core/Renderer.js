Pointerly.Renderer = function(){
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		canvasWidth, canvasHeight;

	this.domElement = canvas;

	this.setSize = function( width, height ){
		canvasWidth = width;
		canvasHeight=  height;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	};

	this.render = function( scene ){
		ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
		scene.objects.forEach(function( obj ){
			console.log( obj, obj.canvas, obj.ctx, obj.position.x, obj.position.y );
			ctx.drawImage( obj.canvas, obj.position.x, obj.position.y );
		});
	};
};
