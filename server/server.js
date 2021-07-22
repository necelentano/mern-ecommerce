const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');

// app
const app = express();

// DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED SUCCESSFULLY!'))
  .catch((error) => console.log('DB CONNECTION ERROR', error));

// middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

// routes middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
