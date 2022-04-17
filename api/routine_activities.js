const express = require("express");
const {
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
  getRoutineById,
} = require("../db");
const requireUser = require("./utils");
const routineActivitiesRouter = express.Router();

routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const { count, duration } = req.body;
      const creatorId = req.user.id;

      const updatedRoutineActivityObj = {
        id: routineActivityId,
        count,
        duration,
      };

      const routineActivity = await getRoutineActivityById(routineActivityId);

      const routineId = routineActivity.routineId;
      const routine = await getRoutineById(routineId);

      if (routine.creatorId == creatorId) {
        const updatedRoutineActivity = await updateRoutineActivity(
          updatedRoutineActivityObj
        );
        res.send(updatedRoutineActivity);
      } else {
        res.status(401);
        next();
      }
    } catch (error) {
      throw error;
    }
  }
);

routineActivitiesRouter.delete("/:routineActivityId",
requireUser,
async (req, res, next) => {
    try {
        const { routineActivityId } = req.params;
        const creatorId = req.user.id;
        const routineActivity = await getRoutineActivityById(routineActivityId);

        const routineId = routineActivity.routineId;
        const routine = await getRoutineById(routineId);
        if (routine.creatorId == creatorId) {
        const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId)
        res.send(deletedRoutineActivity)
    } else {
        res.status(401)
        next()
    }
    } catch (error) {
        throw error
    }
})


module.exports = routineActivitiesRouter;
