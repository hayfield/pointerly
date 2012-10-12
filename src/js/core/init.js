Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var setup = {
		shapes: [ Pointerly.Triangle, Pointerly.Circle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ],
		rowsOfShapes: 2,
		columnsOfShapes: 3,
		shapeLayout: '2DGrid',
		camera: {
			type: 'fixed',
			position: {
				y: 300
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
