function Filter({ menu, name, setCurrentPage, setValue }) {
  function handleChange(e) {
    setValue(e.target.value);
    setCurrentPage(0);  
  }

  return (
    <select onChange={handleChange}>
      {menu.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
