const db = require('../../data/db');

// return list of all tickets
function find(){
    return db('tickets');
}

// add new ticket
function add(ticket){
    return db('tickets').insert(ticket).returning("*");
}

// removes ticket by id
function removeTicket(id){
    return db('tickets').where({ id }).delete();
}

// update ticket
function update(ticket, id){
    return db('tickets').where({ id }).update(ticket).returning("*");
}

module.exports = {
    find,
    add,
    removeTicket,
    update
}