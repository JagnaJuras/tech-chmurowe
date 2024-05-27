const http = require('http');

// Definiujemy port, na którym serwer będzie nasłuchiwał
const PORT = 3000;

// Funkcja obsługująca każde żądanie HTTP
const requestHandler = (request, response) => {
  console.log('Otrzymano żądanie HTTP');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!\n');
};

// Tworzymy serwer HTTP i przypisujemy funkcję obsługi żądań
const server = http.createServer(requestHandler);

// Nasłuchujemy na danym porcie
server.listen(PORT, () => {
  console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});

