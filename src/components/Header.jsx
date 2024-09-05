import React from "react";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="app-header">
      <nav className="navbar">
        <h1>Geo Distance Calculator</h1>
        <ul className="nav-links">
          <li><a href="#map">Map</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
