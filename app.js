const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const dotenv = require('dotenv');
dotenv.config();
require('express-async-errors');

const productRouter = require('./routes/products');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Welcome'));
app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, console.log(`app listening on port : ${port}`));
};

start();
