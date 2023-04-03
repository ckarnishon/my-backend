const http = require("http");
const getUsers = require("./modules/users");


const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const params = url.searchParams;
  const name = params.get("hello");

  if (params.has("hello")) {
    if (name === "") {
        response.statusCode = 400;
        response.statusMessage = "Error";
        response.setHeader = "Content-Type", "text/plain";
        response.write("Enter a name");
        response.end();
    }
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader = "Content-Type", "text/plain";
    response.write(`Hello,${name}`);
    response.end();
    return;
  }
  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
  }
  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader = "Content-Type", "text/plain";
    response.write("Hello world");
    response.end();

    return;

  }
  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.setHeader = "Content-Type", "text/plain";
  response.write("");
  response.end();
});
server.listen(3003,  () => {
  console.log('http://127.0.0.1:3003');
});
