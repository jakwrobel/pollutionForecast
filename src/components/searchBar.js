//Renders section with search bar
import React, { useRef } from "react";

const SearchBar = ({ setCoordinates }) => {
  const cityRef = useRef(null);

  return (
    <div className="searchBar__wrap">
      <h2>Enter city name :</h2>
      <form className="searchBar__form" onSubmit={(event) => setCoordinates(event, cityRef.current.value)}>
        <input type="text" ref={cityRef} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
