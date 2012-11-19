Pointerly.Init = function( setup ){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Pointerly.ClickHandler.SetupDefaults();
	Pointerly.ShapeGeneration.SetupDefaults();
	Pointerly.Shapes.SetupDefaults();

	var env = new Pointerly.Environment( setup );
};

Pointerly.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		var home = Pointerly.CURRENT_ENVIRONMENT.homePosition;
		if( home.domElement ){
			home.setPosition( (window.innerWidth - parseInt(home.domElement.style.width, 10)) / 2, (window.innerHeight - parseInt(home.domElement.style.height, 10)) / 2 );
		}
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
		Pointerly.CURRENT_ENVIRONMENT.render();
	}
};
window.addEventListener( 'resize', Pointerly.onresize );
