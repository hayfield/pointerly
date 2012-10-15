Pointerly.Environment = function( setup ){
	Pointerly.CURRENT_ENVIRONMENT = this;

	var environment = this;
	this.setup = setup;

	this.scene = new Pointerly.Scene();

	this.renderer = new Pointerly.Renderer;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.rendererContext = this.renderer.domElement.getContext('experimental-webgl');

	this.shapes = [];
	var setupShapes = function(){
		if( typeof setup !== 'object' ){
			return;
		}
		
		if( typeof setup.shapeLayout === 'function' ){
			setup.shapeLayout( environment, setup );
		} else if ( typeof setup.shapeLayout === 'string' ){
			Pointerly.ShapeGeneration.FromString( setup.shapeLayout, environment, setup );
		}
	};
	setupShapes();

	this.objects = function(){
		var arr = [];

		return arr.concat.apply( arr, environment.shapes );
	};
	
	var setupCamera = function(){
		if( typeof setup !== 'object' || typeof setup.camera !== 'object' ){
			Pointerly.Camera.FromString( 'default', environment, setup );
			return;
		}

		if( typeof setup.camera.type === 'string' ){
			Pointerly.Camera.FromString( setup.camera.type, environment, setup );
		} else {
			Pointerly.Camera.FromString( 'default', environment, setup );
		}
	};
	setupCamera();

	var setupClickHandler = function(){
		if( typeof setup !== 'object' || typeof setup.clickType !== 'string' ){
			return;
		}

		Pointerly.ClickHandler.FromString( setup.clickType );
	};
	setupClickHandler();

	//Pointerly.Camera.BoundToView( environment );
	
	var renderLoop = function(){
		environment.renderer.render( environment.scene, environment.camera );
		window.requestAnimationFrame( renderLoop );
	};
	renderLoop();
};
