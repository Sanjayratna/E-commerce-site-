# E-Commerce Store

A full-stack e-commerce application built with Express.js (Node.js), MongoDB, and vanilla HTML/CSS/JavaScript.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Product Listings**: Browse and view product details
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Processing**: Place orders with shipping addresses
- **Product Management**: Create, update, and delete products (admin)
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: HTML, CSS, JavaScript
- **Password Hashing**: bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already configured with default settings
   - MongoDB URI: `mongodb://localhost:27017/ecommerce`
   - JWT Secret: Change this in production

4. Start MongoDB:
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017`

5. Seed the database with initial products:
```bash
node seed.js
```

6. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Usage

### Access the Application

Open your browser and navigate to: `http://localhost:5000`

### User Registration

1. Click the "Register" button in the header
2. Fill in your name, email, and password
3. Submit the form

### User Login

1. Click the "Login" button in the header
2. Enter your email and password
3. Submit the form

### Shopping

1. Browse products on the main page
2. Click "View Details" to see more information about a product
3. Click "Add To Cart" to add items to your cart
4. View your cart by clicking the cart button in the header
5. Remove items from cart using the "Remove" button

### Placing an Order

1. Add items to your cart
2. Click the cart button to open the cart panel
3. Click "Place Order"
4. Fill in your shipping address
5. Submit the order

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Cart

- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update` - Update cart item quantity (requires auth)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear cart (requires auth)

### Orders

- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)
- `POST /api/orders` - Create new order (requires auth)
- `PUT /api/orders/:id/status` - Update order status (requires auth)

## Project Structure

```
ecommerce-store/
├── models/
│   ├── User.js          # User model with cart
│   ├── Product.js       # Product model
│   └── Order.js         # Order model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── products.js      # Product routes
│   ├── cart.js          # Cart routes
│   └── orders.js        # Order routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── index.html           # Main frontend file
├── Style.css            # Styling
├── server.js            # Express server
├── seed.js              # Database seed script
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## Features in Detail

### Authentication
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Token storage in localStorage

### Shopping Cart
- Persistent cart in database
- Quantity management
- Real-time cart updates
- Remove individual items

### Order Processing
- Shipping address collection
- Order status tracking
- Order history for users
- Total amount calculation

### Product Management
- Create, read, update, delete operations
- Product categories
- Stock tracking
- Image URLs

## Development Notes

- The application uses MongoDB for data persistence
- JWT tokens expire after 7 days
- All passwords are hashed before storage
- The frontend has fallback to sample products if backend is unavailable
- CORS is enabled for cross-origin requests

## Security Considerations

- Change the JWT_SECRET in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS in production

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Product search and filtering
- User profile management
- Order tracking with status updates
- Email notifications
- Product reviews and ratings
- Admin dashboard
- Image upload functionality
- Wishlist feature

## License

ISC
