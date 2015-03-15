"use strict";

var $			= require('jquery');
var Messenger	= require('./messenger');
var Logger 		= require('./logger');
var Slider		= require('./slider');

$(function() {

	var logger = new Logger('#console');
	var elements = {};

	var messenger = new Messenger({
		url : location.host
	});

	messenger.on('error', function(e) {
		logger.log(e);
	});

	messenger.on('connect', function() {
		logger.log('Connected.');
	});

	messenger.on('disconnect', function() {
		logger.log('Disconnected.');
	});

	messenger.on('reconnect', function() {
		logger.log('Reconnected.');
	});

	messenger.on('reconnect', function() {
		logger.log('Reconnection failed.');
	});

	messenger.on('osc', function(msg) {
		var element = elements[msg.address.slice(1)];
		if (!element) {
			logger.log('Unknown target: ' + msg.address);
			return;
		}
		element.setValue(msg.args[0].value);
	});

	function sendValue(address, value) {
		messenger.sendOSCMessage('/' + address, [
			{
				value : value
			}
		]);
	}

	$('input[type="range"]').each(function(i, el) {
		el = $(el);
		var slider = new Slider(el);
		elements[el.attr('id')] = slider;
		slider.on('change', sendValue);
	});

});