const express = require('express');
const path = require('path');
const app = express();

const distFolder = path.join(__dirname, 'www');

app.use(express.static(distFolder));

app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor Ionic Angular corriendo en el puerto 3000');
});
