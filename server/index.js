import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configs/dbConnection.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'
import { notFound, errorHandler} from './middlewares/expressMiddleware.js'

const __dirname = path.resolve();
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
//We must call config() method of dotenv on the top of the index.js file. 
//Otherwise environment variables may not word in this file or any other file if they are called before calling this function.  
dotenv.config();
const PORT = process.env.PORT || 5550;

const app = express();
//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
//i.e if we don't write following line(or any similar code) and suppose if we send some data in JSON format in request body,then we might not be able to access them.
app.use(express.json());

//Serves all the request which includes /images in the url from 'public' folder
app.use('/uploads', express.static(__dirname + '/uploads'));

//Cors configuration using "cors" middleware.
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//Database connection
connectDB(); 

//Test Url - To check if node server is accessible.
app.get("/", (req, res) => res.send("Node server is working properly"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)).on('error', (err) => {
    if (err.errno === 'EADDRINUSE') {
        console.log(`Error : Port ${PORT} is busy,Please check and Retry`);
    } else {
        console.log(err);
    }
})

//Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

//Error related middlewares - Should be included in the last. 
app.use(notFound);
app.use(errorHandler);