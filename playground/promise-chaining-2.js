require('../src/db/mongoose')
const Task = require('../src/models/task')

const id = '5e2cc5ca1c22ceeff5925945'

Task.findByIdAndDelete(id).then((task) => {
    console.log(`Task to be removed ${task}`)
    return Task.countDocuments({ completed: false })
}).then((results) => {
    console.log(`Number of collections with uncompleted tasks: ${results}`)
}).catch((err) => {
    console.log(err)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount(id).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})