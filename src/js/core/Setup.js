/**
	@namespace A namespace for describing the types of setup objects
*/
Pointerly.Setup = Pointerly.Setup || {};

/**
	A description of the object properties which can be used to setup a <code>Pointerly.Environment</code> and are passed to <code>Pointerly.Init</code>.<br />
	The properties can be on a regular object, this merely describes what they are.
	@constructor
*/
Pointerly.Setup.Environment = function(){
	/**
		Indicates whether the environment is used for replaying logged data.<br />
		If setting up a replay environment, this should be set to true. All other properties will then be ignored.
		@type boolean
	*/
	this.replaying = false;

	/**
		Defines the type of click handler to use.<br />
		If undefined, clicking will have no effect.<br />
		The possible values available by default are <code>mouse</code> and <code>screencenter</code>. Custom click handlers may be defined.
		@type string
	*/
	this.clickType = '';

	/**
		Indicates whether the view of the canvas should remain constant without explicit update calls.<br />
		If set to anything that evaluates to <code>true</code>, the view will remain fixed, otherwise the view will update on a regular schedule.
		@type boolean
	*/
	this.fixedViewBetweenEvents = false;

	/**
		Defines the method in which to layout shapes.<br />
		If it's a <code>function</code>, that function will be used to layout the shapes.<br />
		If it's a <code>string</code>, the registered method of shape generation with that name will be used. Custom methods of named shape generation may be defined.
		@type string|function
	*/
	this.shapeLayout = '';

	/**
		Defines a function to call when a shape is clicked.
		@type function
		@param {Pointerly.Environment} environment The environment within which a shape was clicked
		@param {Pointerly.Shape} shape The shape which was clicked on
	*/
	this.onShapeClick = function(){};

	/**
		Defines a function to call when a click happens, but it's not on a shape.
		@type function
		@param {Pointerly.Environment} environment The environment within which the click occured
	*/
	this.onNonShapeClick = function(){};

	/**
		Defines the setup for the Home Position.<br />
		If undefined, there will be no Home Position.
		@type Pointerly.Setup.HomePosition|object
	*/
	this.homePosition = new Pointerly.Setup.HomePosition();

	/**
		Indicates whether a mouse trail should be shown all the time, even when not replaying.
		@type boolean
	*/
	this.displayMouseTrail = false;

	/**
		Indicates whether shapes should be generated immediately when the environment is created.
		@type boolean
	*/
	this.autoGenerateShapes = false;

	/**
		Other properties may be defined.<br />
		Some of these additional properties may be required to customise how shape generators or click handlers work.
	*/
	this.other = '';
};

/**
	A description of the object properties which can be used to setup a <code>Pointerly.Home</code>.<br />
	The properties can be on a regular object, this merely describes what they are.
	@constructor
*/
Pointerly.Setup.HomePosition = function(){
	/**
		Defines the width of the Home Position.
		@type number
	*/
	this.width = 0;

	/**
		Defines the height of the Home Position.
		@type number
	*/
	this.height = 0;

	/**
		Defines the color of the Home Position.
		@type any valid way of defining a color, such as a <code>string</code>
	*/
	this.color = '';

	/**
		Defines a function to call when the mouse enters the Home Position.
		@type function
	*/
	this.onEnter = function(){};

	/**
		Defines a function to call when the mouse exits the Home Position.
		@type function
	*/
	this.onExit = function(){};
};

/**
	A description of the object properties which can be used to setup a <code>Pointerly.Shape</code> and anything that inherits from that.<br />
	The properties can be on a regular object, this merely describes what they are.
	@constructor
*/
Pointerly.Setup.Shape = function(){
	/**
		Defines the width of the shape.
		@type number
	*/
	this.width = 0;

	/**
		Defines the height of the shape.
		@type number
	*/
	this.height = 0;

	/**
		Defines the color of the shape.
		@type any valid way of defining a color, such as a <code>string</code>
	*/
	this.color = '';

	/**
		Defines the position of the shape.
		@type Pointerly.Vector2
	*/
	this.position = {};
};

/**
	A description of the object properties which are passed to the function when a shape is drawing itself.<br />
	The properties can be on a regular object, this merely describes what they are.
	@constructor
*/
Pointerly.Setup.ShapeDrawing = function(){
	/**
		Specifies the width of the canvas being drawn on.
		@type number
	*/
	this.width = 0;

	/**
		Specifies the height of the canvas being drawn on.
		@type number
	*/
	this.height = 0;

	/**
		The canvas in the DOM which is being drawn onto.
	*/
	this.canvas = {};

	/**
		The canvas context which can be drawn on.
		@type CanvasRenderingContext2D
	*/
	this.ctx = {};
};
