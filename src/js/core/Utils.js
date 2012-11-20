/**
	@namespace The Pointerly utility namespace
*/
Pointerly.Utils = Pointerly.Utils || {};

/**
	Converts an object to a Pointerly.Vector2
	@param {object} [obj] The object to convert, preferably containing <code>x</code> and <code>y</code> properties
	@returns {Pointerly.Vector2} The <code>x</code> and <code>y</code> properties are set to the corresponding properties of the provided object, otherwise default to 0
*/
Pointerly.Utils.ObjToVector2 = function( obj ){
	if( typeof obj !== 'object' ){
		return new Pointerly.Vector2( 0, 0 );
	}

	var x = typeof obj.x === 'number' ? obj.x : 0,
		y = typeof obj.y === 'number' ? obj.y : 0;

	return new Pointerly.Vector2( x, y );
};

/**
	Creates a new Vector in 2D space
	@constructor
	@param {number} x The x coordinate
	@param {number} y The y coordinate
*/
Pointerly.Vector2 = function( x, y ){
	/**
		The x coordinate
		@default 0
	*/
	this.x = x || 0;
	/**
		The y coordinate
		@default 0
	*/
	this.y = y || 0;
};

/** @constant */
Pointerly.NO_SHAPE_CLICKED = -2;

/**
	A position which can be logged
	@constructor
	@param {number} timestamp The time the position was recorded
	@param {number} x The x position
	@param {number} y The y position
*/
Pointerly.LoggedPosition = function( timestamp, x, y ){
	/**
		The time the position was recorded
		@type number
	*/
	this.timestamp = timestamp;
	/**
		The x position
		@type number
	*/
	this.x = x;
	/**
		The y position
		@type number
	*/
	this.y = y;
};

/**
	A mouse click which can be logged
	@constructor
	@param {number} timestamp The time the position was recorded
	@param {number} x The x position
	@param {number} y The y position
	@param {number} shapeID The ID of the shape which was clicked on
*/
Pointerly.LoggedMouseClick = function( timestamp, x, y, shapeID ){
	/**
		The time the position was recorded
		@type number
	*/
	this.timestamp = timestamp;
	/**
		The x position
		@type number
	*/
	this.x = x;
	/**
		The y position
		@type number
	*/
	this.y = y;
	/**
		The ID of the shape which was clicked on
		@type number
	*/
	this.clickedShapeID = shapeID;
};

/**
	A size which can be logged
	@constructor
	@param {number} timestamp The time the position was recorded
	@param {number} width The width of the object
	@param {number} height The height of the object
*/
Pointerly.LoggedSize = function( timestamp, width, height ){
	/**
		The time the position was recorded
		@type number
	*/
	this.timestamp = timestamp;
	/**
		The width of the object
		@type number
	*/
	this.width = width;
	/**
		The height of the object
		@type number
	*/
	this.height = height;
};

/**
	A shape which can be logged
	@constructor
	@param {Pointerly.Shape} shape The shape to convert into a loggable format
	@param {number} id The ID of the shape
*/
Pointerly.LoggableShape = function( shape, id ){
	/**
		The ID of the shape
		@type number
	*/
	this.id = id;
	/**
		The color of the shape
		@type any valid way of defining a color, such as a <code>string</code>
	*/
	this.color = shape.color;
	/**
		The height of the shape
		@type number
	*/
	this.height = height;
	/**
		The width of the shape
		@type number
	*/
	this.width = width;
	/**
		The position of the shape
		@type Pointerly.Vector2
	*/
	this.position = shape.position;
	/**
		The type of the shape
		@type string
	*/
	this.type = shape.toString();
	/**
		The time the shape was created
		@type number
	*/
	this.createTime = Pointerly.now();
	/**
		The time the shape was removed
		@type number
	*/
	this.removeTime = Number.MAX_VALUE;
};

/** @constatnt */
Pointerly.HOME_ENTER = 1;
/** @constatnt */
Pointerly.HOME_EXIT = 2;

/**
	An interaction with the home area which can be logged
	@constructor
	@param {number} timestamp The time the interaction occured
	@param {number} interaction The type of interaction
*/
Pointerly.HomeAreaInteraction = function( timestamp, interaction ){
	/**
		The time the interaction was recorded
		@type number
	*/
	this.timestamp = timestamp;
	/**
		Indicates whether the interaction was the mouse entering the Home Position
		@type boolean
	*/
	this.enter = interaction === Pointerly.HOME_ENTER;
	/**
		Indicates whether the interaction was the mouse exiting the Home Position
		@type boolean
	*/
	this.exit = interaction === Pointerly.HOME_EXIT;
};

/**
	A description of the object properties which are available on a <code>Pointerly.Logger</code> data object.<br />
	The properties can be on a regular object, this merely describes what they are.
	@constructor
*/
Pointerly.LoggerData = function(){
	/**
		The time at which logging was started.
		@type number
	*/
	this.startTime = 0;

	/**
		The time at which the mouse position was last recorded.
		@type number
	*/
	this.lastCheck = 0;

	/**
		An array of the shapes that have been created, in a loggable format.
		@type Pointerly.LoggableShape[]
	*/
	this.createdShapes = [];

	/**
		An array of the interactions that have been had with the Home Position.
		@type Pointerly.HomeAreaInteraction[]
	*/
	this.homeAreaInteractions = [];

	/**
		An array of the sizes the Home Position has been.
		@type Pointerly.LoggedSize[]
	*/
	this.homeAreaSize = [];

	/**
		An array of the positions the Home Position has situated.
		@type Pointerly.LoggedPosition[]
	*/
	this.homeAreaPosition = [];

	/**
		An array of the positions that the mouse has been in.
		@type Pointerly.LoggedPosition[]
	*/
	this.mousePosition = [];

	/**
		An array of the clicks that the mouse has made.
		@type Pointerly.LoggedMouseClick[]
	*/
	this.mouseClicks = [];

	/**
		An array of the sizes the canvas has been.
		@type Pointerly.LoggedSize[]
	*/
	this.canvasSize = [];
};
