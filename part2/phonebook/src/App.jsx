import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Person_list from '../components/Person_list'
import contactDetails from './services/contacts'
import Notification from '../components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {    
        contactDetails
            .getAll()
            .then(response => {
                console.log('Data from server:', response.data)
                setPersons(response.data)
            })
            .catch(error => {
                console.log("Error fetching data:", error)
                showMessage("Error loading contacts from server")
            })
    }, [])

    const showMessage = (text) => {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (!newName.trim() || !newNumber.trim()) {
            showMessage('Please fill in both name and number')
            return
        }

        // Find existing person with same name (case insensitive)
        const existingPerson = persons.find(person => 
            person.name.toLowerCase() === newName.toLowerCase()
        )
        
        if (existingPerson) {
            // Person exists, ask for confirmation to update
            const confirmed = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )
            if (confirmed) {
                const updatedPerson = {
                    ...existingPerson,
                    number: newNumber
                }

                contactDetails
                    .update(existingPerson.id, updatedPerson)
                    .then(response => {
                        console.log('Person updated:', response.data)
                        setPersons(persons.map(person => 
                            person.id === existingPerson.id ? response.data : person
                        ))
                        
                        setNewName('')
                        setNewNumber('')
                        showMessage(`Updated ${newName}'s number`)
                    })
                    .catch(error => {
                        console.log("Error updating person:", error)
                        
                        // Handle different error types
                        let errorMessage = `Error updating ${newName}`
                        if (error.response && error.response.data) {
                            if (typeof error.response.data === 'string') {
                                errorMessage = error.response.data
                            } else if (error.response.data.error) {
                                errorMessage = error.response.data.error
                            }
                        }
                        
                        showMessage(errorMessage)
                        
                        // Remove the person from local state if they no longer exist on server
                        if (error.response && error.response.status === 404) {
                            setPersons(persons.filter(person => person.id !== existingPerson.id))
                        }
                    })
            }
        } else {
            // Check if number already exists for a different person
            const personWithNumber = persons.find(person => person.number === newNumber)
            if (personWithNumber) {
                showMessage(`${newNumber} is already assigned to ${personWithNumber.name}`)
                return
            }

            // New person
            const nameObject = {
                name: newName,
                number: newNumber,
            }

            contactDetails
                .postAll(nameObject)
                .then(response => {
                    console.log('Response from POST:', response.data)
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    showMessage(`Added ${newName}`)
                })
                .catch(error => {
                    console.log("Error adding person:", error)
                    
                    // Show backend validation errors (like name too short)
                    const errorMessage = error.response?.data?.error || "Error adding person"
                    showMessage(errorMessage)
                })
        }
    }

    const deleteName = (id, name) => {
        console.log('Delete called with ID:', id, 'Name:', name)
        
        const confirmDelete = window.confirm(`Delete ${name}?`)
        if (!confirmDelete) {
            return;
        }

        contactDetails
            .deleteItem(id)
            .then(() => {
                setPersons(persons.filter((person) => person.id !== id))
                showMessage(`Deleted ${name}`)
            })
            .catch((error) => {
                console.log("Error deleting person:", error)
                showMessage(`Information of ${name} has already been removed from the server`)
                
                // Remove from local state anyway if it was a 404 error
                if (error.response && error.response.status === 404) {
                    setPersons(persons.filter((person) => person.id !== id))
                }
            })
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }
    
    const handleNewFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
            <h3>Add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h3>Numbers</h3>
            <Person_list personsToShow={personsToShow} deleteName={deleteName}/>
        </div>
    )
}

export default App