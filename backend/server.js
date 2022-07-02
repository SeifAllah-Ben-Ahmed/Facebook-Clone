/*eslint global-require: "off"*/
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const globalErrorHandler = require('./controllers/errorHandler');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

// CORS Middleware
const allowed = ['http://localhost:3000'];
const options = (req, res) => {
  let tmp;
  const origin = req.header('Origin');
  if (allowed.indexOf(origin)) {
    tmp = { origin: 'http://localhost:3000', optionsSuccessStatus: 200 };
  }

  res(null, tmp);
};

app.use(cors(options));

//Image Upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes

fs.readdirSync('./routes').map((route) =>
  app.use('/', require(`./routes/${route}`))
);

// Handle 404 not found routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on thus server!`, 404));
});
// Global Error Handle
app.use(globalErrorHandler);
// DataBase

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.error('Database Connection Failed', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is Runing on Port ${PORT} ...`);
});
