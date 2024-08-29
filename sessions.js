const uuid = require("uuid")

function createSession(session_table, user_table, user_id, password, agent, ipinfo_ip, ipinfo_isPublic, ipinfo_city, ipinfo_region, ipinfo_country){
    const session_id = uuid.v4()
    const session_string = user_id + ":" + session_id + ":" + password //hashed form
    
    const session_config = {
        id: session_id,
        user_id,
        agent,
        ipinfo_ip,
        ipinfo_isPublic,
        ipinfo_city,
        ipinfo_region,
        ipinfo_country
    }

    session_table.add(session_config)

    return session_string
}