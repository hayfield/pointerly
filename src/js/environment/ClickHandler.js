/**
	@namespace A namespace for various types of click handler
*/
Pointerly.ClickHandler = Pointerly.ClickHandler || {};

/**
	The methods of handling clicks which have been defined
	@private
*/
Pointerly.ClickHandler.TYPES = Pointerly.ClickHandler.TYPES || {};

/**
	Registers a method of handling clicks against a name. Names are case-insensitive
	@param {string} type The name to give the method of click handling
	@param {function} funct The function to handle clicks with
*/
Pointerly.ClickHandler.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.ClickHandler.TYPES[type.toLowerCase()] = funct;
	}
};

/**
	Sets up the default click handling techniques
*/
Pointerly.ClickHandler.SetupDefaults = function(){
	Pointerly.ClickHandler.Register( 'mouse', Pointerly.ClickHandler.Mouse );
	Pointerly.ClickHandler.Register( 'screencenter', Pointerly.ClickHandler.ScreenCenter );
};

/**
	Handles a click in the given environment based on the given type
	@param {string} type The type of click handling to use
	@param {Pointerly.Environment} environment The environment to handle the click within
	@param {object} [setup] Any additional settings the click handler requires to work
*/
Pointerly.ClickHandler.FromString = function( type, environment, setup ){
	if( Pointerly.ClickHandler.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		Pointerly.ClickHandler.TYPES[type.toLowerCase()]( environment, setup );
	}
};

/**
	Handles a click that occurred on a given shape
	@param {MouseEvent} event The mouse event that occured
	@param {Pointerly.Shape|null} The shape that was clicked on
*/
Pointerly.ClickHandler.GenericShapeClickHandler = function( event, shape ){
	Pointerly.CURRENT_ENVIRONMENT.logger.logMouseClick( event, shape );
	if( shape instanceof Pointerly.Shape ){
		Pointerly.CURRENT_ENVIRONMENT.numberOfClickedShapes++;
		Pointerly.CURRENT_ENVIRONMENT.onShapeClick( Pointerly.CURRENT_ENVIRONMENT, shape );
	} else {
		Pointerly.CURRENT_ENVIRONMENT.onNonShapeClick( Pointerly.CURRENT_ENVIRONMENT );
	}
};

/**
	A Click Handler that clicks based on the current mouse position
	@param {Pointerly.Environment} environment The environment within which to handle the click
*/
Pointerly.ClickHandler.Mouse = function( environment ){
	var clickHandler = function( event ){
 		event.preventDefault();

 		var shape = Pointerly.ClickHandler.GetClickedShape({
			x: event.clientX,
			y: event.clientY
		}, Pointerly.CURRENT_ENVIRONMENT );

 		Pointerly.ClickHandler.GenericShapeClickHandler( event, shape );
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

/**
	A Click Handler that clicks based on the center of the screen
	@param {Pointerly.Environment} environment The environment within which to handle the click
*/
Pointerly.ClickHandler.ScreenCenter = function( environment ){
	var clickHandler = function( event ){
 		event.preventDefault();

		var shape = Pointerly.ClickHandler.GetClickedShape({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}, Pointerly.CURRENT_ENVIRONMENT );

		Pointerly.ClickHandler.GenericShapeClickHandler( event, shape );	
	};

	document.addEventListener( 'mousedown', clickHandler, false );
};

/**
	Finds the shape that is located in the given position
	@param {object} clickPosition Object with <code>x</code> and <code>y</code> parameters specifying the location of the click
	@param {Pointerly.Environment} environment The environment within which the click occured
	@returns The shape that was clicked if one was clicked, otherwise <code>null</code>
*/
Pointerly.ClickHandler.GetClickedShape = function( clickPosition, environment ){
	var objs = environment.objects();

	for( var i = 0; i < objs.length; i++ ){
		if( clickPosition.x > objs[i].position.x && clickPosition.y > objs[i].position.y 
				&& clickPosition.x < (objs[i].position.x + objs[i].width)
				&& clickPosition.y < (objs[i].position.y + objs[i].height) ){
			return objs[i];
		}
	}

	return null;
};
