Pointerly.ClickHandler = Pointerly.ClickHandler || {};

Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	switch( type.toLowerCase() ){
		case 'mouse':
			Pointerly.ClickHandler.Mouse( environment, setup );
			break;
	}
};

Pointerly.ClickHandler.Mouse = function( environment, setup ){

};
