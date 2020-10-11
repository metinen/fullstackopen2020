import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonRecord from './components/PersonRecord'
import PersonService from './services/PersonService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        PersonService.getAll().then(initialPersons => setPersons(initialPersons))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const existingPerson = persons.find(e => e.name === newName);
        if (existingPerson) {
            if (existingPerson.number !== newNumber) {
                if (window.confirm(`Are you sure you want to replace phone number of ${newName}?`)) {
                    existingPerson.number = newNumber;
                    PersonService.update(existingPerson);
                    const personsUpdated = persons.filter(e => e.id !== existingPerson.id)
                    setPersons(personsUpdated.concat(existingPerson));
                }
            } else {
                window.alert(`Record already exists for ${newName}`)
            }
        } else {
            const person = { name: newName, number: newNumber }
            const newPerson = PersonService.create(person);
            newPerson.then(e => setPersons(persons.concat(e)));
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

    const handleRemoving = (person) => {
        if (window.confirm(`Are you sure you want to remove ${person.name}`)) {
            PersonService.remove(person.id);
            setPersons(persons.filter(e => e.id !== person.id));
        }
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
                <PersonRecord key={person.name} person={person} handleRemoving={handleRemoving} />
            )}
            </ul>

        </div>

    )
}
export default App