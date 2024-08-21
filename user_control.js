const crypto = require("crypto")

function hashPassword(password, callback){

    const salt = crypto.randomBytes(16).toString("hex")

    const iterations = 10000;
    const hashBytes = 64;
    const digest = 'sha512';

    crypto.pbkdf2(password, salt, iterations, hashBytes, digest, (err, derivedKey) => {
        callback({ hashed: derivedKey.toString("hex"), salt })
    })
}


function create(table, username, password, ip){
    if(username.length < 5) throw new Error("Username is too short")
    if(username.length > 40) throw new Error("Username is too long")

    let id = table.getLength() + 1 

    let template = {
        id, username
    }
}