import { useState, useEffect } from 'react';
import {getAll, create, remove, update } from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [appError, setAppError] = useState(false)

  useEffect(() => {
    getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const handleNameChange = (event) => {    
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const removePerson = (id, name) => {
      const confirmed = window.confirm(`Delete ${name}?`)
      if (confirmed) {
        remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        }).catch(error => {
          setAppError(true)
          setNotificationMessage(`Information of ${name} has already been removed from server`)
        })
        setTimeout(() => {
          setNotificationMessage('')
          setAppError(false)
          setPersons(persons.filter((person) => person.id !== id))
        }, 5000)
      }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === personObject.name && person.number === personObject.number)) {
      alert(`${personObject.name} is already added to phonebook`)
      setNewName('')
      return;
    }
    else if (persons.some(person => person.name === personObject.name && person.number !== personObject.number)) {
      const confirmUpdate = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)

      if (confirmUpdate) {

        const personSelected = persons.filter(person => person.name === personObject.name);

        const personToUpdate = {...personSelected[0], number: personObject.number};

        update(personToUpdate.id, personToUpdate)
          .then(returnedPerson => {        
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setAppError(false)      
            setNotificationMessage(`Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`)  
            setNewName('')
            setNewNumber('')
            setTimeout(() => {    
            setNotificationMessage('')
            }, 5000)        
          }).catch(error => {
            setAppError(true)
            setNotificationMessage(`${error.response.data.error}`)
          })
          setTimeout(() => {
            setNotificationMessage('')
            setAppError(false)
        }, 5000)
      }}
    else 
    {
      create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAppError(false)      
          setNotificationMessage(`Added ${returnedPerson.name}`)  
          setNewName('')
          setNewNumber('')
          setTimeout(() => {    
            setNotificationMessage('')
          }, 5000)        
        }).catch(error => {
          setAppError(true)
          setNotificationMessage(`${error.response.data.error}`)
        })
        setTimeout(() => {
          setNotificationMessage('')
          setAppError(false)
          setPersons(persons)
      }, 5000)
    }
  }

  const contactsToShow = newFilter === '' ? persons : persons.filter(person => person.name.includes(newFilter) || person.number.includes(newFilter));
 
  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage !== '' &&
        <Notification message={notificationMessage} error={appError} />
      }
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} deleteFunc={removePerson} />
    </div>
  )
}

export default App;