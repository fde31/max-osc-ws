"use strict";

var $ = require('jquery');

var Logger = function(selector) {
	this._el = $(selector);
};

Logger.prototype.log = function(msg) {
	this._el.append('<p>' + msg + '</p>');
};

module.exports = Logger;