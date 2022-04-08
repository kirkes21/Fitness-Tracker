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

async function attachActivitiesToRoutines(routines) {
    // no side effects
    const routinesToReturn = [...routines];
    const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
    const routineIds = routines.map(routine => routine.id);
    if (!routineIds?.length) return [];
    
    try {
      // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${ binds });
      `, routineIds);
  
      // loop over the routines
      for(const routine of routinesToReturn) {
        // filter the activities to only include those that have this routineId
        const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
        // attach the activities to each single routine
        routine.activities = activitiesToAdd;
      }
      return routinesToReturn;
      
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
  attachActivitiesToRoutines
};
