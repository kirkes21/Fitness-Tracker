const express = require("express");
const { getAllActivities } = require("../db");
const activitiesRouter = express.Router();

activitiesRouter.get('/', async (req, res, next) => {
    try {
        const allActivities = await getAllActivities()

        res.send(allActivities)
    } catch (error) {
        throw error
    }
})

module.exports = activitiesRouter