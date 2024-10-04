const express = require('express');
const { getEnhancedDescription, getRecommendation } = require('../utils/aiService');
const Task = require('../models/Task'); 
const User = require('../models/User'); 

const router = express.Router();

router.post('/tasks', async (req, res) => {
    const { taskName, compensation, description, location, userId } = req.body;

    try {
        const enhancedDescription = await getEnhancedDescription(description);
        
        const newTask = new Task({
            taskName,
            compensation,
            description: enhancedDescription,
            location,
            userId,
        });

        await newTask.save();

        const workers = await User.find({ role: 'worker' }); 
        workers.forEach(worker => {
            recommendTaskToWorker(worker, newTask);
        });

        res.status(201).json(newTask); // Respond with the created task
    } catch (error) {
        res.status(500).json({ message: 'Error posting task' });
    }
});

const recommendTaskToWorker = async (worker, task) => {
    try {
        const workerSkills = worker.skills.join(', '); 

        const recommendation = await getRecommendation(workerSkills, task.description, task.taskName);
        
        if (recommendation) {
            console.log(`Recommended task "${task.taskName}" to ${worker.email}: ${recommendation}`);
        }
    } catch (error) {
        console.error(`Error recommending task to worker ${worker.email}:`, error);
    }
};


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId', 'name');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks' });
    }
});

router.put('/tasks/:taskId/accept', async (req, res) => {
    const { workerId } = req.body; 
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { acceptedBy: workerId }, { new: true });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const poster = await User.findById(task.userId);
        console.log(`Notify ${poster.email}: Your task "${task.taskName}" has been accepted by worker with ID ${workerId}`);

        res.status(200).json(task); 
    } catch (error) {
        res.status(500).json({ message: 'Error accepting task' });
    }
});

// Endpoint to get a task by ID
router.get('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId).populate('userId', 'name');
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task); // Respond with the task details
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task' });
    }
});


module.exports = router; 
