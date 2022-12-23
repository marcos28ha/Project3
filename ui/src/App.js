import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import messageService from './modules/messageService'

const App = () => {

  
  const [messages, setMessages] = useState([])
  const [activeMessage, setActiveMessage] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [newResponse, setNewResponse] = useState('')


  const selectMessage = (message) => {
    setActiveMessage(message)
  }

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleResponseChange = (event) => {
    setNewResponse(event.target.value)
  }

  const postMessage = (event) => {
    event.preventDefault()
    let createMessage = {
      id: Math.floor(Math.random()*10000),
      text: newMessage,
      date:  Math.floor(Math.random()*10000),
      responses: []   
    }
    messageService
      .createMessage(createMessage)
      .then(response => {
        setNewMessage("")
        setMessages(messages.concat(createMessage))
      })
  }

  const postResponse = (event) => {
    event.preventDefault()
    let id = activeMessage.id
    let response = {
      id: Math.floor(Math.random()*10000),
      text: newResponse,
      date:  Math.floor(Math.random()*10000)   
    }
    let message = messages.find(m => m.id === id)
    message.responses = message.responses.concat(response)
    messageService
      .addResponse(message.id, response)
      .then(result => {
        setMessages(messages.map(m => m.id === message.id ? message : m))
        setNewResponse("")
      }
      )
    
  }

  useEffect(() => {
    messageService
      .getAll()
      .then(initialMessages => { setMessages(initialMessages)
      })
    }, [])

  return (
    <div>
      <h1>Message application</h1>
      <MessageList messages={messages} selectMessage={selectMessage} newMessage={newMessage} handleMessageChange={handleMessageChange} postMessage={postMessage}/>
      <MessageResponses activeMessage={activeMessage} newResponse={newResponse} handleResponseChange={handleResponseChange} postResponse={postResponse}/>
      </div>
  );
}

const MessageList = ({messages, selectMessage, handleMessageChange, newMessage, postMessage}) => {

  return( 
    <div>
      <ul>
        {messages.map(message => 
          <Message key={message.id} message={message} selectMessage={selectMessage}/>
        )}
      </ul>

      <form onSubmit={postMessage}>
        <input
          value={newMessage}
          onChange={handleMessageChange}
        />
        <button type="submit">Post Message!</button>
      </form>
    </div>
  )
}

const Message = ({message, selectMessage}) => {

  return(
    <div>
      <li onClick={() => selectMessage(message)}>{message.text}</li>
    </div>
  )
  
}

const MessageResponses = ({activeMessage, postResponse, newResponse, handleResponseChange}) => {
  if(activeMessage){
    return(
      <div>
        <h3>{activeMessage.text}</h3>
        {activeMessage.responses ?
          <ul>
          {activeMessage.responses.map(response => 
            <Message key={response.id} message={response} selectMessage={() => {}}/>
          )}
          </ul>
         :null}     
           

        <form onSubmit={postResponse}>
        <input
          value={newResponse}
          onChange={handleResponseChange}
        />
        <button type="submit">Post Response</button>
      </form>
      </div>
    )
  }
}

export default App;



