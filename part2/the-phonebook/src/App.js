import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import phoneService from "./services/phoneService";
import Filter from "./Filter";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");
  const [display, setDisplay] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDelete, setErrorDelete] = useState("");

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
      setDisplay(response);
    });
  }, []);

  const Notification = ({ message }) => {
    if (message === null) return null;
    return <div className="error">{message}</div>;
  };

  const resetFields = (personsC) => {
    setNewName("");
    setNewNumber("");
    setNewNameFilter("");
    setDisplay([...personsC]);
  };

  const deleteEntry = (name, id) => {
    if (window.confirm(`Do you really want to Delete ${name}?`))
      phoneService
        .deleteField(id)
        .catch((error) => {
          setErrorDelete(
            `the person you're trying to delete has already been deleted from the server`
          );
          setTimeout(() => {
            setErrorDelete(null);
          }, 5000);
        })
        .then(() => {
          let currentIDList = persons.map((person) => person.id);
          const deleteeIndex = currentIDList.indexOf(id);
          const personsCopy = persons;
          personsCopy.splice(deleteeIndex, 1);
          setPersons(personsCopy);
          resetFields(personsCopy);
        });
  };

  const ErrDelete = ({ message }) => {
    return <div className="errDel">{message}</div>;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let currentNameList = persons.map((person) => person.name);
    if (!currentNameList.includes(personObject.name)) {
      phoneService.create(personObject).then((response) => {
        setErrorMessage(`${response.name} was added to phonebook`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(response));
        resetFields(persons.concat(response));
      });
    } else {
      alert(
        `${personObject.name} is already in the phonebook, updating phone number...`
      );
      const updateeIndex = currentNameList.indexOf(personObject.name);
      const updatee = persons[updateeIndex];
      phoneService.update(updatee.id, personObject).then((returnedEntry) => {
        const personsCopy = persons;
        personsCopy[updateeIndex] = returnedEntry;
        setPersons(personsCopy);
        resetFields(personsCopy);
      });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value);
    let disp = persons.filter((p) =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDisplay(disp);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <Filter
        newNameFilter={newNameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <h2>Add a new</h2>
      <Notification message={errorMessage} />
      <ErrDelete message={errorDelete} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={display} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
