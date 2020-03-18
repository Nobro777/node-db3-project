const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(userId) {
    return db('steps as s')
    .join('schemes as sch', 'sch.id', 's.id')
    .select('s.id', 's.step_number', 's.instructions', 's.scheme_id', 'sch.scheme_name as Scheme')
    .where('s.id', userId);
}

function add(item) {
    return db('schemes as s')
        .insert(item)
        .then(ids => {
        return findById(ids[0]);
    });
}

function update(changes, id){
    return db('schemes as s')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('schemes')
    .where('id', id)
    .del();
}