Pointerly
=========

A framework for testing things using pointers.

## How to best obtain and collect data

* Use a [browser that includes high resolution timing](http://caniuse.com/#search=navigation%20timing)
* Use a [browser with FileSystem support](http://caniuse.com/#search=filesystem) to store data

If running Pointerly in Chrome using the local file system (the URL starts with `file:`), [set the](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) `--allow-file-access-from-files` [flag](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) for access to the FileSystem.

Data stored in the FileSystem in Chrome can be found in the `File System` folder within the [User Data Directory](http://www.chromium.org/user-experience/user-data-directory).

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

* `clickedShapeID` - the ID of the shape that was clicked, or -2 if no shape was clicked
* `x` - the x position of the click
* `y` - the y position of the click
* `timestamp` - the time the click was logged
