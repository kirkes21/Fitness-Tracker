const client = require("./client");

const createActivity = async ({ name, description }) => {
  name = name.toLowerCase();
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
            INSERT INTO activities (name, description)
            VALUES ($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
      [name, description]
    );

    return activity;
  } catch (error) {
    throw error;
  }
};

const getAllActivities = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *  
            FROM activities;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getActivityById = async (id) => {
  try {
    const {
      rows: [activity],
    } = await client.query(`
            SELECT * FROM activities
            WHERE id=$1;
        `, [id]);

    return activity;
  } catch (error) {
    throw error;
  }
};

const updateActivity = async ({ id, ...fields }) => {
  try {

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}" =$${index + 1}`)
    .join(", ");

    const { rows: [activity]} = await client.query(`
    UPDATE activities
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `, Object.values(fields))

    return activity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
};
