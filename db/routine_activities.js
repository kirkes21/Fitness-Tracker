const client = require("./client");

const getRoutineActivityById = async (id) => {

    try {
        const { rows: [activity] } = await client.query(`
            SELECT * FROM routine_activities
            WHERE id=$1
        `, [id])

        return activity
    } catch (error) {
        throw error
    }
}

const addActivityToRoutine = async ({ routineId, activityId, count, duration }) => {

    try {
        const { rows: [activity] } = await client.query(`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [routineId, activityId, count, duration])
        return activity
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

const updateRoutineActivity = async ({ id, ...fields }) => {
    try {

        const setString = Object.keys(fields)
            .map((key, index) => `"${key}" =$${index + 1}`)
            .join(", ");

        const { rows: [activity] } = await client.query(`
        UPDATE routine_activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields))
        return activity
    } catch (error) {
        throw error
    }
}

const destroyRoutineActivity = async (id) => {
    try {
        console.log(id)
        const { rows: [activity] } = await client.query(`
        DELETE FROM routine_activities
        WHERE id=$1
        RETURNING *
        `, [id])
        return activity
    } catch (error) {
        throw error
    }
}

module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
}