import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3001/'

const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)    
}

const createMessage = (message) => {
    const request = axios.post(`${baseUrl}`, message)
    return request.then(response => response.data)
}

const addResponse = (id, newResponse) => {
    const request = axios.post(`${baseUrl}/${id}`, newResponse)
    return request.then(response => response.data)
}


export default {getAll, createMessage, addResponse}