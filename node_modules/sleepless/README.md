
# sleepless

Sleepless Inc.'s commonly used Javascript enhancement code

## Install

	npm install sleepless

## Usage

Load the module like htis:

	sleepless = require( "sleepless" )
	sleepless.time()	// current Unix time stamp

To make all the top level attributes of the sleepless object global
(for convenience):

	sleepless.globalize();
	time()	// current Unix time stamp

