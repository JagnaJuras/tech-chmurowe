#!/bin/bash

# Tworzenie Dockerfile
cat << EOF > Dockerfile
FROM node:12
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "server.js"]
EOF

# Tworzenie pliku server.js
cat << EOF > server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(8080, () => {
  console.log('Serwer działa na porcie 8080');
});
EOF

# Budowanie obrazu Docker
docker build -t nodejs_server .

# Uruchomienie kontenera Docker
docker run -p 8080:8080 -d nodejs_server

# Testowanie serwera
echo "Testowanie serwera..."

RESPONSE=$(curl -s http://localhost:8080)
if [ "$RESPONSE" == "Hello World" ]; then
  echo "Test udany!" $RESPONSE
else
  echo "Test nieudany."
fi
