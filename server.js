const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');



// load environment variables
dotenv.config({ path: './config/.env' });


connectDB();

const app = express();

// routes

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')



app.use(express.json());
app.use(cookieParser());


app.use('/user',userRouter)
app.use('/blog',blogRouter)



app.use(errorHandler)


const port = process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}!`));