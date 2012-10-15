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
};

Pointerly.ShapeGeneration.FromString = function( type, environment, setup ){
	if( Pointerly.ShapeGeneration.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ShapeGeneration.TYPES[type.toLowerCase()]( environment, setup );
	}
};

Pointerly.ShapeGeneration.Grid2D = function( environment, setup ){
	for( var row = 0; row < setup.rowsOfShapes; row++ ){
		environment.shapes[row] = [];
		for( var col = 0; col < setup.columnsOfShapes; col++ ){
			environment.shapes[row].push(new setup.shapes[Math.floor(Math.random()*setup.shapes.length)]({
				width: 200,
				height: 200,
				position: new Pointerly.Vector2( 200*col, 200*row ),
				color: setup.colors[Math.floor(Math.random()*setup.colors.length)]
			}));

			environment.scene.addObject( environment.shapes[row][col] );
		}
	}
};
