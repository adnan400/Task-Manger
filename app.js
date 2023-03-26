const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config(); //very important to keep our secret in .env file with gitignore
//Importing files
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
//declare our express app
const app = express();

//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`App is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
