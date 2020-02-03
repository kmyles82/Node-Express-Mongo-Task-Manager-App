const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const allowedUpdates = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({
            error: "Invalid updates"
        })
    }

    try {

        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
            // console.log(req.body[update])
        });

        await task.save()

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router