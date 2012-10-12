Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Pointerly.ClickHandler.SetupDefaults();
	Pointerly.ShapeGeneration.SetupDefaults();
	Pointerly.Shapes.SetupDefaults();

	var setup = {
		shapes: [ Pointerly.Shapes.Triangle, Pointerly.Shapes.Circle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ],
		rowsOfShapes: 2,
		columnsOfShapes: 3,
		shapeLayout: '2DGrid',
		camera: {
			type: 'fixed',
			position: {
				y: 300
			}
		},
		clickType: 'mouse'
	};
	var env = new Pointerly.Environment( setup );
};

window.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
