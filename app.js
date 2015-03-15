"use strict";

var express			= require('express');
var serveIndex		= require('serve-index')

var UdpOsc			= require('./lib/udpOsc');
var WebSocketServer	= require('./lib/websocket');
var Logger			= require('./lib/logger');
var config			= require('./config.json');

var app 			= express();
var server			= require('http').Server(app);
var websocket		= null;
var oscBridge		= null;


var shutDown = function () {
	Logger.warn('Shutting down...');

	if (server && server.close) server.close();
	if (oscBridge) oscBridge.close();
};

process.on('uncaughtException', function(e) {
	Logger.error(e);
	Logger.error(e.stack);
	return shutDown();
});

// setup static http server
app.use('/', serveIndex('public', {
	filter : function(filename) {
		return /\.html$/.test(filename);
	},
	icons : true
}));
app.use(express.static('public'));

// setup WebSocket server
websocket = new WebSocketServer({
	server : server,
	broadcast : true
});

// send OSC messages via UDP
websocket.on('osc', function(msg) {
	oscBridge.send(msg);
});

// setup OSC via UDP
oscBridge = new UdpOsc({
	port : config.udp.port,
	targetHost : config.udp.target.host,
	targetPort : config.udp.target.port
});

oscBridge.on('error', function(e) {
	Logger.error('UDP error');
	Logger.error(e);
	shutDown();
});

oscBridge.on('listening', function() {
	Logger.debug('UDP socket listening');
});

oscBridge.on('osc-error', function(e) {
	Logger.warn('OSC message error:');
	Logger.warn(e);
});

// forward OSC messages via the WebSocket server
oscBridge.on('message', function(msg) {
	websocket.broadcast('osc', msg);
});

// start HTTP server
server.listen(config.http.port);
