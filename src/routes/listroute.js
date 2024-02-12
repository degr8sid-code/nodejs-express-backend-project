// routes/listroute.js
import express from 'express';

const router = express.Router();

router.get('/mylist', (req, res) => {
    const mylist = [
        {
            id: 1,
            task: "this is task 1"
        },
        {
            id: 2,
            task: "this is task 2"
        },
        {
            id: 3,
            task: "this is task 3"
        }
    ];

    res.send(mylist);
});

router.get('/login', (req, res) => {
    res.send('<h1>please log in</h1>');
});

export default router;
