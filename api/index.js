// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");
const healthRouter = require("./health");
const activitiesRouter = require("./activities")

const bodyParser = require("body-parser");

// Body-parser middleware
apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");

    if (!auth) {

        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});

apiRouter.use("/health", healthRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/activities", activitiesRouter)

apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message,
    });
});

module.exports = apiRouter;