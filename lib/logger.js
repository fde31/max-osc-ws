"use strict";

var winston 	= require('winston');
var transports	= [];
var logger 		= null;

transports.push(new (winston.transports.Console)({
	level : 'debug',
	colorize : true
}));

logger = new (winston.Logger)({
	transports: transports
});

module.exports.debug = function() {
	logger.log.apply(logger, ['debug'].concat(Array.prototype.slice.call(arguments)));
};

module.exports.error = function() {
	logger.log.apply(logger, ['error'].concat(Array.prototype.slice.call(arguments)));
};

module.exports.warn = function() {
	logger.log.apply(logger, ['warn'].concat(Array.prototype.slice.call(arguments)));
};