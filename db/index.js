// require and re-export all files in this db directory (users, activities...)

const { createUser, getUserById, getUserByUsername } = require('./users')
const { createActivity } = require('./activities')
module.exports = {
    createUser,
    getUserById,
    createActivity,
    getUserByUsername
}