Pointerly.Environment = function( setup ){
	Pointerly.CURRENT_ENVIRONMENT = this;

	var environment = this;
	this.setup = setup;

	this.scene = new Pointerly.Scene();

	this.renderer = new Pointerly.Renderer;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.render = function(){
		environment.renderer.render( environment.scene );
	};

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

	var setupClickHandler = function(){
		if( typeof setup !== 'object' || typeof setup.clickType !== 'string' ){
			return;
		}

		Pointerly.ClickHandler.FromString( setup.clickType );
	};
	setupClickHandler();
	
	var renderLoop = function(){
		environment.render();
		if( !setup.fixedViewBetweenEvents ){
			window.requestAnimationFrame( renderLoop );
		}
	};
	renderLoop();
};
