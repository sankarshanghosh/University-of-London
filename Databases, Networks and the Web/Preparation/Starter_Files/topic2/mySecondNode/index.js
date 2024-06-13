var http = require("http");
var date = require("./myFirstModule");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("The date and time are currently: "+ date.myDateTime() + "\n");
    res.end("Hello World again!");
  })
  .listen(8082, function () {
    console.log("Node server is running...");
  });