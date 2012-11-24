/**
	Initialises Pointerly
	@param {Pointerly.Setup.Environment|object} setup The setup configuration
*/
Pointerly.Init = function( setup ){
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Pointerly.ClickHandler.SetupDefaults();
	Pointerly.ShapeGeneration.SetupDefaults();
	Pointerly.Shapes.SetupDefaults();

	var env = new Pointerly.Environment( setup );
};

/**
	An event that fires when the page is resized
*/
Pointerly.onresize = function(){
	if( Pointerly.CURRENT_ENVIRONMENT instanceof Pointerly.Environment ){
		var home = Pointerly.CURRENT_ENVIRONMENT.homePosition;
		if( home.domElement ){
			home.setPosition( window.innerWidth / 2, window.innerHeight / 2 );
		}
		Pointerly.CURRENT_ENVIRONMENT.renderer.setSize( window.innerWidth, window.innerHeight );
		Pointerly.CURRENT_ENVIRONMENT.render();
	}
};
window.addEventListener( 'resize', Pointerly.onresize );
