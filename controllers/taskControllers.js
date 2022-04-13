const ejs = require('ejs');
const taskModel = require("../models/tasksModels")


async function getTasks(req, res) {
    const tasks = await taskModel.find().sort("date")
    if (tasks) {
        console.log(tasks)
        return res.render('index', { tasksArray: tasks})
    } return res.send("No task yet")
}

async function createTask(req, res) {
    if (req.body.action) {
        const newTask = await taskModel.create({
            action: req.body.action,
            category: req.body.categoryChoice
        })
        console.log(newTask)
        return res.redirect('/tasks')
    } 
    return res.redirect('/tasks');
}

async function getOneTask(req, res) {
    const task = await taskModel.find({_id : req.params.id})
    if (task) {
        console.log(task)
        return res.send(task);
    } return res.send(`The task with id:${req.params.id} doesn't exist`)
}

function deleteAll(req,res){
        taskModel.deleteMany({})
        .then(() => {
            res.redirect("/tasks");
        })
        .catch(error => {
            console.log(error);
            next(error);
        });
    };


function deleteOneTask(req, res) {
    const taskID = req.params.id;
    console.log(taskID);
    if (taskModel.find({_id : taskID})) {
        taskModel.deleteOne({_id: taskID}, function (error){
        if (error) console.log(error);})
        return res.redirect("/tasks");
    } return res.send(`The task with ${taskID} doesn't exist`)
}

module.exports = {getTasks, createTask, getOneTask, deleteOneTask, deleteAll}