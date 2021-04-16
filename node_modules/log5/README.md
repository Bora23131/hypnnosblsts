
# log5 - Simple logging utility.  

Provides a 5-level logging facility with timestamps.

The levels are: 1 = ERRORS, 2 = WARNINGS, 3 = INFO, 4 = VERBOSE, and 5 = DEBUG 

## Install
	
	npm install log5

## Simple Examples

	// call by level type initial (E, W, I, V, D)
	log = require("log5");	// log is a default logger function set to level 3
	log.E("Error");			// writes "Error" to console
	log.I("Info");			// writes "Info" to console
	log.V("Verbose");		// doesn't write anything.
	log(4);					// change log level to 4
	log.V("Verbose");		// writes "Verbose" to console

	// Usage by number
	log(2, "Warn");			// writes "Warn" to console
	log(4, "Verbose");		// writes "Verbose" to console
	log(5, "Debug");		// doesn't write anything.


## Loggers with prefix

	log_foo = require("log5")("Foo: ");
	log_foo.I("Info");			// writes "Foo: Info" to console


## Use with "g"

If you combine the "log5" module with the "g" module, you can do this, to
globalize the log5 functions and set a log level of 1

	require("g")("log5")(1);
	E("this prints");
	W("this doesn't");


## License

	Copyright 2015 Sleepless Software Inc. All rights reserved.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to
	deal in the Software without restriction, including without limitation the
	rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	sell copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	IN THE SOFTWARE. 

