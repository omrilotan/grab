var net = require("net"),

// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
    addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/,

    addrPair = {
        from: process.argv[2].toString().trim(),
        to  : process.argv[3].toString().trim()
    },

    addrTmpl = {
        from: addrRegex.exec(addrPair.from),
        to  : addrRegex.exec(addrPair.to)
    };

if (!addrPair.from || !addrPair.to) {
    console.log("Usage: <from> <to>");
    return;
}

// This is where the magic happens
net.createServer(function(from) {
    var to = net.createConnection({
        host: addrTmpl.to[2],
        port: addrTmpl.to[3]
    });

    from.pipe(to);
    to.pipe(from);

}).listen(addrTmpl.from[3], addrTmpl.from[2]);

console.log.apply(console, [
    "-=",
    "Tunnelling " + addrPair.from + " to " + addrPair.to,
    "=-",
]);