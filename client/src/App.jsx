import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'


const socket = io.connect("http://localhost:3000/")

function App() {
  const [message, setMessage] = useState('')
  const [incoming, setIncoming] = useState('')

  const [chatRooms, setChatRooms] = useState(['Anime', 'Software Dev', 'Education', 'Gaming'])
  const [room, setRoom] = useState('')

  const joinRoom = (room) => {
    if(room != ''){
      socket.emit('join_room', room)
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send_message', {message: message, room:room})
    setMessage('')
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setIncoming(data.message)
    })
  }, [socket])

  useEffect(() => {
    joinRoom(room)
  }, [room])

  return (
    <>
      <div className='App'>
        <form onSubmit={sendMessage}>
          <select onChange={(e) => setRoom(e.target.value)}>
             <option>Select Chat Room</option>
             {chatRooms.map((room, idx) => <option key={idx} value={room}>{room}</option>)}
          </select>
          <input type='text' placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)}/> 
          <button type="submit" onClick={sendMessage}>Send Message</button>
        </form>
       

        <br/>
        <p>{incoming}</p>
      </div>
    </>
  )
}

export default App
