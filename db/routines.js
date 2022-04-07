const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities")

const getRoutineById = async (id) => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM routines
            WHERE id=$1
        `, [id])
        return rows
    } catch (error) {

    }
}

const getRoutinesWithoutActivities = async () => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM routines
        `)
        return rows
    } catch (error) {

    }
}

const getAllRoutines = async () => {
    try {
        const { rows } = await client.query(`
            SELECT routines.*, users.username as "creatorName"
            FROM routines
            LEFT JOIN users ON "creatorId"=users.id
        `)
        return attachActivitiesToRoutines(rows)
    } catch (error) {

    }
}

const getAllPublicRoutines = async () => {
    try {
        console.log("ALLPUBLIC")
        const { rows } = await client.query(`
            SELECT routines.*, users.username as "creatorName"
            FROM routines
            LEFT JOIN users ON "creatorId"=users.id
            WHERE "isPublic"
        `)
        return attachActivitiesToRoutines(rows)
    } catch (error) {

    }
}

const getAllRoutinesByUser = async ({ username }) => {
    try {
        const { rows } = await client.query(`
            SELECT routines.*, users.username as "creatorName"
            FROM routines
            LEFT JOIN users ON "creatorId"=users.id
            WHERE users.username=$1
        `, [username])
        return attachActivitiesToRoutines(rows)
    } catch (error) {
        throw error
    }
}

const getPublicRoutinesByUser = async ({ username }) => {
    try {
        const { rows } = await client.query(`
            SELECT routines.*, users.username as "creatorName"
            FROM routines
            LEFT JOIN users ON "creatorId"=users.id
            WHERE users.username=$1 AND routines."isPublic"
        `, [username])
        return attachActivitiesToRoutines(rows)
    } catch (error) {
        throw error
    }
}

const getPublicRoutinesByActivity = async ({ id }) => {
    try {
        const { rows } = await client.query(`
            SELECT routines.*, users.username as "creatorName"
            FROM routines
            LEFT JOIN routine_activities ON "activityId"=$1
            LEFT JOIN users ON "creatorId"=users.id
            WHERE routines."isPublic"
        `, [id])
        return attachActivitiesToRoutines(rows)
    } catch (error) {
        throw error
    }
}

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
    try {
        const { rows: [routine] } = await client.query(`
       INSERT INTO routines("creatorId", "isPublic", name, goal)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING
       RETURNING *
       `, [creatorId, isPublic, name, goal])
        return routine
    } catch (error) {

    }
}

const updateRoutine = async () => {
    try {

    } catch (error) {

    }
}

const destroyRoutine = async () => {
    try {

    } catch (error) {

    }
}






module.exports = {
    createRoutine,
    getAllRoutines,
    getRoutinesWithoutActivities,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity
};
