// controllers/taskController.js
// Assuming you're using Mongoose and Task model
import { Task } from "../models/task.model";

// Controller to add a new task
export const addTask = async (req, res) => {
    try {
        // Extract task data from the request body
        const { task } = req.body;

        // Create a new task object
        const newTask = new Task({
            task
        });

        // Save the new task to the database
        const savedTask = await newTask.save();

        res.status(201).json({ message: 'Task added successfully', task: savedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all tasks
export const getAllTasks = async (req, res) => {
    try {
        // Retrieve all tasks from the database
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
