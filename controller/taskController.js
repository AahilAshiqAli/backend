const Task = require("../models/task")

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (tasks.length === 0) {
            return res.status(404).json({error : "No tasks found"})
        }
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({error : "Internal Sever Error"})
    }
}

const postTasks = async (req,res) => {
    try {
        const obj = {
            type : req.body.type,
            text : req.body.text,
            id : req.body.id
        }

        if (!obj.type || !obj.text || !obj.id) {
            return res.status(400).json({error : "Missing required fields"})
        }

            const newTask = new Task(obj)
            await newTask.save()
            // If the promise fails then it will throw an error and will be caught in the catch block
            res.status(201).json(newTask)

    } catch (error) {
        res.status(500).json({error : "Internal Sever Error"})
    }

}

const updateTasks = async (req, res) => {
    try{
        const obj = {
            type : req.body.type,
            text : req.body.text,
            id :req.body.id
        }
        if (!obj.type || !obj.text || !obj.id) {
            return res.status(400).json({error : "Missing required fields"})
        }
        const task = await Task.findOne({ id: obj.id}) // doesnot return an array. Only returns the first element
        if(!task){
            return res.status(404).json({error : "Task not found"})
        }
        task.type = obj.type || task.type;
        task.text = obj.text || task.text;
        task.id = obj.id || task.id;
        await task.save()
        res.status(200).json(task)

    }
    catch(error){
        res.status(500).json({error : "Internal Sever Error"})
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id})
        if(!task){
            return res.status(404).json({error : "Task not found"})
        }
        await task.deleteOne();
        res.status(200).json({message : "Task deleted successfully"})

    } catch (error) {
        res.status(500).json({error : "Internal Sever Error"})
    }
}

module.exports = {getTasks, postTasks, updateTasks, deleteTask}