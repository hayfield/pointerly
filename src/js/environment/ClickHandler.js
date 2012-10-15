Pointerly.ClickHandler = Pointerly.ClickHandler || {};

Pointerly.ClickHandler.TYPES = Pointerly.ClickHandler.TYPES || {};

Pointerly.ClickHandler.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.ClickHandler.TYPES[type.toLowerCase()] = funct;
	}
};

Pointerly.ClickHandler.SetupDefaults = function(){
	Pointerly.ClickHandler.Register( 'mouse', Pointerly.ClickHandler.Mouse );
	Pointerly.ClickHandler.Register( 'screencenter', Pointerly.ClickHandler.ScreenCenter );
	Pointerly.ClickHandler.Register( 'fps', Pointerly.ClickHandler.ScreenCenter );
};

Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	if( Pointerly.ClickHandler.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ClickHandler.TYPES[type.toLowerCase()]( environment, setup );
	}
};

Pointerly.ClickHandler.Mouse = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();

		Pointerly.ClickHandler.GetClickedShape({
			x: event.clientX,
			y: event.clientY
		}, Pointerly.CURRENT_ENVIRONMENT ); 	
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.ScreenCenter = function( environment, setup ){
	var clickHandler = function( event ){
 		event.preventDefault();

		Pointerly.ClickHandler.GetClickedShape({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}, Pointerly.CURRENT_ENVIRONMENT ); 		
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

Pointerly.ClickHandler.GetClickedShape = function( clickPosition, environment ){
	var objs = environment.objects();

	for( var i = 0; i <objs.length; i++ ){
		if( clickPosition.x > objs[i].position.x && clickPosition.y > objs[i].position.y 
				&& clickPosition.x < (objs[i].position.x + objs[i].width)
				&& clickPosition.y < (objs[i].position.y + objs[i].height) ){
			return objs[i];
		}
	}

	return null;
};
