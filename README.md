# E-commerce Website

## Overview
This project is an e-commerce website that allows users to browse products, manage a shopping cart, and place orders. It features separate categories for food and beverages, a user authentication system, and a responsive design.

## Features
- **Product Search**: Users can search for products by name or category.
- **Shopping Cart**: Users can add, remove, and view items in their shopping cart.
- **Order Placement**: Users can place orders and view their order history.
- **User Authentication**: Users can register, log in, and manage their accounts.
- **Category Navigation**: Products are organized into categories for easy browsing.

## Project Structure
```
ecommerce-website
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── views
│   ├── public
│   └── app.js
├── config
│   └── database.js
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ecommerce-website
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Configure the database connection in `config/database.js`.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript templating)
- CSS

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.