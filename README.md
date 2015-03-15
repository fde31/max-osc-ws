# Max OSC Websocket Example
---

Example of how to use a Node.js based OSC bridge to sync multiple clients and a Max patch using WebSockets and UDP.

## Usage

In order to be able to run the example you need to have node.js and npm installed and run 
    
    npm install

for installing the dependencies. Addtionally [Grunt](http://gruntjs.com/) needs to be available if you'd want to change/rebuild the frontend JavaScript files:

    grunt browserify

Use the `config.json` file in order to adjust the port and host configuration. In order to run the server use

    npm start

and point your browser to `http://localhost:<port>` in order to get a listing of available examples. The accompanying patches can be found in [patches](patches)

## OSC Syntax

Parsing and composing of OSC messages is based on the [osc-min](https://github.com/russellmcc/node-osc-min) package. Please refer to the README on the projects' GitHub page in order to get more details about the JS representation of OSC messages.

## License

[MIT](LICENSE)