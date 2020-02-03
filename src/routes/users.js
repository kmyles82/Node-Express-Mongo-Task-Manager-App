const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = await new User(req.body);
    
    try {
        
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, 
            req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({ user, token })
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const id = req.user.id
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        // const user = await User.findById(id)
        
        // if (!user) {
        //     return res.status(404).send()
        // }

        updates.forEach((update) => {
            
            req.user[update] = req.body[update]
        })

        await req.user.save()
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    // const id = req.user._id

    try {
        // const user = await User.findByIdAndDelete(id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        return res.status(500).send()
    }

});

module.exports = router