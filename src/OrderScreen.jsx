import React, { useState, useEffect } from 'react';
import './Menu.css';
import './OrderScreen.css';

// --- Icon Map for Visual Realism ---
const ITEM_ICONS = {
    'Burgers': '🍔',
    'Drinks': '🥤',
    'Sides': '🍟',
    'Desserts': '🍰',
    'Classic Cheeseburger': '🧀',
    'Bacon Deluxe': '🥓',
    'Veggie Burger': '🥬',
    'Coca-Cola': '🥤',
    'Iced Tea': '🧊',
    'Lemonade': '🍋',
    'French Fries': '🍟',
    'Onion Rings': '🧅',
    'Chocolate Cake': '🍫', 
};

/**
 * Main Point of Sale (POS) Order-Taking Screen
 * @param {Array} menuData - The live menu state from App.js
 */
function OrderScreen({ menuData }) {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Set the first category as default when menuData changes
    useEffect(() => {
        if (menuData.length > 0 && selectedCategory === null) {
            setSelectedCategory(menuData[0].id);
        }
    }, [menuData, selectedCategory]);

    // Get the sub-items for the currently selected category
    const currentCategory = menuData.find(c => c.id === selectedCategory);
    const currentSubItems = currentCategory?.subItems || [];

    // --- Cart Management Functions (using more concise logic) ---
    const updateCartQuantity = (itemToUpdate, delta) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToUpdate.id);
            const newQuantity = (existingItem ? existingItem.quantity : 0) + delta;

            if (newQuantity <= 0) {
                // Remove item if quantity is zero or less
                return prevCart.filter(item => item.id !== itemToUpdate.id);
            }

            if (existingItem) {
                // Update quantity
                return prevCart.map(item =>
                    item.id === itemToUpdate.id ? { ...item, quantity: newQuantity } : item
                );
            } else {
                // Add new item
                return [...prevCart, { ...itemToUpdate, quantity: newQuantity }];
            }
        });
    };

    const handleAddItemToCart = (item) => updateCartQuantity(item, 1);
    const handleDecreaseQuantity = (item) => updateCartQuantity(item, -1);

    // --- Calculation ---
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="order-screen-layout">
            
            {/* --- Left Column: Menu Item Grid --- */}
            <div className="menu-grid-container">
                <h1>POS Order Entry</h1>

                {/* 1. TOP ROW: Category Buttons (Menu Groups) */}
            <div className="category-tabs">
                {menuData.map(category => (
            <button
                key={category.id}
                className={`btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
            >
                {category.icon || '📦'} {category.name} {/* <--- Use category.icon */}
            </button>
            ))}
        </div>

                {/* 2. BOTTOM AREA: Sub-Menu Items (The Items) */}
            <div className="menu-grid">
    {currentSubItems.length === 0 && <p style={{color: '#6c757d'}}>This category has no items yet.</p>}
    {currentSubItems.map(item => (
        <button
            key={item.id}
            className="menu-item-button"
            onClick={() => handleAddItemToCart(item)}
        >
            <div className="item-icon-placeholder">
                {item.icon || '🍽️'} {/* <--- Use item.icon */}
            </div>
            <div style={{ lineHeight: 1.1 }}>
                <span className="menu-item-name">{item.name}</span>
                <br/>
                <span className="menu-item-price">${item.price.toFixed(2)}</span>
            </div>
        </button>
    ))}
</div>
            </div>

            {/* --- Right Column: Order Summary (Cart) --- */}
            <div className="card order-summary">
                <h2>Current Order</h2>
                <div className="order-summary-content">
                    {cart.length === 0 && (
                        <p style={{color: '#95a5a6'}}>Click items to start a new order.</p>
                    )}

                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-details">
                                <span className="cart-item-name">{item.name}</span>
                                <span className="cart-item-price"> @ ${item.price.toFixed(2)}</span>
                            </div>
                            <div className="quantity-controls">
                                <button
                                    className="btn-quantity"
                                    onClick={() => handleDecreaseQuantity(item)}
                                >
                                    &ndash;
                                </button>
                                <span className="quantity-count">{item.quantity}</span>
                                <button
                                    className="btn-quantity"
                                    onClick={() => handleAddItemToCart(item)}
                                >
                                    +
                                </button>
                            </div>
                            <span className="cart-item-total-price">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="cart-total">
                    <span>TOTAL:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <button
                    className="btn btn-primary btn-checkout"
                    style={{ width: '100%', marginTop: '16px', padding: '15px' }}
                    onClick={() => {
                        if (cart.length > 0) {
                            alert(`Order Paid: $${calculateSubtotal().toFixed(2)}!`);
                            setCart([]); // Reset cart after payment
                        } else {
                            alert("Cart is empty!");
                        }
                    }}
                >
                    Process Payment
                </button>
            </div>
        </div>
    );
}

export default OrderScreen;