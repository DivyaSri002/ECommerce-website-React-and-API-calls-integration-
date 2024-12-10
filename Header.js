import React, { useState } from "react";
import '../styles/stylehome.css';
import 'font-awesome/css/font-awesome.min.css';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav>
        
        <h1>Shopiee</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Cart</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
