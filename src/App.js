import React, { useState } from 'react';
import Menu from './Menu';
import OrderScreen from './OrderScreen';
import './App.css'; 

// --- Initial Menu Data (Central Source of Truth) ---
let lastItemId = 2;
let lastSubId = 203;

// src/App.js

// ... (rest of imports and helper variables)

const initialMenuData = [
  {
    id: 1,
    name: 'Burgers',
    icon: '🍔', // <--- New Icon Field
    subItems: [
      { id: 101, name: 'Classic Cheeseburger', price: 9.99, icon: '🧀' }, // <--- New Icon Field
      { id: 102, name: 'Bacon Deluxe', price: 11.50, icon: '🥓' },
    ],
  },
  {
    id: 2,
    name: 'Drinks',
    icon: '🥤', // <--- New Icon Field
    subItems: [
      { id: 201, name: 'Coca-Cola', price: 2.50, icon: '🥤' },
      { id: 202, name: 'Iced Tea', price: 2.25, icon: '🧊' },
    ],
  },
];

// ... (rest of App.js remains the same)

function App() {
  const [view, setView] = useState('pos'); // 'pos' or 'admin'
  const [menuItems, setMenuItems] = useState(initialMenuData);

  // Function to be passed to the Admin Menu (Menu.jsx) to update the state
  const updateMenuState = (newMenu) => {
    setMenuItems(newMenu);
  };
    
  return (
    <div className="App">
      {/* --- Simple Navigation Toggle --- */}
      <nav className="app-nav">
        <button
          className={view === 'pos' ? 'active' : ''}
          onClick={() => setView('pos')}
        >
          POS Order Screen
        </button>
        <button
          className={view === 'admin' ? 'active' : ''}
          onClick={() => setView('admin')}
        >
          Admin Menu Management
        </button>
      </nav>

      {/* --- Conditionally Render the View and Pass Data --- */}
      {view === 'pos' ? (
        <OrderScreen menuData={menuItems} />
      ) : (
        <Menu 
          menuItems={menuItems} 
          setMenuItems={updateMenuState} 
          getNewItemId={() => ++lastItemId}
          getNewSubId={() => ++lastSubId}
        />
      )}
    </div>
  );
}

export default App;