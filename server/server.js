const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const cors = require('cors')

require('dotenv').config()
// устанавливаем порт сервера
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

try {
  mongoose.connect('mongodb+srv://sherkios:notespassword@cluster0.oeciexq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
  .then(db => console.log(`DB is connected`))
  .catch(err => console.warn(err))

  

  app.use('/api/notes', require('./routes/Notes'));
  app.use('/api/users', require('./routes/Users'));

  app.use('/', express.static(path.join(__dirname, '../dist')));

  app.listen(PORT, () => {
    console.log(`Сервер начал работать по http://localhost:${PORT}`);
  })
} catch (error) {
  console.warn(error);
}
