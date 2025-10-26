import React, { useState } from 'react';
import './Menu.css'; 

// --------------------------------------------------------------------------------------
// NEW Component: Add Category Card (for main content column)
// --------------------------------------------------------------------------------------

function AddCategoryCard({ handleAddMenuItem, newItemName, setNewItemName, newItemIcon, setNewItemIcon }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddMenuItem(e);
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '30px', borderLeft: '3px solid var(--color-primary)' }}>
            <h2 style={{ marginTop: 0, color: 'var(--color-primary)', borderBottom: 'none', paddingBottom: 0 }}>📦 Create New Menu Category</h2>
            <p style={{ color: 'var(--color-text-light)' }}>Categories organize your menu (e.g., Appetizers, Entrees, Drinks).</p>
            <div className="input-group" style={{ flexDirection: 'row', alignItems: 'flex-end', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="text" placeholder="Category Name (e.g., 'Entrees')" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} 
                    className="input-field" style={{ flex: 3, minWidth: '150px' }}
                />
                <input 
                    type="text" placeholder="Icon (e.g., 🍽️)" value={newItemIcon} onChange={(e) => setNewItemIcon(e.target.value)} 
                    className="input-field" style={{ flex: 1, minWidth: '80px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 30px' }}>
                    + Add Category
                </button>
            </div>
        </form>
    );
}


// --------------------------------------------------------------------------------------
// Helper components for Sub-Item Editing and Adding
// --------------------------------------------------------------------------------------

function EditSubItemForm({ subItem, menuItemId, onUpdateSubItem, onCancelEdit }) {
    const [name, setName] = useState(subItem.name);
    const [price, setPrice] = useState(subItem.price);
    const [icon, setIcon] = useState(subItem.icon || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert('Name and price are required.');
            return;
        }
        onUpdateSubItem(menuItemId, {
            ...subItem,
            name: name,
            price: parseFloat(price),
            icon: icon.trim() || '🍽️',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-group edit-form" style={{ border: '1px solid #007bff40', padding: '15px' }}>
            <h4>Edit Item: {subItem.name}</h4>
            <div className="input-group" style={{ marginBottom: '10px' }}>
                <input 
                    type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} 
                    className="input-field" style={{ flex: '2', minWidth: 0 }} 
                />
                <input 
                    type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} 
                    className="input-field" style={{ flex: '1', minWidth: 0 }} 
                />
                <input 
                    type="text" placeholder="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} 
                    className="input-field" style={{ flex: '0.5', minWidth: 0 }} 
                />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={onCancelEdit} className="btn btn-danger-small">Cancel</button>
            </div>
        </form>
    );
}

function AddSubItemForm({ menuItemId, onAddSubItem, getNewSubId }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [icon, setIcon] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert('Please enter a name and price.');
            return;
        }
        onAddSubItem(menuItemId, {
            id: getNewSubId(),
            name: name,
            price: parseFloat(price),
            icon: icon.trim() || '🍽️',
        });
        setName('');
        setPrice('');
        setIcon('');
    };

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <h3 style={{ marginBottom: '15px', color: '#007bff', border: 'none' }}>Add New Item</h3>
            <div className="input-group">
                <input
                    type="text" placeholder="Sub-Item Name" value={name} onChange={(e) => setName(e.target.value)} 
                    className="input-field" style={{ minWidth: 0 }} 
                />
                <input
                    type="text" placeholder="Icon (e.g., 🍟)" value={icon} onChange={(e) => setIcon(e.target.value)}
                    className="input-field" style={{ flex: '0 1 120px', minWidth: 0 }}
                />
                <input
                    type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}
                    className="input-field" style={{ flex: '0.5', minWidth: 0 }}
                />
                <button type="submit" className="btn btn-primary">Add Item</button>
            </div>
        </form>
    );
}

function CategoryEditForm({ category, onUpdateCategory, onCancelEdit }) {
    const [name, setName] = useState(category.name);
    const [icon, setIcon] = useState(category.icon || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required.');
            return;
        }
        onUpdateCategory({
            ...category,
            name: name,
            icon: icon.trim() || '📦',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ backgroundColor: '#fffbe6', border: '1px dashed #ffc107', padding: '15px', marginBottom: '15px' }}>
            <h4 style={{ color: '#ffc107', marginTop: 0 }}>Editing Category Details</h4>
            <div className="input-group" style={{ marginBottom: '10px' }}>
                <input
                    type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} 
                    className="input-field" style={{ minWidth: 0 }} 
                />
                <input
                    type="text" placeholder="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} 
                    className="input-field" style={{ flex: '0.5', minWidth: 0 }} 
                />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" onClick={onCancelEdit} className="btn btn-secondary-small">Cancel</button>
            </div>
        </form>
    );
}


// --------------------------------------------------------------------------------------
// Main Admin Menu Management Page
// --------------------------------------------------------------------------------------

function Menu({ menuItems, setMenuItems, getNewItemId, getNewSubId }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(menuItems[0]?.id || null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingSubItemId, setEditingSubItemId] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemIcon, setNewItemIcon] = useState('');
    
    // --- Data Management Functions ---

    const handleAddMenuItem = (e) => {
        e.preventDefault();
        if (!newItemName) {
            alert('Please enter a menu item name.');
            return;
        }
        const newItem = {
            id: getNewItemId(),
            name: newItemName,
            icon: newItemIcon.trim() || '📦',
            subItems: [],
        };
        const newMenuItems = [...menuItems, newItem];
        setMenuItems(newMenuItems);
        setNewItemName('');
        setNewItemIcon('');
        setSelectedCategoryId(newItem.id); 
    };

    const handleDeleteMenuItem = (itemIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this entire menu category?')) {
            const newMenuItems = menuItems.filter(item => item.id !== itemIdToDelete);
            setMenuItems(newMenuItems);
            setSelectedCategoryId(newMenuItems[0]?.id || null);
        }
    };
    
    const handleUpdateMenuItem = (updatedCategory) => {
        setMenuItems(menuItems.map(category => 
            category.id === updatedCategory.id ? updatedCategory : category
        ));
        setEditingCategoryId(null); 
    };

    const handleUpdateSubItem = (menuItemId, updatedSubItem) => {
        setMenuItems(menuItems.map(category =>
            category.id === menuItemId
                ? {
                    ...category,
                    subItems: category.subItems.map(sub => 
                        sub.id === updatedSubItem.id ? updatedSubItem : sub
                    )
                }
                : category
        ));
        setEditingSubItemId(null); 
    };

    const handleAddSubItem = (menuItemId, newSubItem) => {
        setMenuItems(menuItems.map(item => 
            item.id === menuItemId
                ? { ...item, subItems: [...item.subItems, newSubItem] }
                : item
        ));
    };

    const handleDeleteSubItem = (menuItemId, subItemIdToDelete) => {
        setMenuItems(menuItems.map(item =>
            item.id === menuItemId
                ? { ...item, subItems: item.subItems.filter(sub => sub.id !== subItemIdToDelete) }
                : item
        ));
    };
    
    const selectedCategory = menuItems.find(c => c.id === selectedCategoryId);

    // --- Component Return (The Two-Column Layout) ---
    return (
        <div className="menu-page">
            
            {/* --- LEFT PANE: Category Navigation --- */}
            <div className="menu-nav">
                <h2>Menu Categories</h2>
                
                {/* Category List */}
                <ul className="nav-list">
                    {menuItems.map(category => (
                        <li key={category.id} className="nav-item">
                            <button
                                className={category.id === selectedCategoryId ? 'active' : ''}
                                onClick={() => setSelectedCategoryId(category.id)}
                            >
                                {category.icon} {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* --- RIGHT PANE: Main Content/Details --- */}
            <div className="menu-content">
                
                {/* ALWAYS DISPLAY: Add Category Form */}
                <AddCategoryCard 
                    handleAddMenuItem={handleAddMenuItem}
                    newItemName={newItemName}
                    setNewItemName={setNewItemName}
                    newItemIcon={newItemIcon}
                    setNewItemIcon={setNewItemIcon}
                />
                
                {/* Conditional Content: Selected Category Details */}
                {selectedCategory ? (
                    <>
                        {/* Title Bar and Actions */}
                        <h1>
                            <span>{selectedCategory.icon} Managing: {selectedCategory.name}</span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setEditingCategoryId(selectedCategory.id)} className="btn btn-secondary-light">
                                    Edit Details
                                </button>
                                <button onClick={() => handleDeleteMenuItem(selectedCategory.id)} className="btn btn-danger">
                                    Delete Category
                                </button>
                            </div>
                        </h1>
                        
                        {/* Category Edit Form (visible when button is clicked) */}
                        {editingCategoryId === selectedCategory.id && (
                            <CategoryEditForm 
                                category={selectedCategory} 
                                onUpdateCategory={handleUpdateMenuItem}
                                onCancelEdit={() => setEditingCategoryId(null)}
                            />
                        )}

                        {/* --- Sub-Item List & Management --- */}
                        <div className="card">
                            <h3 style={{ marginBottom: '10px' }}>Current Menu Items in "{selectedCategory.name}"</h3>
                            
                            {/* List of Items */}
                            <div className="sub-item-list">
                                {selectedCategory.subItems.length === 0 && <p style={{ color: '#6c757d' }}>No items in this category yet.</p>}
                                
                                {selectedCategory.subItems.map((sub) => (
                                    <div key={sub.id}>
                                        {editingSubItemId === sub.id ? (
                                            <EditSubItemForm 
                                                subItem={sub}
                                                menuItemId={selectedCategory.id}
                                                onUpdateSubItem={handleUpdateSubItem}
                                                onCancelEdit={() => setEditingSubItemId(null)}
                                            />
                                        ) : (
                                            <div className="sub-item">
                                                <span className="sub-item-details">
                                                    <span className="sub-item-icon">{sub.icon}</span>
                                                    <span className="sub-item-name">{sub.name}</span>
                                                    <span className="sub-item-price">${sub.price.toFixed(2)}</span>
                                                </span>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => setEditingSubItemId(sub.id)} className="btn-secondary-small">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteSubItem(selectedCategory.id, sub.id)} className="btn-danger-small">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Form to Add NEW Sub-Item */}
                            <AddSubItemForm 
                                menuItemId={selectedCategory.id} 
                                onAddSubItem={handleAddSubItem} 
                                getNewSubId={getNewSubId}
                            />
                        </div>

                    </>
                ) : (
                    <div className="card" style={{ textAlign: 'center', padding: '50px', borderTop: 'none', boxShadow: 'none' }}>
                        <h2>← Select a Category to Manage</h2>
                        <p style={{ color: '#6c757d' }}>Or use the form above to create your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;