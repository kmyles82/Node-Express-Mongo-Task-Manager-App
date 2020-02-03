const express = require('express')
require('./db/mongoose')


const taskRouter = require('./routes/tasks')
const userRouter = require('./routes/users')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

const Task = require('./models/task')
const User = require('./models/user')
const id = '5e35e42e5969a17d551713e6'

const main = async (req, res) => {
    // const task = await Task.findById(id)
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById(id)
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}

main()





            