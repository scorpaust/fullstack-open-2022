import { useState, useEffect } from 'react'
import {getAll, create, update } from './services/notes'
import Note from './Note'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 

  useEffect(() => {
      getAll()      
      .then(initialNotes => {        
        setNotes(initialNotes)      
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    create(noteObject)      
      .then(returnedNote => {        
        setNotes(notes.concat(returnedNote))      
        setNewNote('')      
      })  
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

      update(changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)        
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)        
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const handleLogin = (event) => {    
      event.preventDefault()    
      console.log('logging in with', username, password)  
    }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>        
        <div>          
          username            
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}          />        </div>        <div>          password            <input            type="password"            value={password}            name="Password"            onChange={({ target }) => setPassword(target.value)}/>        
        </div>        
        <button type="submit">login</button>      
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App