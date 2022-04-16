const express = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActivitiesByRoutine,
} = require("../db");
const requireUser = require("./utils");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allPublicRoutines = await getAllPublicRoutines();

    res.send(allPublicRoutines);
  } catch (error) {
    throw error;
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const { id } = req.user;
  const fields = {
    creatorId: id,
    isPublic,
    name,
    goal,
  };

  try {
    const newRoutine = await createRoutine(fields);

    res.send(newRoutine);
  } catch (error) {
    throw error;
  }
});

routinesRouter.post(
  "/:routineId/activities",
  requireUser,
  async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const { activityId, count, duration } = req.body;
      const response = await getRoutineActivitiesByRoutine({ routineId });
      const filteredArray = response.filter(
        (routineActivity) => routineActivity.routineId === +routineId
      );
      if (filteredArray.length !== 0) {
        //added "return"
        return (
        res.status(401),
        next({ name: "Duplicate", message: "This item already exists" })
        )
      }
      const attachedRoutine = await addActivityToRoutine({
        routineId,
        activityId,
        count,
        duration,
      });

      res.send(attachedRoutine);
    } catch (error) {
      throw error;
    }
  }
);

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const { routineId } = req.params;

  const updateFields = {
    id: routineId,
  };

  if (isPublic) {
    updateFields.isPublic = isPublic;
  }
  if (name) {
    updateFields.name = name;
  }
  if (goal) {
    updateFields.goal = goal;
  }

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine(updateFields);

      res.send(updatedRoutine);
    } else {
      next();
    }
  } catch (error) {
    throw error;
  }
});

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;

  try {
    const deletedRoutine = await destroyRoutine(routineId);

    res.send(deletedRoutine);
  } catch (error) {
    throw error;
  }
});

module.exports = routinesRouter;
