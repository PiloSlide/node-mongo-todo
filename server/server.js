const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3500;

mongoose.connect("mongodb+srv://Jimmy:MongoDBpassword@cluster0.cjiax.mongodb.net/TodoDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Task = require('./models/Todo');

app.get('/getTasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/createTasks', async (req, res) => {
    const task = req.body;
    const newTask = new Task(task);

    await newTask.save();
    res.json(task);
});

app.delete('/deleteTasks/:id', async (req,res) => {
    const result = await Task.findByIdAndDelete(req.params.id);

    res.json(result);
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})

