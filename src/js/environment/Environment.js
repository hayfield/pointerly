Pointerly.Environment = function( setup ){
	if( !setup.replaying ){
		Pointerly.CURRENT_ENVIRONMENT = this;
	}

	var environment = this;
	this.setup = setup;

	this.logger = new Pointerly.Logger({
		mousePosition: true,
		mouseClicks: true,
		canvasSize: true
	});

	this.scene = new Pointerly.Scene();

	this.renderer = new Pointerly.Renderer;
	document.body.appendChild( this.renderer.domElement );
	this.render = function(){
		environment.renderer.render( environment.scene );
	};

	this.homePosition = new Pointerly.Home();
	if( !setup.homePosition ){
		document.body.removeChild( this.homePosition.domElement );
	}
	Pointerly.onresize();

	this.shapes = [];
	
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

	var resetShapes = function(){
		environment.shapes = [];
		environment.scene.removeAllObjects();
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
