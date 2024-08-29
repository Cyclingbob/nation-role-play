const express = require("express")
const app = express()

const userAgent = require('express-useragent');
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json())

const cookieEncryption = require("./cookieEncryption")
app.use(cookieEncryption)

app.use("/public", express.static(config.public_dir))
app.set("view-engine", "ejs")

const config = require("./config")


app.listen(config.port)