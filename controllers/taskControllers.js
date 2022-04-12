const ejs = require('ejs');
const taskModel = require("../models/tasksModels")


async function getTasks(req, res) {
    const tasks = await taskModel.find().sort("date")
    if (tasks) {
        console.log(tasks);
        return res.render('index', { tasksArray: tasks})
    } return res.send("No task yet")
}

async function createTask(req, res) {
    if (req.body.action) {
        const newTask = await taskModel.create({
            action: req.body.action,
        })
        console.log(newTask)
        res.redirect('/tasks')
    } 
    res.redirect('/tasks');
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
    const taskID = req.params.id
    console.log(taskID)
    const task = taskModel.find({_id : taskID})
   
    if (task) {
        taskModel.deleteOne( {_id: taskID}, function(error){
            if (error) console.log(error);
            return res.send(error);
        })  
        return res.redirect("/tasks");
    } return res.send(`The task with ${taskID} doesn't exist`)
}


// function removeTask(req, res) {

//     var completeTask = req.body.check;

//     if(typeof(completeTask)=="object") {        //if more than one tasks selected, then we deal with array     
//         for (var i = 0; i < completeTask.length; i++) {

//             Task.deleteOne( {_id: completeTask[i]}, function (error){
//                 if (error) console.log(error);
//                 res.redirect("/");
//             });
//         }
//     }
//     else {
//         Task.deleteOne( {_id: completeTask}, function(error){
//             if (error) console.log(error);
//             res.redirect("/");
//         });
//     }
// };

module.exports = {getTasks, createTask, getOneTask, deleteOneTask, deleteAll}

// TODO VERIFY SYNTAX
// async function updateTask() {
//     const task = await userModel.find({_id : req.params.id})
//     task.action = req.body.action,
//     task.status = req.body.status,
//     task.save(),
//     res.json(task)
// }
   


// function updateTask(req, res) { 
//         let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
//         taskJson[index].status = req.body.status || taskJson[index].status
//         taskJson[index].action = req.body.action || taskJson[index].action
//         const newData = JSON.stringify(taskJson)
//         fs.writeFile("public/storage.json",newData, (err) => {
//             if (err) throw err;
//                 console.log("Data updated");
//             });
//         res.send(`Task ${req.params.id} has been updated`);

//     }

// function deleteTask(req, res) { 
//         let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
//         console.log(index)
//         if (index || index === 0) {
//             taskJson.splice(index, 1)
//             const newData = JSON.stringify(taskJson)
//             fs.writeFile("public/storage.json", newData, (err) => {
//                 if (err) throw err;
//                     console.log("Data deleted");
//                 });
//             return res.redirect('/tasks');
//         } return res.send("This task doesn't exist")
//     }



