#!/bin/bash

# Tworzenie pliku index.js
cat <<EOF > index.js
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.json({ currentDateTime: new Date() });
});

app.listen(port, () => {
  console.log(\`Aplikacja działa na porcie \${port}\`);
});
EOF

# Uruchamianie kontenera
docker run -d -p 8080:8080 --name node-express-container node:14 bash -c "mkdir /app && cd /app && echo \"$(cat index.js)\" > index.js && npm install express && node index.js"

sleep 10
curl http://localhost:8080
echo ""
