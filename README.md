Pointerly
=========

A framework for testing things using pointers.

### How to best obtain and collect data

* Use a [browser that includes high resolution timing](http://caniuse.com/#search=navigation%20timing)
* Use a [browser with FileSystem support](http://caniuse.com/#search=filesystem) to store data

If running Pointerly in Chrome using the local file system (the URL starts with `file:`), [set the](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) `--allow-file-access-from-files` [flag](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) for access to the FileSystem.

Data stored in the FileSystem in Chrome can be found in the `File System` folder within the [User Data Directory](http://www.chromium.org/user-experience/user-data-directory).
