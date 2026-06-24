const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Sample products
    const products = [
      {
        name: 'Laptop',
        description: 'High-performance laptop with 16GB RAM, 512GB SSD, and Intel i7 processor.',
        price: 50000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 10
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone model with 5G support, 128GB storage, and AMOLED display.',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 15
      },
      {
        name: 'Headphones',
        description: 'Wireless headphones with noise cancellation and 30-hour battery life.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        category: 'Audio',
        stock: 20
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'Wearables',
        stock: 12
      },
      {
        name: 'Tablet',
        description: '10-inch tablet with 64GB storage and stylus support.',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 8
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
        category: 'Audio',
        stock: 25
      },
      {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with active noise cancellation and 24-hour battery life.',
        price: 2000,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
        category: 'Audio',
        stock: 30
      },
      {
        name: 'Gaming Mouse',
        description: 'RGB gaming mouse with 16000 DPI sensor and programmable buttons.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 18
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 14
      },
      {
        name: 'Monitor 27-inch',
        description: '27-inch 4K monitor with HDR support and 144Hz refresh rate.',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 10
      },
      {
        name: 'External Hard Drive',
        description: '2TB external hard drive with USB 3.0 and fast transfer speeds.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
        category: 'Storage',
        stock: 20
      },
      {
        name: 'Webcam HD',
        description: '1080p HD webcam with auto-focus and built-in microphone.',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 25
      },
      {
        name: 'USB Hub',
        description: '7-port USB 3.0 hub with fast charging support.',
        price: 800,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 30
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand for better ergonomics.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 22
      },
      {
        name: 'Power Bank',
        description: '20000mAh power bank with fast charging and dual USB ports.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 35
      },
      {
        name: 'Wireless Charger',
        description: 'Fast wireless charger compatible with all Qi-enabled devices.',
        price: 900,
        image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 28
      },
      {
        name: 'Fitness Band',
        description: 'Waterproof fitness band with step tracking and heart rate monitor.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
        category: 'Wearables',
        stock: 20
      },
      {
        name: 'Smart Home Hub',
        description: 'Central hub for controlling all your smart home devices.',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop',
        category: 'Smart Home',
        stock: 12
      },
      {
        name: 'Smart Bulb',
        description: 'WiFi-enabled smart bulb with 16 million colors and voice control.',
        price: 600,
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
        category: 'Smart Home',
        stock: 40
      },
      {
        name: 'Security Camera',
        description: '1080p wireless security camera with night vision and motion detection.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=300&fit=crop',
        category: 'Smart Home',
        stock: 15
      },
      {
        name: 'Wireless Router',
        description: 'Dual-band WiFi 6 router with high-speed connectivity and mesh support.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 18
      },
      {
        name: 'Portable SSD',
        description: '1TB portable SSD with USB-C and fast transfer speeds.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
        category: 'Storage',
        stock: 22
      },
      {
        name: 'Graphics Card',
        description: 'RTX 3060 graphics card for gaming and content creation.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
        category: 'Electronics',
        stock: 8
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with silent clicks and long battery life.',
        price: 800,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 30
      },
      {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 25
      },
      {
        name: 'Bluetooth Earphones',
        description: 'Neckband style Bluetooth earphones with 12-hour battery life.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
        category: 'Audio',
        stock: 28
      },
      {
        name: 'Smart Doorbell',
        description: 'Video doorbell with motion detection and two-way audio.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=400&h=300&fit=crop',
        category: 'Smart Home',
        stock: 15
      },
      {
        name: 'Laptop Sleeve',
        description: 'Padded laptop sleeve for 15-inch laptops with water-resistant coating.',
        price: 600,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 35
      },
      {
        name: 'Wireless Gamepad',
        description: 'Bluetooth game controller compatible with PC and mobile devices.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop',
        category: 'Accessories',
        stock: 20
      },
      {
        name: 'Smart Thermostat',
        description: 'WiFi-enabled smart thermostat with energy-saving features.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1567706424447-5112446a8956?w=400&h=300&fit=crop',
        category: 'Smart Home',
        stock: 12
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
