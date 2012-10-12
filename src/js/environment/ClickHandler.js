Pointerly.ClickHandler = Pointerly.ClickHandler || {};

Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	switch( type.toLowerCase() ){
		case 'mouse':
			Pointerly.ClickHandler.Mouse( environment, setup );
			break;
	}
};

Pointerly.ClickHandler.Mouse = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();

 		console.log( event, environment, setup, Pointerly.CURRENT_ENVIRONMENT );
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.GetClickedShape = function( clickPosition, environment, setup ){
	console.log(clickPosition);
};
