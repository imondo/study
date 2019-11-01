import React, { useState } from 'react';

const Search = props => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue('');
  }

  const callSearchFunc = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchChange}
        type="text"
      ></input>
      <input onClick={callSearchFunc} type="submit" value="SEARCH"></input>
    </form>
  );
}

export default Search;