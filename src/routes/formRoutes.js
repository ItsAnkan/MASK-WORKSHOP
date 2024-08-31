const TodoItem = require('../models/Form.js');
const express = require('express');


const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile('../../assets/index.html');
});

// CRUD

// 1. Read
router.get('/get-tasks', async (req, res) => {
    try {
        const taskData = await TodoItem.find();
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// 2. Create
router.post('/create-task', async (req, res) => {
    try {
        // console.log(req.body);
        const taskData = new TodoItem(req.body);
        await taskData.save();
        console.log('Task stored successfully', taskData);
        res.status(200).json(taskData);
    } catch (error) {
        console.error('Error storing task:', error);
        res.status(500).send('Internal Server Error');
    }
});


// 3. Update
router.post('/update-task', async (req, res) => {
    try {
        const id = req.body._id;
        const task = await TodoItem.findById(id);
        task.checked = !task.checked;
        await task.save();
        console.log('Updated task ', id, 'successfully!' );
        res.status(200).send('Updated successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// 4. Delete
router.post('/delete-task', async (req, res) => {
    try {
        const id = req.body._id;
        await TodoItem.findByIdAndDelete(id);
        console.log('Deleted task ', id, 'successfully!' );
        res.status(200).send('Deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;