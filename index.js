const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// model
const taskSchema = require('./model/Task')

const Todo = mongoose.model('Todo', taskSchema)


const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = 7000

const MongoDBAccess = 'mongodb+srv://Admin:Admin123@projectdb.bjeizj5.mongodb.net/'

mongoose.connect(MongoDBAccess, { useNewUrlParser: true }).then(() => {
    console.log('my mongoDB has connected')
}).catch((err) => {
    console.log(err)
})


app.listen(port, () => {
    console.log(`we are listening to ${port}`)
})

app.get('/', (req, res) => {
    res.send('hello')
})


// C R U D

// CREATE A NEW TASK

// let schoolTask = new Todo(
//     {
//         name: 'read a book',
//         date: '26 Oct 2023',
//         isDone: false
//     }
// )

// schoolTask.save()

// HTTP Methods
// Post, Get, Put, Patch, Delete

// Create
app.post('/task', async (req, res) => {
    let schoolTask = new Todo(
        {
            name: req.body.name,
            date: req.body.date,
            isDone: false
        }
    )
    let data = await schoolTask.save()
    res.send(data)
})


// Read
app.get('/get_task', (req, res) => {
    Todo.find((err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)

    })
})


//Put

app.patch('/update_task', async (req, res) => {
    try {
        let data = await Todo.findOneAndUpdate({ _id: req.body.id }, { isDone: req.body.isDone })
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})

app.put('/update_task', (req, res) => {
    Todo.findOneAndUpdate({ _id: "653ad85b29a78116e8217a16" }, { name: "learning CRUD Operation" }, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })

})


// Delete
app.delete('/delete_task', async (req, res)=>{
  let data = await  Todo.findByIdAndDelete({_id:req.body.id})
  res.send({message:'deleted succuss'})
})
