const express = require('express');
const apiRoutes = require('./src/routes');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
