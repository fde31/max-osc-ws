"use strict";

var util			= require('util');
var EventEmitter	= require('events').EventEmitter;

var Slider = function(el) {
	EventEmitter.call(this);

	this._el = el;
	this._el.on('input', this._onChange.bind(this));
};

util.inherits(Slider, EventEmitter);

Slider.prototype._onChange = function(e) {
	this.emit('change', this._el.attr('id'), this._el.val());
};

Slider.prototype.setValue = function(v) {
	this._el.val(v);
};

module.exports = Slider;