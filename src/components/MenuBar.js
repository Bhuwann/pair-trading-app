import React from 'react';
import '../App.css';

/**
 * MenuBar component displays the application title in the header.
 * In-app links will be added to the menu bar in the future.
 * @returns {JSX.Element} A div containing the application title.
 */
const MenuBar = () => (
    <header className="menu-bar">
        <h1 className="text-6xl font-bold">Pair Trading App</h1>
    </header>
);

export default MenuBar;
