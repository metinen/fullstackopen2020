import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonRecord from './components/PersonRecord'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (persons.find(e => e.name === newName)) {
            window.alert(`${newName} already exists!`);
        } else {
            const person = { name: newName, number: newNumber }
            setPersons(persons.concat(person));
        }
        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        event.preventDefault();
        setFilterBy(event.target.value);
    }

    const personsToShow = filterBy ? persons.filter(e => e.name.toUpperCase().includes(filterBy.toUpperCase())) : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} filterBy={filterBy} />

            <h2>Add new person</h2>
            <PersonsForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                newNumber={newNumber} newName={newName} handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <ul>{personsToShow.map(person =>
                <PersonRecord key={person.name} person={person} />
            )}
            </ul>

        </div>

    )
}
export default App