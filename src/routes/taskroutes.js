// routes/taskroute.js
import express from 'express';

const router = express.Router();

// In-memory storage for tasks
let tasks = [];

// Middleware to parse incoming JSON requests
router.use(express.json());

router.post('/addtask', (req, res) => {
    try {
        // Extract task data from the request body
        const { task } = req.body;

        // Create a new task object
        const newTask = {
            id: tasks.length + 1,
            task
        };

        // Add the new task to the in-memory storage
        tasks.push(newTask);

        res.status(201).json({ message: 'Task added successfully', task: newTask });
        console.log(task)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/alltasks', (req, res) => {
    // Return all tasks stored in memory
    res.status(200).json(tasks);
});

export default router;