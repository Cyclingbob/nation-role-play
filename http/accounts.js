const express = require("express")
const app = express.Router()

const user_control = require("./")

app.get("/signup", (req, res) => {
    const { username, password } = req.body
    console.log(req.tables)

    if(!username) return res.status(400).json({ success: false, message: "Username not given" });
    if(!password) return res.status(400).json({ success: false, message: "Password not given" });



    res.json({})
})

app.get("/login", (req, res) => {

})

module.exports = app