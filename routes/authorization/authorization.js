const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');

// host/api/auth/
router.get('/', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/auth/register
router.post('/register', async (req, res) => {
    try {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);
        const newUser = await db.add(user);
        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.findBy(username);
        res.status(201).json({ message: "welcome " + username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})


module.exports = router;