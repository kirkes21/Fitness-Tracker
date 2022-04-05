// require and re-export all files in this db directory (users, activities...)

const { createUser, getUserById } = require('./users')

module.exports = {
    createUser,
    getUserById
}