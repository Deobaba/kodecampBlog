const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');



// load environment variables
dotenv.config({ path: './config/.env' });





const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());



errorHandler();


const port = process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}!`));