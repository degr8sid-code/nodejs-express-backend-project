// require('dotenv').config()
// common JS
// const express = require('express');


// modern syntax - module JS
import express from 'express';
import listRoute from './src/routes/listroute.js';
import taskRoute from './src/routes/taskroutes.js';
import connectDB from './src/db/index.js';


const app = express()

//const port = 8000
//production grade code
const port = process.env.PORT || 8000;


connectDB()
//home route
app.get('/', (req, res) => {
    res.send("Hello World")
})

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

app.get('/api/login', (req, res) => {
    res.send('<h1>please log in</h1>')
}
)

// Importing and using the listRoute
app.use('/api', listRoute);

// Importing and using the taskRoute
app.use('/api', taskRoute);

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})