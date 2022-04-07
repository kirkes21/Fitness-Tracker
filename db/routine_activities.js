const client = require("./client");

const addActivityToRoutine = async ({ routineId, activityId, count, duration }) => {

    try {
        const { rows } = await client.query(`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)
    `, [routineId, activityId, count, duration])

        return rows
    } catch (error) {
        throw error
    }
}

const getRoutineActivitiesByRoutine = async ({ id }) => {
    try {
        const { rows } = await client.query(`
        SELECT FROM routine_activities
        WHERE "routineId"=$1
        `, [id])

        return rows
    } catch (error) {
        throw error
    }
}


module.exports = {
    addActivityToRoutine,
    getRoutineActivitiesByRoutine
}