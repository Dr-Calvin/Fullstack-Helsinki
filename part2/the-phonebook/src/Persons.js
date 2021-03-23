const Persons = ({ persons, deleteEntry }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} <button onClick={() => deleteEntry(person.name,person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons
