const express = require('express');
const router = express.Router();
const db = require('./ticket-model');
const authmiddleware = require('../../middleware/authmiddleware');

// host/api/tickets/
router.get('/', authmiddleware.userAuth, async (req, res) => {
    try {
        const tickets = await db.find();
        res.status(200).json({ tickets })
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.post('/', authmiddleware.userAuth, async (req, res) => {
    try {
        const ticket = req.body;
        const [ newTicket ] = await db.add(ticket);
        res.status(201).json({ newTicket });
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.delete('/:id', authmiddleware.userAuth, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const deletedTickets = await db.removeTicket(ticketId);
        if(deletedTickets > 0){
            res.status(204).send();
        } else {
            console.log(deletedTickets)
            res.status(404).json({ message: "We couldn't find that ticket" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.put('/:id', authmiddleware.userAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = req.body;
        const [ updatedTicket ] = await db.update(ticket, id);
        res.status(201).json({ updatedTicket });
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;