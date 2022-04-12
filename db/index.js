// require and re-export all files in this db directory (users, activities...)

const {
  createUser,
  getUserById,
  getUser,
  getUserByUsername
} = require("./users");

const {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("./activities");

const {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutine
} = require('./routines')

const {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity
} = require('./routine_activities')

module.exports = {
  createUser,
  getUserById,
  getUser,
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  addActivityToRoutine,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getUserByUsername,
  getRoutineActivityById
}
