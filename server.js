const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



// load environment variables
dotenv.config({ path: './config/.env' });





const app = express();

connectDB();







const port = process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}!`));