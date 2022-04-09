const express = require("express");
const usersRouter = express.Router();
const requireUser = require('./utils')
const { createUser, getUserById, getUserByUsername, getAllRoutinesByUser, getPublicRoutinesByUser, getPublicRoutinesByActivity, getUser } = require('../db')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.get("/me", requireUser, async (req, res, next) => {
    try {
        res.send(req.user);

    } catch ({ name, message }) {
        next({ name, message })
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const { rows: [_user] } = await getUserByUsername(username);

        if (_user) {
            res.status(401);
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        } else if (password.length < 8) {
            res.status(401);
            next({
                name: 'PasswordLengthError',
                message: 'Password Too Short!'
            });
        } else {
            const user = await createUser({
                username,
                password
            });
            if (!user) {
                next({
                    name: 'UserCreationError',
                    message: 'There was a problem registering you. Please try again.',
                });
            } else {
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1w' });

                res.send({
                    user,
                    message: "You are now registered and logged in!",
                    token
                });
            }
        }
    } catch ({ next, message }) {
        next({ next, message })
    }
});

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401);
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const { rows: [user] } = await getUserByUsername(username);

        if (user && user.password == password) {
            const token = jwt.sign(
                {
                    id: user.id,
                    username
                },
                JWT_SECRET
            );

            res.send({
                user,
                message: "You are now logged in!",
                token
            });
        } else {
            res.status(401);
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect"
            });
        }
    } catch (error) {
        throw error
    }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
    const username = req.params.username

    try {
        const routines = await getPublicRoutinesByUser({ username })
        res.send(routines)
    } catch (error) {
        throw error
    }
})

module.exports = usersRouter;