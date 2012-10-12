Pointerly.ShapeGeneration = Pointerly.ShapeGeneration || {};

Pointerly.ShapeGeneration.FromString = function( type, environment, setup ){
	switch( type.toLowerCase() ){
		case '2dgrid':
		case 'grid2d':
			Pointerly.ShapeGeneration.Grid2D( environment, setup );
			break;
	}
};

Pointerly.ShapeGeneration.Grid2D = function( environment, setup ){
	for( var i = 0; i < setup.rowsOfShapes; i++ ){
		environment.shapes[i] = [];
		for( var j = 0; j < setup.columnsOfShapes; j++ ){
			environment.shapes[i].push(new setup.shapes[Math.floor(Math.random()*setup.shapes.length)]({
				width: 200,
				height: 200,
				position: new THREE.Vector3( 200*i, 0, 200*j ),
				color: setup.colors[Math.floor(Math.random()*setup.colors.length)]
			}));

			environment.scene.addObject( environment.shapes[i][j] );
		}
	}
};
