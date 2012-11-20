Pointerly
=========

A framework for testing things using pointers.

## How to best obtain and collect data

* Use a [browser that includes high resolution timing](http://caniuse.com/#search=navigation%20timing)
* Use a [browser with FileSystem support](http://caniuse.com/#search=filesystem) to store data

If running Pointerly in Chrome using the local file system (the URL starts with `file:`), [set the](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) `--allow-file-access-from-files` [flag](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) for access to the FileSystem.

Data stored in the FileSystem in Chrome can be found in the `File System` folder within the [User Data Directory](http://www.chromium.org/user-experience/user-data-directory).

## Explaining the Settings Object

To initialise Pointerly, the `Pointerly.Init` function is passed a setup object which can have the following properties.

* `shapeLayout` - the type of method that should be used to layout shapes. Can be of different types
	* `string` - indicates a defined layout to use
	* `function(environment, setup)` - function to do the shape setup
* `clickType` - string indicating the type of click method to use
* `fixedViewBetweenEvents` - boolean to indicate whether the view should remain fixed after it is initially drawn. Set to `true` to fix the view, `false` for it to update as things happen
* `onShapeClick` - function to call when a shape is clicked. Passed 2 parameters - the `environment` and `shape` that was clicked.
* `homePosition` - object which specifies the settings of the home position. If unspecified, no home area will exist
	* `width` - the width of the home area in px
	* `height` - the height of the home area in px
	* `color` - the color of the home area
	* `onEnter` - a function to call when the mouse enters the home area
	* `onExit` - a function to call when the mouse exits the home area

## Shapes

Shapes inherit from `Pointerly.Shape`.

Shapes can be passed a `shapeSetup` object with the following properties.

* `color` - the color of the shape
* `position` - the position of the shape - object with the following properties
	* `x` - the x position in px
	* `y` - the y position in px

Custom shapes must define a `this.draw(settings)` function which will display the shape on a canvas. The `settings` parameter is an object which has the following properties.

* `width` - width of the shape in px
* `height` - height of the shape in px
* `ctx` - context on which to draw the shape

Shapes must also define a custom 'toString()' value which indicates what the shape is.

Shapes can be registered into a pool using `Pointerly.Shapes.Register(customShape)`, allowing shapes to be created from their name.

## Explaining the Data Blob

The data that is logged is stored in the `Pointerly.CURRENT_ENVIRONMENT.logger.data` object, with the following properties.

* `canvasSize` - Array of `Pointerly.LoggedSize`
* `createdShapes` - Array of `Pointerly.LoggableShape`
* `homeAreaInteractions` - Array of `Pointerly.HomeAreaInteraction`
* `homeAreaPosition` - Array of `Pointerly.LoggedPosition`
* `homeAreaSize` - Array of `Pointerly.LoggedSize`
* `mouseClicks` - Array of `Pointerly.LoggedMouseClick`
* `mousePosition` - Array of `Pointerly.LoggedPosition`

### Pointerly.LoggedSize

* `height` - height of the object in px
* `width` - width of the object in px
* `timestamp` - the time the size was logged

### Pointerly.LoggableShape

* `color` - color of the shape
* `createTime` - the timestamp at which the shape was created
* `height` - the height of the shape in px
* `id` - the id of the shape
* `position` - object with `x` and `y` properties to specify the position
* `removeTime` - the timestamp at which the shape was removed, or Number.MAX_VALUE if not removed
* `type` - string representation of the type of the shape
* `width` - the width of the shape in px

### Pointerly.HomeAreaInteraction

* `enter` - boolean indicating whether the interaction was the mouse entering the home area
* `exit` - boolean indicating whether the interaction was the mouse exiting the home area
* `timestamp` - the time the interaction was logged

### Pointerly.LoggedPosition

* `x` - the logged x position
* `y` - the logged y position
* `timestamp` - the time the position was logged

### Pointerly.LoggedMouseClick

* `clickedShapeID` - the ID of the shape that was clicked, or `Pointerly.NO_SHAPE_CLICKED` if no shape was clicked
* `x` - the x position of the click
* `y` - the y position of the click
* `timestamp` - the time the click was logged
