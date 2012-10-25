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

	this.logger = new Pointerly.Logger({
		mousePosition: true,
		mouseClicks: true
	});

	this.shapes = [];
	var resetShapes = function(){
		environment.shapes = [];
		environment.scene.removeAllObjects();
	};
	this.addShape = function( shape, row, col ){
		if( !(environment.shapes[row] instanceof Array) ){
			environment.shapes[row] = [];
		}
		environment.shapes[row][col] = shape;
		environment.scene.addObject( environment.shapes[row][col] );
	};
	this.generateShapes = function(){
		resetShapes();

		if( typeof setup !== 'object' ){
			return;
		}
		
		if( typeof environment.setup.shapeLayout === 'function' ){
			environment.setup.shapeLayout( environment, environment.setup );
		} else if ( typeof setup.shapeLayout === 'string' ){
			Pointerly.ShapeGeneration.FromString( environment.setup.shapeLayout, environment, environment.setup );
		}
	};
	var setupShapes = function(){
		environment.generateShapes();
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
		environment.onShapeClick = setup.onShapeClick || function(){};
		environment.onNonShapeClick = setup.onNonShapeClick || function(){};
		environment.numberOfClickedShapes = 0;
	};
	setupClickHandler();
	
	var renderLoop = function(){
		environment.render();
		if( !setup.fixedViewBetweenEvents ){
			environment.logger.log();
			environment.logger.displayMousePositions( environment.renderer.domElement.getContext('2d') )
			window.requestAnimationFrame( renderLoop );
		}
	};
	renderLoop();
};
