/**
	An environment within which a Pointerly experiment can be run
	@constructor
	@param {Pointerly.Setup.Environment|object} setup The settings which define how the environment works
*/
Pointerly.Environment = function( setup ){
	if( !setup.replaying ){
		Pointerly.CURRENT_ENVIRONMENT = this;
	}

	var environment = this;
	this.setup = setup;

	/**
		The way in which data will be stored
		@type Pointerly.Storage
	*/
	this.storage = new Pointerly.Storage();

	/**
		The way in which data will be logged
		@type Pointerly.Logger
	*/
	this.logger = new Pointerly.Logger();

	/**
		A scene which contains objects within the environment
		@type Pointerly.Scene
	*/
	this.scene = new Pointerly.Scene();

	/**
		A renderer to display what's in the environment
		@type Pointerly.Renderer
	*/
	this.renderer = new Pointerly.Renderer();
	document.body.appendChild( this.renderer.domElement );
	/**
		Renders the environment
	*/
	this.render = function(){
		environment.renderer.render( environment.scene );
	};
	
	/**
		The Home Position
		@type Pointerly.Home
	*/
	this.homePosition = new Pointerly.Home( setup.homePosition );
	Pointerly.onresize();

	/**
		The shapes which are found within the environment
		@type Pointerly.Shape[]
	*/
	this.shapes = [];
	
	/**
		Adds a shape to the environemnt
		@param {Pointerly.Shape} shape The shape to add
		@param {number} [row] The row in which the shape is located
		@param {number} [col] The column in which the shape is located
	*/
	this.addShape = function( shape, row, col ){
		if( !(environment.shapes[row] instanceof Array) && typeof row === 'number' && typeof col === 'number' ){
			environment.shapes[row] = [];
		}
		if( typeof row === 'number' && typeof col === 'number' ){
			environment.shapes[row][col] = shape;
			environment.scene.addObject( environment.shapes[row][col] );
		} else {
			environment.shapes.push( shape );
			environment.scene.addObject( environment.shapes[environment.shapes.length-1] );
		}
		if( !environment.setup.replaying ){
			environment.logger.logCreatedShape( shape );
		}
	};

	/**
		Removes a shape from the environment
		@param {Pointerly.Shape} shape The shape to remove from the environment
	*/
	this.removeShape = function( shape ){
		environment.scene.removeObject( shape );
		if( !environment.setup.replaying ){
			environment.logger.logRemovedShape( shape );
		}

		var idx = environment.shapes.indexOf( shape );
		if( idx !== -1 ){
			environment.shapes.splice( idx, 1 );
		} else {
			for( var i = 0; i < environment.shapes.length; i++ ){
				idx = environment.shapes[i].indexOf( shape );
				if( idx !== -1 ){
					environment.shapes[i].splice( idx, 1 );
					return;
				}
			}
		}
	};

	/**
		Resets the shapes that are found within the environment
	*/
	this.resetShapes = function(){
		environment.objects().forEach(function( shape ){
			environment.removeShape( shape );
		});
		environment.shapes = [];
		environment.scene.removeAllObjects();
	};
	/**
		Generates shapes layed out in the specified manner
	*/
	this.generateShapes = function(){
		environment.resetShapes();

		if( typeof setup !== 'object' ){
			return;
		}
		
		if( typeof environment.setup.shapeLayout === 'function' ){
			environment.setup.shapeLayout( environment, environment.setup );
		} else if ( typeof setup.shapeLayout === 'string' ){
			Pointerly.ShapeGeneration.FromString( environment.setup.shapeLayout, environment, environment.setup );
		}
	};
	/**
		Sets up shapes
	*/
	var setupShapes = function(){
		environment.generateShapes();
	};
	if( setup.autoGenerateShapes ){
		setupShapes();
	}

	/**
		Flattens the array containing the shapes within the environment to 1D
		@returns {Pointerly.Shape[]} The shapes within the environment
	*/
	this.objects = function(){
		var arr = [];

		return arr.concat.apply( arr, environment.shapes );
	};

	/**
		Sets up the click handler
	*/
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
	
	/**
		A render loop that will update what is displayed
	*/
	var renderLoop = function(){
		environment.render();
		if( !setup.fixedViewBetweenEvents && !environment.logger.replaying ){
			environment.logger.log();
			if( setup.displayMouseTrail ){
				environment.logger.displayMousePositions( environment.renderer.domElement.getContext('2d') );
			}
			window.requestAnimationFrame( renderLoop );
		}
	};
	if( !setup.replaying ){
		renderLoop();
	}
};
