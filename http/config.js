const path = require("path")

const config = {
    port: 80,
    cookieKey: Buffer.from("41de2274fa547584de58ce2b532c6d01fab1e643525420dba6079dc9b052dc31", "hex"),
    cookieAlgorithm: "aes256",
    public_dir: path.resolve(__dirname, "public")
}

module.exports = config