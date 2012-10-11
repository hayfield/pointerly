Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var setup = {
		shapes: [ Pointerly.Triangle, Pointerly.Circle ],
		colors: [ 'red', 'orange', 'blue', 'green', 'black' ]
	};
	var env = new Pointerly.Environment( setup );
};

window.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
