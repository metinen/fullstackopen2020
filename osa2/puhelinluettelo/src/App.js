import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonRecord from './components/PersonRecord'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false);

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
                    PersonService.update(existingPerson).then(
                        updated => {
                            const personsUpdated = persons.map(e => e.id !== existingPerson.id ? e : updated)
                            setPersons(personsUpdated);
                            setMessage(`Phone number of ${existingPerson.name} is updated in phonebook`);
                            setTimeout(() => setMessage(null), 5000)
                        }
                    ).catch(
                        error => {
                            setMessage(`Phone number of ${existingPerson.name} couldn't be updated`);
                            setIsError(true);
                            setPersons(persons.filter(e => e.id !== existingPerson.id));
                            setTimeout(() => {
                                setMessage(null);
                                setIsError(false);
                            }, 5000)
                        }
                    );
                }
            } else {
                window.alert(`Record already exists for ${newName}`)
            }
        } else {
            const person = { name: newName, number: newNumber }
            PersonService.create(person)
                .then(e => {
                    setPersons(persons.concat(e));
                    setMessage(`${person.name} is added to phonebook`);
                    setTimeout(() => setMessage(null), 5000)
                })
                .catch(error => {
                    setMessage(error.response.data.error);
                    setIsError(true);
                    setTimeout(() => {
                        setMessage(null);
                        setIsError(false);
                    }, 5000)
                });
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
            setMessage(`${person.name} is removed from phonebook`);
            setTimeout(() => setMessage(null), 5000)
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
            <Notification message={message} isError={isError} />
            <ul>{personsToShow.map(person =>
                <PersonRecord key={person.name} person={person} handleRemoving={handleRemoving} />
            )}
            </ul>
        </div>
    )
}
export default App