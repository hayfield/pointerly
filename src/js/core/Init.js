Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Pointerly.ClickHandler.SetupDefaults();
	Pointerly.ShapeGeneration.SetupDefaults();
	Pointerly.Shapes.SetupDefaults();

	var setup = {
		shapes: [ Pointerly.Shapes.Triangle, Pointerly.Shapes.Circle, Pointerly.Shapes.Rectangle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ],
		shapeLayout: 'experiment',
		shapeGenSettings: {
			rowsOfShapes: 2,
			columnsOfShapes: 3
		},
		clickType: 'mouse',
		fixedViewBetweenEvents: false,
		onShapeClick: function( environment, shape ){
			console.log(Pointerly.CURRENT_ENVIRONMENT, Pointerly.CURRENT_ENVIRONMENT.numberOfClickedShapes, shape);
			
			Pointerly.CURRENT_ENVIRONMENT.removeShape( shape );
			if( Pointerly.CURRENT_ENVIRONMENT.objects().length === 0 ){
				Pointerly.CURRENT_ENVIRONMENT.generateShapes();
			}
		},
		homePosition: {
			width: 20,
			height: 20
		}
	};
	var env = new Pointerly.Environment( setup );
};

Pointerly.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		var home = Pointerly.CURRENT_ENVIRONMENT.homePosition;
		home.setPosition( (window.innerWidth - parseInt(home.domElement.style.width, 10)) / 2, (window.innerHeight - parseInt(home.domElement.style.height, 10)) / 2 );
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
		Pointerly.CURRENT_ENVIRONMENT.render();
	}
};
window.addEventListener( 'resize', Pointerly.onresize );
