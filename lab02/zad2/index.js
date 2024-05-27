const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.json({ currentDateTime: new Date() });
});

app.listen(port, () => {
  console.log(`Aplikacja działa na porcie ${port}`);
});
