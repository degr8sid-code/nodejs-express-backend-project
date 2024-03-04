// require('dotenv').config()
// common JS
// const express = require('express');


// modern syntax - module JS
import dotenv from "dotenv"
import express from 'express';
import listRoute from './src/routes/listroute.js';
import taskRoute from './src/routes/taskroutes.js';
import connectDB from './src/db/index.js';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

dotenv.config({
    path: './.env'
})

const app = express()
//const port = 8000
//production grade code
const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

//home route
// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

// app.get('/api/mylist', (req, res) => {
//     const mylist = [
//         {
//             id: 1,
//             task: "this is task 1"
//         },
//         {
//             id: 2,
//             task: "this is task 2"
//         },
//         {
//             id: 3,
//             task: "this is task 3"
//         }
//     ]

//     res.send(mylist)
// })

// app.get('/api/login', (req, res) => {
//     res.send('<h1>please log in</h1>')
// }
// )
const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title: 'My To Do List API',
            version: '1.0.0'
        }
    },
    apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
);

// Importing and using the listRoute
app.use('/api', listRoute);

// Importing and using the taskRoute
app.use('/api', taskRoute);



// app.listen(port, () => {
//     console.log(`Listening to ${port}`)
// })