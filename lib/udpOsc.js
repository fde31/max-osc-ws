"use strict";

var utils			= require('util');
var EventEmitter	= require('events').EventEmitter;
var osc 			= require('osc-min');
var dgram			= require('dgram');

var UdpOsc = function(options) {

	EventEmitter.call(this);

	this._targetHost = options.targetHost;
	this._targetPort = options.targetPort;

	this._socket = dgram.createSocket('udp4');

	this._socket.on('message', this._onMessage.bind(this));
	this._socket.on('listening', this._onListening.bind(this));
	this._socket.on('error', this._onError.bind(this));

	this._socket.bind(options.port);
};

utils.inherits(UdpOsc, EventEmitter);

UdpOsc.prototype._onListening = function() {
	this.emit('listening');
};

UdpOsc.prototype._onError = function(e) {
	this.emit('error', e);
};

UdpOsc.prototype._onOSCError = function(e) {
	this.emit('osc-error', e);
};

UdpOsc.prototype._onMessage = function(buf) {
	var data;
	try {
		data = osc.fromBuffer(buf);
	} catch(e) {
		return this._onOSCError(e);
	}

	this.emit('message', data);
};

UdpOsc.prototype.send = function(data) {
	var buf;
	try {
		buf = osc.toBuffer(data);
	} catch (e) {
		return this._onOSCError(e);
	}

	this._socket.send(buf, 0, buf.length, this._targetPort, this._targetHost);
};

module.exports = UdpOsc;