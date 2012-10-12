Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var setup = {
		shapes: [ Pointerly.Triangle, Pointerly.Circle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ],
		rowsOfShapes: 2,
		columnsOfShapes: 3,
		generateShapes: function( environment, setup ){
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
		}
	};
	var env = new Pointerly.Environment( setup );
};

window.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
