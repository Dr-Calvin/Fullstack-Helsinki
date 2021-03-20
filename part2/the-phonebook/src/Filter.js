const Filter = ({ newNameFilter, handleNameFilterChange }) => {
  return (
    <div>
      <input value={newNameFilter} onChange={handleNameFilterChange}></input>
    </div>
  );
};

export default Filter
