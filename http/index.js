const express = require("express")
const app = express()

const userAgent = require('express-useragent');
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json())

const cookieEncryption = require("./cookieEncryption")
app.use(cookieEncryption)

const config = require("./config")
app.use("/public", express.static(config.public_dir))
app.set("view-engine", "ejs")

app.use((req, res, next) => {
    const x_ip = req.headers["x-forwarded-for"]
    const cf_ip = req.headers["cf-connecting-ip"]
    const express_ip = req.ip.substring(7)

    req.x_ip = x_ip
    req.cf_ip = cf_ip
    req.express_ip = express_ip

    req.ips = [ x_ip, cf_ip, express_ip ]
    next()
})

const Database = require("../db/database_system")
const db = new Database("./db/database_tables", "./db/tables_config")

app.use((req, res, next) => {
    req.db = db
    next()
})

const accountRouter = require("./accounts")
app.use(accountRouter)


app.listen(config.port)