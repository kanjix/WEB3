const express = require('express');
const bodyParser = require('body-parser');
const { connectDb } = require('./web3.js'); 

const blogController = require('./controllers/blog.controller.js');
const { errorHandler } = require('./middlewares');
const app = express();
app.use(bodyParser.json());
app.use('/api/blogs', blogController);
app.use(errorHandler);

connectDb() 
    .then(() => {
        console.log('db connection succeeded');
        app.listen(3000, () => console.log('server started at 3000'));
    })
    .catch(err => console.error(err)); 