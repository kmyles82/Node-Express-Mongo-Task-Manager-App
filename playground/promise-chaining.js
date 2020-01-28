require('../src/db/mongoose')
const User = require('../src/models/user')

const id = '5e2cc20bcc8651c6dde93872'
const id1 = '5e2cc9158a5cf3f5f5633d8d'

// User.findByIdAndUpdate(id1, { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount(id, 55).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log('Error: ', err)
})