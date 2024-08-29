const express = require("express")
const app = express.Router()

const config = require("./config")

function encryptCookie(text){
    const iv = randomBytes(16)
    const cipher = createCipheriv(config.cookieAlgorithm, config.cookieKey, iv)
    var encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return `${encrypted.toString("hex")}:${iv.toString("hex")}`
    // return { iv: iv.toString("hex"), text: encrypted.toString("hex") }
}

function decryptCookie(encrypted, iv){
    try {
        encrypted = Buffer.from(encrypted, "hex")
        iv = Buffer.from(iv, "hex")
        const decipher = createDecipheriv(config.cookieAlgorithm, config.cookieKey, iv)
        var decrypted = decipher.update(encrypted)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    }
    catch(e) {
        return null
    }
}

app.use((req, res, next) => { //parse encrypted cookies
    var obj = {}
    for(property in req.cookies){
        var item = req.cookies[property]
        var [ encrypted, iv ] = item.split(":")
        obj[property] = decryptCookie(encrypted, iv)
    }
    req.cookies = obj
    next()
})

module.exports = app