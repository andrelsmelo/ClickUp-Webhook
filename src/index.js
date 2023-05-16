const express = require('express');
const router = require('./routes/routes');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
