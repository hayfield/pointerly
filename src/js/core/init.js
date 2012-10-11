Pointerly.Init = function(){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var env = new Pointerly.Environment();
};

window.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
