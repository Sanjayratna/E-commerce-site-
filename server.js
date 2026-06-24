const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// In-memory data storage
let users = [];
let products = [
  {
    _id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM, 512GB SSD, and Intel i7 processor.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 10
  },
  {
    _id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone model with 5G support, 128GB storage, and AMOLED display.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 15
  },
  {
    _id: '3',
    name: 'Headphones',
    description: 'Wireless headphones with noise cancellation and 30-hour battery life.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Audio',
    stock: 20
  },
  {
    _id: '4',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Wearables',
    stock: 12
  },
  {
    _id: '5',
    name: 'Tablet',
    description: '10-inch tablet with 64GB storage and stylus support.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 8
  },
  {
    _id: '6',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: 'Audio',
    stock: 25
  },
  {
    _id: '7',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation and 24-hour battery life.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    category: 'Audio',
    stock: 30
  },
  {
    _id: '8',
    name: 'Gaming Mouse',
    description: 'RGB gaming mouse with 16000 DPI sensor and programmable buttons.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 18
  },
  {
    _id: '9',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 14
  },
  {
    _id: '10',
    name: 'Monitor 27-inch',
    description: '27-inch 4K monitor with HDR support and 144Hz refresh rate.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 10
  },
  {
    _id: '11',
    name: 'External Hard Drive',
    description: '2TB external hard drive with USB 3.0 and fast transfer speeds.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Storage',
    stock: 20
  },
  {
    _id: '12',
    name: 'Webcam HD',
    description: '1080p HD webcam with auto-focus and built-in microphone.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 25
  },
  {
    _id: '13',
    name: 'USB Hub',
    description: '7-port USB 3.0 hub with fast charging support.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 30
  },
  {
    _id: '14',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better ergonomics.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 22
  },
  {
    _id: '15',
    name: 'Power Bank',
    description: '20000mAh power bank with fast charging and dual USB ports.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 35
  },
  {
    _id: '16',
    name: 'Wireless Charger',
    description: 'Fast wireless charger compatible with all Qi-enabled devices.',
    price: 900,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 28
  },
  {
    _id: '17',
    name: 'Fitness Band',
    description: 'Waterproof fitness band with step tracking and heart rate monitor.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    category: 'Wearables',
    stock: 20
  },
  {
    _id: '18',
    name: 'Smart Home Hub',
    description: 'Central hub for controlling all your smart home devices.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop',
    category: 'Smart Home',
    stock: 12
  },
  {
    _id: '19',
    name: 'Smart Bulb',
    description: 'WiFi-enabled smart bulb with 16 million colors and voice control.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
    category: 'Smart Home',
    stock: 40
  },
  {
    _id: '20',
    name: 'Security Camera',
    description: '1080p wireless security camera with night vision and motion detection.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=300&fit=crop',
    category: 'Smart Home',
    stock: 15
  },
  {
    _id: '21',
    name: 'Wireless Router',
    description: 'Dual-band WiFi 6 router with high-speed connectivity and mesh support.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 18
  },
  {
    _id: '22',
    name: 'Portable SSD',
    description: '1TB portable SSD with USB-C and fast transfer speeds.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
    category: 'Storage',
    stock: 22
  },
  {
    _id: '23',
    name: 'Graphics Card',
    description: 'RTX 3060 graphics card for gaming and content creation.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 8
  },
  {
    _id: '24',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with silent clicks and long battery life.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 30
  },
  {
    _id: '25',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 25
  },
  {
    _id: '26',
    name: 'Bluetooth Earphones',
    description: 'Neckband style Bluetooth earphones with 12-hour battery life.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    category: 'Audio',
    stock: 28
  },
  {
    _id: '27',
    name: 'Smart Doorbell',
    description: 'Video doorbell with motion detection and two-way audio.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=400&h=300&fit=crop',
    category: 'Smart Home',
    stock: 15
  },
  {
    _id: '28',
    name: 'Laptop Sleeve',
    description: 'Padded laptop sleeve for 15-inch laptops with water-resistant coating.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 35
  },
  {
    _id: '29',
    name: 'Wireless Gamepad',
    description: 'Bluetooth game controller compatible with PC and mobile devices.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 20
  },
  {
    _id: '30',
    name: 'Smart Thermostat',
    description: 'WiFi-enabled smart thermostat with energy-saving features.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1567706424447-5112446a8956?w=400&h=300&fit=crop',
    category: 'Smart Home',
    stock: 12
  }
];
let orders = [];
let carts = {}; // userId -> cart items
let wishlists = {}; // userId -> wishlist items

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Generate ID helper
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      _id: generateId(),
      name,
      email,
      password: hashedPassword,
      cart: [],
      createdAt: new Date()
    };

    users.push(user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', auth, (req, res) => {
  const { name, description, price, image, category, stock } = req.body;
  
  const product = {
    _id: generateId(),
    name,
    description,
    price,
    image,
    category,
    stock,
    createdAt: new Date()
  };

  products.push(product);
  res.status(201).json(product);
});

app.put('/api/products/:id', auth, (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete('/api/products/:id', auth, (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

// Cart Routes
app.get('/api/cart', auth, (req, res) => {
  const userCart = carts[req.user._id] || [];
  const populatedCart = userCart.map(item => ({
    ...item,
    product: products.find(p => p._id === item.productId)
  }));
  res.json(populatedCart);
});

app.post('/api/cart/add', auth, (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!carts[req.user._id]) {
    carts[req.user._id] = [];
  }
  
  const existingItemIndex = carts[req.user._id].findIndex(
    item => item.productId === productId
  );
  
  if (existingItemIndex > -1) {
    carts[req.user._id][existingItemIndex].quantity += quantity || 1;
  } else {
    carts[req.user._id].push({
      productId,
      quantity: quantity || 1
    });
  }
  
  const populatedCart = carts[req.user._id].map(item => ({
    ...item,
    product: products.find(p => p._id === item.productId)
  }));
  
  res.json(populatedCart);
});

app.put('/api/cart/update', auth, (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!carts[req.user._id]) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const cartItem = carts[req.user._id].find(
    item => item.productId === productId
  );
  
  if (!cartItem) {
    return res.status(404).json({ message: 'Item not in cart' });
  }
  
  cartItem.quantity = quantity;
  
  if (quantity <= 0) {
    carts[req.user._id] = carts[req.user._id].filter(
      item => item.productId !== productId
    );
  }
  
  const populatedCart = carts[req.user._id].map(item => ({
    ...item,
    product: products.find(p => p._id === item.productId)
  }));
  
  res.json(populatedCart);
});

app.delete('/api/cart/remove/:productId', auth, (req, res) => {
  if (!carts[req.user._id]) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  carts[req.user._id] = carts[req.user._id].filter(
    item => item.productId !== req.params.productId
  );
  
  const populatedCart = carts[req.user._id].map(item => ({
    ...item,
    product: products.find(p => p._id === item.productId)
  }));
  
  res.json(populatedCart);
});

app.delete('/api/cart/clear', auth, (req, res) => {
  carts[req.user._id] = [];
  res.json({ message: 'Cart cleared' });
});

// Wishlist Routes
app.get('/api/wishlist', auth, (req, res) => {
  const userWishlist = wishlists[req.user._id] || [];
  const populatedWishlist = userWishlist.map(productId => ({
    productId,
    product: products.find(p => p._id === productId)
  }));
  res.json(populatedWishlist);
});

app.post('/api/wishlist/add', auth, (req, res) => {
  const { productId } = req.body;
  
  if (!wishlists[req.user._id]) {
    wishlists[req.user._id] = [];
  }
  
  if (!wishlists[req.user._id].includes(productId)) {
    wishlists[req.user._id].push(productId);
  }
  
  const populatedWishlist = wishlists[req.user._id].map(pid => ({
    productId: pid,
    product: products.find(p => p._id === pid)
  }));
  res.json(populatedWishlist);
});

app.delete('/api/wishlist/remove/:productId', auth, (req, res) => {
  if (!wishlists[req.user._id]) {
    return res.status(404).json({ message: 'Wishlist not found' });
  }
  
  wishlists[req.user._id] = wishlists[req.user._id].filter(
    productId => productId !== req.params.productId
  );
  
  const populatedWishlist = wishlists[req.user._id].map(productId => ({
    productId,
    product: products.find(p => p._id === productId)
  }));
  res.json(populatedWishlist);
});

// Order Routes
app.get('/api/orders', auth, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user._id);
  const populatedOrders = userOrders.map(order => ({
    ...order,
    products: order.products.map(item => ({
      ...item,
      product: products.find(p => p._id === item.productId)
    }))
  }));
  res.json(populatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.get('/api/orders/:id', auth, (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  if (order.userId !== req.user._id) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  const populatedOrder = {
    ...order,
    products: order.products.map(item => ({
      ...item,
      product: products.find(p => p._id === item.productId)
    }))
  };
  
  res.json(populatedOrder);
});

app.post('/api/orders', auth, (req, res) => {
  const { products: orderProducts, shippingAddress } = req.body;
  
  if (!orderProducts || orderProducts.length === 0) {
    return res.status(400).json({ message: 'No products in order' });
  }
  
  let totalAmount = 0;
  const processedProducts = orderProducts.map(item => {
    totalAmount += item.price * item.quantity;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    };
  });
  
  const order = {
    _id: generateId(),
    userId: req.user._id,
    products: processedProducts,
    totalAmount,
    shippingAddress,
    status: 'pending',
    createdAt: new Date()
  };
  
  orders.push(order);
  
  // Clear cart after order
  carts[req.user._id] = [];
  
  const populatedOrder = {
    ...order,
    products: order.products.map(item => ({
      ...item,
      product: products.find(p => p._id === item.productId)
    }))
  };
  
  res.status(201).json(populatedOrder);
});

app.put('/api/orders/:id/status', auth, (req, res) => {
  const { status } = req.body;
  
  const index = orders.findIndex(o => o._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  orders[index].status = status;
  res.json(orders[index]);
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});
