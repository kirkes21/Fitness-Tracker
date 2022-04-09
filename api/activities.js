const express = require("express");
const { getAllActivities, updateActivity, createActivity } = require("../db");
const requireUser = require('./utils')
const activitiesRouter = express.Router();

activitiesRouter.get('/', async (req, res, next) => {
    try {
        const allActivities = await getAllActivities()

        res.send(allActivities)
    } catch (error) {
        throw error
    }
})

activitiesRouter.post('/', requireUser, async (req, res, next) => {
    const { name, description } = req.body

    try {
        const newActivity = await createActivity({ name, description })

        res.send(newActivity)
    } catch (error) {
        throw error
    }
})

activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
    const { activityId } = req.params
    const { name, description } = req.body

    const updateFields = {}

    if (name) {
        updateFields.name = name
    }

    if (description) {
        updateFields.description = description
    }

    try {
        const updatedActivity = await updateActivity({ activityId, updateFields })

        res.send(updatedActivity)
    } catch (error) {
        throw error
    }
})

module.exports = activitiesRouter