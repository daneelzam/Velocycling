// import http from 'http';
// import app from './app.js';
const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`*** Сервер запущен, порт ${port} ***`));
