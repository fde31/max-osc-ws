"use strict";

var util			= require('util');
var EventEmitter	= require('events').EventEmitter;
var io				= require('socket.io-client');

var Messenger = function(options) {
	EventEmitter.call(this);

	this._socket = io.connect(options.url);
	this._socket.on('error', this._onError.bind(this));
	this._socket.on('connect', this._onConnect.bind(this));
	this._socket.on('disconnect', this._onDisconnect.bind(this));
	this._socket.on('reconnect', this._onReconnect.bind(this));
	this._socket.on('reconnect_failed', this._failedReconnect.bind(this));

	this._socket.on('osc', this._onOSCMessage.bind(this));
};

util.inherits(Messenger, EventEmitter);

Messenger.prototype._onError = function(e) {
	this.emit('error', e);
};

Messenger.prototype._onConnect = function() {
	this.emit('connect');
};

Messenger.prototype._onDisconnect = function() {
	this.emit('disconnect');
};

Messenger.prototype._onReconnect = function() {
	this.emit('reconnect');
};

Messenger.prototype._failedReconnect = function() {
	this.emit('reconnect_failed');
};

Messenger.prototype._onOSCMessage = function(msg) {
	this.emit('osc', msg);
};

Messenger.prototype.sendMessage = function(msg, data) {
	this._socket.emit(msg, data);
};

Messenger.prototype.sendOSCMessage = function(address, data) {
	this._socket.emit('osc', {
		address : address,
		args : data
	});
};

module.exports = Messenger;
