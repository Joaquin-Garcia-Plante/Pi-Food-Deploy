import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";
function NavBar({ handleClick, handleSearch, searchRecipe }) {
  return (
    <div className="wrap">
      <div className="search">
        <input type="text" className="searchTerm" placeholder="Search recipe..." onChange={handleSearch} />
        <button type="submit" className="searchButton" onClick={searchRecipe}>
          Ok
        </button>
      </div>
      <div className="x" onClick={(e) => handleClick(e)}>
        <button className="buttonx">Reload Recipes</button>
      </div>
      <Link to={"/recipe"} style={{ textDecoration: "none" }}>
        <div className="y">
          <button className="buttony">Create Recipe</button>
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
