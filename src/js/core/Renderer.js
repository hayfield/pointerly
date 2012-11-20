/**
	A renderer that will display a Pointerly scene
	@constructor
*/
Pointerly.Renderer = function(){
	/**
		The canvas that the renderer inserts into the DOM
	*/
	var canvas = document.createElement('canvas');
	/**
		The context on which drawing will occur
	*/
	var ctx = canvas.getContext('2d');
	/**
		The width of the canvas
		@type number
	*/
	var canvasWidth;
	/**
		The height of the canvas
		@type number
	*/
	var canvasHeight;

	this.domElement = canvas;

	/**
		Sets the size of the renderer
		@param {number} width The width of the renderer
		@param {number} height The height of the renderer
	*/
	this.setSize = function( width, height ){
		canvasWidth = width;
		canvasHeight = height;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		Pointerly.CURRENT_ENVIRONMENT.logger.logCanvasResize( width, height );
	};

	/**
		Renders a scene onto the renderer's context
		@param {Pointerly.Scene} scene The scene to render
	*/
	this.render = function( scene ){
		ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
		scene.objects.forEach(function( obj ){
			ctx.drawImage( obj.canvas, obj.position.x, obj.position.y );
		});
	};
};
