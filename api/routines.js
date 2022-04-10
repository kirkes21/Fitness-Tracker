const express = require("express");
const { getAllPublicRoutines, createRoutine, updateRoutine, getRoutineById } = require("../db")
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
        creatorId: id,
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

routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body
    const { routineId } = req.params

    const updateFields = {
        id: routineId
    }

    if (isPublic) {
        updateFields.isPublic = isPublic
    }
    if (name) {
        updateFields.name = name
    }
    if (goal) {
        updateFields.goal = goal
    }

    try {
        const originalRoutine = await getRoutineById(routineId)

        if (originalRoutine.creatorId === req.user.id) {
            const updatedRoutine = await updateRoutine(updateFields)

            res.send(updatedRoutine)
        } else {
            next()
        }

    } catch (error) {
        throw error
    }
})

module.exports = routinesRouter