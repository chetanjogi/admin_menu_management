# **💻 POS & Inventory Management System**

This repository contains the front-end code for a simple Point-of-Sale (POS) and Menu Administration application, designed to manage menu categories, sub-items, and handle order creation.

## **📂 Project Structure**

The application is built using React (JSX) and standard CSS, adhering to a single-file component structure for ease of development and deployment in limited environments.

/  
├── public/  
├── src/  
│   ├── App.jsx             \# Main application component and routing logic  
│   ├── App.css             \# Global and layout styles  
│   ├── Menu.jsx            \# Component for Menu/Inventory Administration  
│   ├── Menu.css            \# Specific styles for the Admin Menu  
│   ├── OrderScreen.jsx     \# Component for the Point-of-Sale (POS) interface  
│   └── OrderScreen.css     \# Specific styles for the POS screen  
└── package.json

## **🚀 Core Components**

### **1\. src/App.jsx and src/App.css**

| File | Description |
| :---- | :---- |
| **App.jsx** | The root component. It manages the main application state, including the menuItems data structure, and provides the navigation/switching logic between the two primary views: **Admin Menu** and **Order Screen**. |
| **App.css** | Contains global styles, font definitions, CSS variables, and the primary application container layout. |

### **2\. Admin Menu (Menu.jsx)**

The Admin Menu is a two-column layout optimized for desktop management .

| File | Description |
| :---- | :---- |
| **Menu.jsx** | Handles all CRUD (Create, Read, Update, Delete) operations for menu categories and individual sub-items. The "Add New Category" form is prominently displayed in the main content area for better layout. |
| **Menu.css** | Implements the **Toast-Style** Admin panel layout. It defines the fixed-width left navigation pane and the fluid-width main content area, using CSS Grid for the primary two-column structure and Flexbox for responsive form groups. |

### **3\. Order Screen (OrderScreen.jsx)**

(Note: This screen is planned/in development to handle order creation logic.)

| File | Description |
| :---- | :---- |
| **OrderScreen.jsx** | Will be the main Point-of-Sale (POS) interface. It will consume the menuItems state from App.jsx to display categories and items, allowing users to build an order, manage quantities, and apply modifiers (future feature). |
| **OrderScreen.css** | Will contain specific grid and flex styles necessary to lay out the categories, item buttons, and the order checkout panel for an efficient POS workflow. |

## **⚙️ Getting Started (Local Setup)**

Follow these steps to download and run the application on your local machine using Node.js.

### **Prerequisites**

You must have **Node.js** and **npm** (Node Package Manager) installed.

### **1\. Clone the Repository**

Open your terminal or command prompt and clone the repository (replace \[repo-url\] with the actual URL):

```bash 
git clone \[repo-url\] pos-admin-menu
cd pos-admin-menu
```
### **2\. Install Dependencies**

Install all necessary React and development packages defined in package.json:

```bash 
npm install
```

### **3\. Run the Application**

Start the development server. This command usually opens the application automatically in your default web browser at http://localhost:3000:

```bash 
npm start
```

The application will now be running and ready for development or testing\!

## **✨ Styling Approach**

* **Responsive Design:** Styles include media queries to ensure usability on both desktop and mobile devices.  
* **Aesthetics:** The design uses a clean, modern color palette defined by CSS variables, favoring rounded corners and subtle shadows for a polished, professional look.  
* **Flexbox/Grid:** Modern CSS layout techniques are used heavily to create the two-column administrative layout (Menu.css) and dynamic form fields (input-group).
