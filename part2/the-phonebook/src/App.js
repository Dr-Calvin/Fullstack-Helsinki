import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/phonebook").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setDisplay(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [display, setDisplay] = useState([]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    };
    let existsCheck = persons.filter((n) => n.name === personObject.name);
    if (existsCheck.length === 0) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
      setNewNameFilter("");
      setDisplay(persons.concat(personObject));
    } else alert(`${personObject.name} is already in the phonebook`);
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
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={display} />
    </div>
  );
};

export default App;
