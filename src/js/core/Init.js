Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Pointerly.ClickHandler.SetupDefaults();
	Pointerly.ShapeGeneration.SetupDefaults();
	Pointerly.Shapes.SetupDefaults();

	var setup = {
		shapes: [ Pointerly.Shapes.Triangle, Pointerly.Shapes.Circle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ],
		shapeLayout: '2DGrid',
		shapeGenSettings: {
			rowsOfShapes: 1,
			columnsOfShapes: 3
		},
		clickType: 'mouse',
		fixedViewBetweenEvents: false,
		onShapeClick: function( environment, shape ){
			console.log(Pointerly.CURRENT_ENVIRONMENT, Pointerly.CURRENT_ENVIRONMENT.numberOfClickedShapes, shape);
			
			Pointerly.CURRENT_ENVIRONMENT.generateShapes();
		}
	};
	var env = new Pointerly.Environment( setup );
};

Pointerly.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
		Pointerly.CURRENT_ENVIRONMENT.render();
	}
};
window.addEventListener( 'resize', Pointerly.onresize );
