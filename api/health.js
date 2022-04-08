const express = require("express");
const healthRouter = express.Router();

healthRouter.use((req, res) => {

    res.send({
        message: "Server is healthy!"
    })
})

module.exports = healthRouter