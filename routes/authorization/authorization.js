const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');
const generateToken = require('../../generateToken');
const middleware = require('../../middleware/authmiddleware');

// host/api/auth/
router.get('/', middleware.helperAuth, async (req, res) => {
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
        const [ newUser ] = await db.add(user);
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
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})

// host/api/auth/
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await db.removeUser(id);
        if(deleted.length > 0){
            res.status(204);
        } else {
            res.status(401).json({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;