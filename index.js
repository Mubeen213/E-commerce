const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect');
require('express-async-errors')
require('morgan')
const app = express();


app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))


const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const authRoutes = require('./routes/authRoutes')

app.get('/', (req, res) => {
    res.send('E-commerce API')
})

app.get('/api/v1', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send('E-commerce API v1')

})


app.use('/api/v1/auth', authRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}..`);
    });
};

start();
