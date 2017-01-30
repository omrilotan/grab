// Use:
// node serve 80(optional) /src(optional)

// Dependencies
var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs"),

    serve = function serve (host, port, base, page) {
        http.createServer(function createServer (request, response) {

            var uri = base + url.parse(request.url).pathname,
                filename = path.join(process.cwd(), uri),

                fileRead = function fileRead (exists) {
                    if(!exists) {
                        errorHandler("Not Found", 404)
                        return;
                    }

                    if (fs.statSync(filename).isDirectory()) {
                        filename += `/${page}`;
                    }

                    fs.readFile(filename, "binary", respond);
                },

                respond = function respond (error, file) {
                    if (error) {
                        errorHandler(error, 500)
                        return;
                    }

                    response.writeHead(200);
                    response.write(file, "binary");
                    response.end();
                },

                errorHandler = function (error, code) {
                    response.writeHead(code, {"Content-Type": "text/plain"});
                    response.write(code + " \n" + error + " \n");
                    response.end();
                    return;
                };

            fs.exists(filename, fileRead);

        }).listen(parseInt(port, 10), host);

console.log(
`Static file server running:
http://${host}:${port}
CTRL + C to shutdown`
);
    };


/////////////////////////////////
// Autoplay the serve function //
/////////////////////////////////
(function autoplay (argv) {
    // Defaults
    var page = "index.html",
        host = "127.0.0.1",
        base = "",
        port = 1337;

    argv.shift(); // program
    argv.shift(); // file

    if (argv.length > 0) {
        port = parseInt(argv.shift(), 10);
    }

    if (argv.length > 0) {
        base = argv.shift();
    }

    base = `${base}/`.replace(/\/\/*/g, '/'); // Remove repeating backslashes

    serve(host, port, base, page);
}([].slice.call(process.argv)));
