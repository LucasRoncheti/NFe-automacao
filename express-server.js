// express-server.js

const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'src')));

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
