const express = require("express");
const { getAllPublicRoutines, createRoutine } = require("../db")
const requireUser = require('./utils')
const routinesRouter = express.Router();

routinesRouter.get('/', async (req, res, next) => {
    try {
        const allPublicRoutines = await getAllPublicRoutines()

        res.send(allPublicRoutines)
    } catch (error) {
        throw error
    }
})

routinesRouter.post('/', requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body
    const { id } = req.user
    const fields = {
        id,
        isPublic,
        name,
        goal
    }

    try {
        const newRoutine = await createRoutine(fields)

        res.send(newRoutine)
    } catch (error) {
        throw error
    }
})

module.exports = routinesRouter