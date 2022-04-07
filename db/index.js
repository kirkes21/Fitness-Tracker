// require and re-export all files in this db directory (users, activities...)

const {
  createUser,
  getUserById,
  getUser } = require("./users");

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
  getPublicRoutinesByActivity
} = require('./routines')

const {
  addActivityToRoutine
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
  getPublicRoutinesByActivity
}
