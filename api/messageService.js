import sql from './database.js'

const getAll = async() => {
    let messages = await sql`SELECT * FROM messages`
    let messagesWithResponse = await Promise.all(messages.map(async function(m){
        console.log("BEFORE:" + JSON.stringify(m))
        m.responses = await getResponsesForMessage(m.id)
        console.log("AFTER" + JSON.stringify(m))
        return m
    }))
    console.log(messagesWithResponse)
    return messagesWithResponse
}

const getResponsesForMessage = async(message_id) => {
    let responses = await sql`SELECT * FROM response WHERE message_id = ${message_id}`
    return responses
}

const createMessage = async(content) => {
    let response = await sql`INSERT INTO messages (content) VALUES (${content})`
    console.log(response)
    return response
}

const createResponse = async(content, message_id) => {
    let res = await sql`INSERT INTO response (content, message_id) VALUES (${content}, ${message_id})`
    return res
}

export {getAll, createMessage, createResponse}