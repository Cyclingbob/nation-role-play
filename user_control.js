const crypto = require("crypto")

function hashPassword(password, salt){

    if(!salt) salt = crypto.randomBytes(16).toString("hex")

    const iterations = 10000;
    const hashBytes = 64;
    const digest = 'sha512';

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, hashBytes, digest, (err, derivedKey) => {
            if(err) return reject(err)
            resolve({ hashed: derivedKey.toString("hex"), salt })
        })
    })    
}


function create(table, username, password, ip){
    let id = table.getLength() + 1

    if(username.length < 5) throw new Error("Username is too short")
    if(username.length > 40) throw new Error("Username is too long")

    let { hashed, salt } = hashPassword(password)
    console.log()

    let template = {
        id,
        username,
        password: hashed,
        password_salt: salt,
        created: new Date(),
        roles: [],
        pfp: "",
        last_logged_in: new Date(),
        ip,
        banned: false,
        discord_id: "",
        sessions: []
    }

    table.add(template)
    return template
}

async function login(table, username, password){
    let user = table.findOne("username", username)
    if(!user) throw new Error("Username not found");

    let { password_salt } = user
    let { hashed } = await hashPassword(password, password_salt)

    if(hashed !== user.password) throw new Error("Password incorrect")
}