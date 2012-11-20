/**
	A Home Position that resides in the middle of the screen
	@constructor
	@param {object} homeSetup The setup for the home position.<br />
		If <code>undefined</code>, setup is not completed.<br />
		Should have the following properties:
		<ul>
			<li><code>width</code>
			<li><code>height</code>
			<li><code>color</code>
		</ul>
*/
Pointerly.Home = function( homeSetup ){
	var home = this;
	/**
		The width of the home area
		@type number
		@default If <code>homeSetup.width</code> is a number, uses that, otherwise <code>40</code>
	*/
	var width;
	/**
		The height of the home area
		@type number
		@default If <code>homeSetup.height</code> is a number, uses that, otherwise <code>40</code>
	*/
	var height;
	/**
		The color of the home area
		@default If <code>homeSetup.color</code> is defined, uses that, otherwise <code>orange</code>
	*/
	var color;

	if( typeof homeSetup === 'undefined' ){
		return;
	}

	/**
		Sets the position of the Home Position and logs the location
		@param {number} x The x position in px from the left of the screen
		@param {number} y The y position in px from the top of the screen
	*/
	this.setPosition = function( x, y ){
		home.domElement.style.left = x + 'px';
		home.domElement.style.top = y + 'px';
		
		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaPosition( x, y );
	};

	/**
		Sets the size of the Home Position and logs the new size
		@param {number} newWidth The new width in px
		@param {number} newHeight The new height in px
	*/
	this.setSize = function( newWidth, newHeight ){
		width = newWidth;
		height = newHeight;
		home.domElement.style.width = width + 'px';
		home.domElement.style.height = height + 'px';

		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaSize( width, height );
	};

	width = typeof homeSetup.width === 'number' ? homeSetup.width : 40;
	height = typeof homeSetup.height === 'number' ? homeSetup.height : 40;
	color = typeof homeSetup.color !== 'undefined' ? homeSetup.color : 'orange';

	this.domElement = document.createElement('div');

	this.setSize( width, height );
	this.domElement.style.backgroundColor = color;
	this.domElement.className += 'homePosition';

	document.body.appendChild( this.domElement );

	/**
		A function which fires when the mouse enters the home area.
		It will call an <code>onEnter()</code> function if provided as a property of <code>homeSetup</code>.
	*/
	var onHomeEnter = function(){
		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaEnter();
		if( typeof homeSetup.onEnter === 'function' ){
			homeSetup.onEnter();
		}
	};

	/**
		A function which fires when the mouse exits the home area.
		It will call an <code>onExit()</code> function if provided as a property of <code>homeSetup</code>.
	*/
	var onHomeExit = function(){
		Pointerly.CURRENT_ENVIRONMENT.logger.logHomeAreaExit();
		if( typeof homeSetup.onExit === 'function' ){
			homeSetup.onExit();
		}
	};

	this.domElement.addEventListener( 'mouseover', onHomeEnter );
	this.domElement.addEventListener( 'mouseout', onHomeExit );
};
