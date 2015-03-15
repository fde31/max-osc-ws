"use strict";

var util			= require('util');
var EventEmitter	= require('events').EventEmitter;
var io				= require('socket.io');

var WebsocketServer = function(options) {
	EventEmitter.call(this);

	this._doBroadcast = options.broadcast || true;
	this._server = io(options.server);
	this._server.on('connection', this._onClient.bind(this));
};

util.inherits(WebsocketServer, EventEmitter);

WebsocketServer.prototype._onClient = function(socket) {
	socket.on('osc', function(msg) {
		if (this._doBroadcast) socket.broadcast.emit('osc', msg);
		this.emit('osc', msg);
	}.bind(this));

	socket.once('disconnect', function() {
		socket.removeAllListeners('osc');
	});
};

WebsocketServer.prototype.broadcast = function(msg, data) {
	this._server.emit(msg, data);
};

module.exports = WebsocketServer;