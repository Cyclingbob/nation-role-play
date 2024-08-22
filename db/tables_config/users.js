const config = {
    id: Number,
    username: String,
    password: String,
    password_salt: String,
    created: Date,
    roles: Array,
    pfp: String,
    last_logged_in: Date,
    ip: String,
    banned: Boolean,
    discord_id: String
}

module.exports = config