const express = require('express');
const router = express.Router();
const db = require('./ticket-model');

// host/api/tickets/
router.get('/', async (req, res) => {
    try {
        const tickets = await db.find();
        res.status(200).json({ tickets })
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.post('/', async (req, res) => {
    try {
        const ticket = req.body;
        const [ newTicket ] = await db.add(ticket);
        res.status(201).json({ newTicket });
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.delete('/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const deletedTickets = await db.removeTicket(ticketId);
        if(deletedTickets.length > 0){
            res.status(204);
        } else {
            res.status(401).json({ message: "We couldn't find that ticket" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
})

// host/api/tickets/
router.put('/:id', async (req, res) => {
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