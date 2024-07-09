import React from 'react';
import '../App.css';

/**
 * MenuBar component displays the application title in the header.
 *
 * @returns {JSX.Element} A div containing the application title.
 */
const MenuBar = () => (
    <header className="menu-bar">
        <h1 className="text-6xl font-bold">Pair Trading App</h1>
    </header>
);

export default MenuBar;
