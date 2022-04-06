// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");

const bodyParser = require("body-parser");

// Body-parser middleware
apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;