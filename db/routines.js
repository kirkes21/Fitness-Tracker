const client = require("./client");

const getRoutineById = async (id) => {
    try {
        const {rows} = await client.query(`
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
        const {rows} = await client.query (`
            SELECT *
            FROM routines
        `)
        return rows
    } catch (error) {
        
    }
}

const getAllRoutines = async () => {
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM routines
        `)
        console.log('ALL ROUTINES', rows)
        return rows
    } catch (error) {
        
    }
}

const getAllPublicRoutines = async () => {
    try {
        
    } catch (error) {
        
    }
}

const getAllRoutinesByUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

const getPublicRoutinesByUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

const getPublicRoutinesByActivity = async () => {
    try {
        
    } catch (error) {
        
    }
}

const createRoutine = async ({creatorId, isPublic, name, goal}) => {
    try {
       const {rows: [routine]} = await client.query(`
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
    getRoutinesWithoutActivities

};
