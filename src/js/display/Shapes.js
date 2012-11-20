/**
	@namespace A namespace for storing shapes
*/
Pointerly.Shapes = Pointerly.Shapes || {};

/**
	The types of shape which have been defined
	@private
*/
Pointerly.Shapes.TYPES = Pointerly.Shapes.TYPES || {};

/**
	Registers a shape against a name. Names are case-insensitive
	@param {string|Pointerly.Shape} type <ul>
		<li>If a string, the name to give the method of generation
		<li>If not, a shape with a custom <code>toString()</code> function
	</ul>
	@param {Pointerly.Shape} [funct] If <code>type</code> is a <code>string</code>, a shape
*/
Pointerly.Shapes.Register = function( type, funct ){
	if( typeof type === 'string' && typeof funct === 'function' ){
		Pointerly.Shapes.TYPES[type.toLowerCase()] = funct;
	} else if( typeof type === 'function' && typeof funct === 'undefined' ){
		Pointerly.Shapes.TYPES[new type().toString().toLowerCase()] = type;
	}
};

/**
	Sets up the default shapes
*/
Pointerly.Shapes.SetupDefaults = function(){
	Pointerly.Shapes.Register( Pointerly.Shapes.Circle );
	Pointerly.Shapes.Register( Pointerly.Shapes.Triangle );
	Pointerly.Shapes.Register( Pointerly.Shapes.Rectangle );
};

/**
	Finds the shape constructor based on the given type
	@param {string} type The type of shape
	@returns {Pointerly.Shape} The constructor for shapes with the given name
*/
Pointerly.Shapes.FromString = function( type ){
	if( Pointerly.Shapes.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		return Pointerly.Shapes.TYPES[type.toLowerCase()];
	}
};

/**
	Creates a shape based on the given type
	@param {string} type The type of shape
	@param {object} shapeSetup The setup object for the shape
	@returns {Pointerly.Shape} A constructed shape of the specified type, or <code>undefined</code> if the type given has not been specified
*/
Pointerly.Shapes.NewFromString = function( type, shapeSetup ){
	if( Pointerly.Shapes.TYPES.hasOwnProperty( type.toLowerCase() ) ){
		return new Pointerly.Shapes.TYPES[type.toLowerCase()]( shapeSetup );
	}
};

/**
	Create a new shape from a format that has been logged
	@param {Pointerly.LoggableShape|object} construct The template to create a shape from
	@returns {Pointerly.Shape} A constructed shape with the given settings
*/
Pointerly.Shapes.CreateFromLogger = function( construct ){
	var shapeConstruct = {
			width: construct.width,
			height: construct.height,
			position: new Pointerly.Vector2( construct.position.x, construct.position.y ),
			color: construct.color
		};
	
	return Pointerly.Shapes.NewFromString( construct.type, shapeConstruct );
};
