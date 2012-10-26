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
		Pointerly.CURRENT_ENVIRONMENT.logger.logCanvasResize( width, height );
	};

	this.render = function( scene ){
		ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
		scene.objects.forEach(function( obj ){
			ctx.drawImage( obj.canvas, obj.position.x, obj.position.y );
		});
	};
};
