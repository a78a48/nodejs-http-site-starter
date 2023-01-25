import http from 'http';
import ENV from "./env.js"
import { handle_files } from './lib/handle_files.js';

const options = {}
http.createServer(options, function (req, res) {

    console.log("HTTP Request", req.url)

    // res.writeHead(200, { "Content-Type": "text/plain" })
    // res.write("Hello World");
    // res.end()

    handle_files(req, res)

}).listen(ENV.HTTP_Port);

console.log("http server running at port", ENV.HTTP_Port)