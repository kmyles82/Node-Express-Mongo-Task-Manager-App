// CRUD create read update delete
const { MongoClient, ObjectID } = require('mongodb')
// const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to database`)
    }

    const db = client.db(databaseName)
        
    // db.collection('users').findOne({ _id: new ObjectID("5e2b3f4e017c6d7b61ade616") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find the user')
    //     }

    //     console.log(user)
    // })
        
    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
    // db.collection('tasks').find({ completed: false }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({
    //     _id: new ObjectID("5e2b44a73cd40f6d6d605604")
    // }, (error, tasks) => {
    //         console.log(tasks)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e2b3f4e017c6d7b61ade616")
    // }, { 
    //     $set: {
    //         name: 'Kerry'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
    

    // db.collection('users').findOneAndUpdate({
    //     _id: new ObjectID("5e2b3f4e017c6d7b61ade616")
    // }, { name: 'Alex' }, (error, user) => {
    //         console.log(user)
    // })

    // db.collection('users').deleteOne({
    //     _id: ObjectID("5e2b3f4e017c6d7b61ade616")
    // }).then((result) => {
    //     return []
    // }).catch(err => err)

    db.collection('users').deleteMany({ name: 'Kerry' }).then((result) => {
        console.log(result)
    }).catch((err) => { console.log(err)})
        
})