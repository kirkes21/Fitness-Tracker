const client = require("./client")

const createActivity = async ({ name, description }) => {
    name = name.toLowerCase()
    try {
        const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES ($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description]
        )


        return activity
    } catch (error) {
        throw error
    }
}

module.exports = {
    createActivity
}