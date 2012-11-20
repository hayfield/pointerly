/**
	@namespace A namespace for methods of generating shape layouts
*/
Pointerly.ShapeGeneration = Pointerly.ShapeGeneration || {};

/**
	The methods of shape generation which have been defined
	@private
*/
Pointerly.ShapeGeneration.TYPES = Pointerly.ShapeGeneration.TYPES || {};

/**
	Registers a method of generating shapes against a name. Names are case-insensitive
	@param {string} type The name to give the method of generation
	@param {function} funct The function to generate shapes using
*/
Pointerly.ShapeGeneration.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.ShapeGeneration.TYPES[type.toLowerCase()] = funct;
	}
};

/**
	Sets up the default shape generation techniques
*/
Pointerly.ShapeGeneration.SetupDefaults = function(){
	Pointerly.ShapeGeneration.Register( 'grid2d', Pointerly.ShapeGeneration.Grid2D );
	Pointerly.ShapeGeneration.Register( '2dgrid', Pointerly.ShapeGeneration.Grid2D );
	Pointerly.ShapeGeneration.Register( 'grid', Pointerly.ShapeGeneration.Grid2D );
	Pointerly.ShapeGeneration.Register( 'experiment', Pointerly.ShapeGeneration.Experiment );
};

/**
	Generates shapes in the given environment based on the given type
	@param {string} type The type of shape generation to use
	@param {Pointerly.Environment} environment The environment to generate shapes within
	@param {object} [setup] Any additional settings the generation techniques requires to work
*/
Pointerly.ShapeGeneration.FromString = function( type, environment, setup ){
	if( Pointerly.ShapeGeneration.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ShapeGeneration.TYPES[type.toLowerCase()]( environment, setup );
	}
};

/**
	Generates shapes in a 2D grid
	@param {Pointerly.Environment} environment The environment in which to generate shapes
	@param {object} setup Additional settings for creating the grid
*/
Pointerly.ShapeGeneration.Grid2D = function( environment, setup ){
	var setup = setup || {},
		shapeGenSetup = setup.shapeGenSettings || {},
		shapeWidth = shapeGenSetup.shapeWidth || 200,
		shapeHeight = shapeGenSetup.shapeHeight || 200,
		shapePaddingHorizontal = shapeGenSetup.shapePaddingHorizontal || 0,
		shapePaddingVertical = shapeGenSetup.shapePaddingVertical || 0;

	for( var row = 0; row < shapeGenSetup.rowsOfShapes; row++ ){
		for( var col = 0; col < shapeGenSetup.columnsOfShapes; col++ ){
			environment.addShape(new setup.shapes[Math.floor(Math.random()*setup.shapes.length)]({
				width: shapeWidth,
				height: shapeHeight,
				position: new Pointerly.Vector2( (shapeWidth+shapePaddingHorizontal)*col, (shapeHeight+shapePaddingVertical)*row ),
				color: setup.colors[Math.floor(Math.random()*setup.colors.length)]
			}), row, col);
		}
	}
};

Pointerly.ShapeGeneration.Experiment = function( environment, setup ){
	environment.addShape(new Pointerly.Shapes.Rectangle({
		width: 40,
		height: environment.renderer.domElement.height,
		color: 'black',
		position: new Pointerly.Vector2( environment.renderer.domElement.width / 4, 0 )
	}));
	environment.addShape(new Pointerly.Shapes.Rectangle({
		width: 40,
		height: 40,
		color: 'black',
		position: new Pointerly.Vector2( environment.renderer.domElement.width / 2 - 20, environment.renderer.domElement.height / 2 - 20 )
	}));
};
