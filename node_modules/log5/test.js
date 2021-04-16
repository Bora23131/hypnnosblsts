
log5 = require("./index.js")

test = function(logger) {
	for(var i = 0; i < 6; i++) {
		logger(i);

		logger(1, "n=1");
		logger(2, "n=2");
		logger(3, "n=3");
		logger(4, "n=4");
		logger(5, "n=5");

		logger.E("f=E");
		logger.W("f=W");
		logger.I("f=I");
		logger.V("f=V");
		logger.D("f=D");
	}
}

test(log5);
test(log5.mkLog("LOG5TEST "))



