const express = require('express');
const taskRoutes = require('./routes/taskRoutes')
const rootRoutes = require('./routes/rootRoutes');
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();
// const { use } = require('express/lib/application');


mongoose.connect(process.env.DB_SERVER)
.then(() => console.log("Connected to DB server"))
.catch((err) => console.log(err));

const app = express();
const port = process.env.PORT
const hostName = 'localhost'

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.sendFile("index.html"));
app.use('/tasks', taskRoutes)
 

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})
