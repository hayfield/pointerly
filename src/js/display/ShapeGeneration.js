Pointerly.ShapeGeneration = Pointerly.ShapeGeneration || {};

Pointerly.ShapeGeneration.TYPES = Pointerly.ShapeGeneration.TYPES || {};

Pointerly.ShapeGeneration.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.ShapeGeneration.TYPES[type.toLowerCase()] = funct;
	}
};

Pointerly.ShapeGeneration.SetupDefaults = function(){
	Pointerly.ShapeGeneration.Register( 'grid2d', Pointerly.ShapeGeneration.Grid2D );
	Pointerly.ShapeGeneration.Register( '2dgrid', Pointerly.ShapeGeneration.Grid2D );
	Pointerly.ShapeGeneration.Register( 'grid', Pointerly.ShapeGeneration.Grid2D );
};

Pointerly.ShapeGeneration.FromString = function( type, environment, setup ){
	if( Pointerly.ShapeGeneration.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ShapeGeneration.TYPES[type.toLowerCase()]( environment, setup );
	}
};

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
	//environment.addShape(new Pointerly.Shape.)
};
