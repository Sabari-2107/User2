// server.js
const https = require("https");
const fs = require("fs");

https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}, (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(fs.readFileSync("index.html"));
}).listen(3010);

console.log("HTTPS running on https://localhost:3010");
