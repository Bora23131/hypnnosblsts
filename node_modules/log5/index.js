/*
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
*/

let util = require( "util" );

var n0 = function(n) {
	if(n >= 0 && n < 10)
		return "0"+n
	return n
}

var ts = function() {
	var d = new Date()
	return d.getFullYear() + "-" +
		n0(d.getMonth()+1) + "-" +
		n0(d.getDate()) + "_" +
		n0(d.getHours()) + ":" +
		n0(d.getMinutes()) + ":" +
		n0(d.getSeconds())

}

var mkLog = function(prefix) {
	prefix = " " + (prefix || "")
	var o = {}
	o.logLevel = 0
	var f = function logFunc(l) {
		var n = 0, ll = l
		if(typeof l == "number") {
			// first arg is a number
			if(arguments.length == 1) {
				// just set logLevel to l
				o.logLevel = l
				return logFunc
			}
			n = 1	// remove the number from arguments array
		}
		else {
			ll = 0	// first arg is not number, log level for this call is 0
		}
		if(o.logLevel < ll)
			return logFunc
		process.stdout.write(ts()+prefix) // " ["+o.logLevel+"] ")
		for(var i = n; i < arguments.length; i++) {
			let x = arguments[i];
			if( x === undefined ) {
				x = "undefined";
			}
			if( typeof x === "object" ) {
				x = util.inspect( x, { depth: 10 } );
			}
			process.stdout.write(x);
		}
		process.stdout.write("\n");
		return logFunc
	}
	f.E = function(s) { f(1, "******* " + s); }	// error
	f.W = function(s) { f(2, "- - - - " + s); }	// warning
	f.I = function(s) { f(3, s); }				// info
	f.V = function(s) { f(4, s); }				// verbose
	f.D = function(s) { f(5, s); }				// debug
	return f;
}


var defLog = mkLog("")(3);
defLog.mkLog = mkLog;

module.exports = defLog;

if(require.main === module) {
	require('./test.js')
}


