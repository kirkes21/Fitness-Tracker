const express = require("express");
const usersRouter = express.Router();
const requireUser = require('./utils')
const { createUser, getUserById, getUserByUsername } = require('../db')
const jwt = require("jsonwebtoken");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
});

usersRouter.get("/:userId", requireUser, async (req, res, next) => {

    try {
        const user = await getUserById(req.params.userId);

        if (user && user.id === req.user.id) {
            res.send(user);
        } else {
            next(
                post
                    ? {
                        name: "UnauthorizedUserError",
                        message: "You cannot delete a user which is not yours",
                    }
                    : {
                        name: "UserNotFoundError",
                        message: "That user does not exist",
                    }
            )
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const { rows: [_user] } = await getUserByUsername(username);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that username already exists'
            });
        }

        if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password should be at least 8 characters'
            });
        }

        const user = await createUser({
            username,
            password
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "thank you for signing up",
            token
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    // request must have both
    if (!username || !password) {
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
                    username: username
                },
                process.env.JWT_SECRET
            );

            // create token & return to user
            res.send({
                message: "You're logged in!",
                token
            });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect"
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = usersRouter;
