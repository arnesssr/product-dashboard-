const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// In-memory data store (would be replaced with a database in production)
let products = [];
let categories = [
  { id: 'books', name: 'Books' },
  { id: 'bibles', name: 'Bibles' },
  { id: 'journals', name: 'Journals' },
  { id: 'other', name: 'Other' }
];

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// API Routes
// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(products[index]);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const deletedProduct = products[index];
  products.splice(index, 1);
  
  res.json(deletedProduct);
});

// Upload product image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Add some sample data
const initSampleData = () => {
  if (products.length === 0) {
    products = [
      {
        id: uuidv4(),
        productName: 'Study Bible - KJV',
        category: 'Bibles',
        description: 'King James Version study Bible with commentary and references.',
        price: 49.99,
        stockQuantity: 25,
        status: 'Published',
        translation: 'KJV',
        format: 'Leather',
        color: 'Black',
        imageUrl: '',
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        productName: 'Daily Devotional',
        category: 'Books',
        description: 'A 365-day devotional for daily spiritual growth and reflection.',
        price: 15.99,
        stockQuantity: 50,
        status: 'Published',
        author: 'John Smith',
        publisher: 'Faith Press',
        pages: 400,
        language: 'English',
        isbn: '9781234567897',
        imageUrl: '',
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        productName: 'Christian Living',
        category: 'Books',
        description: 'A guide to applying Christian principles in everyday life situations.',
        price: 12.50,
        stockQuantity: 30,
        status: 'Draft',
        author: 'Sarah Johnson',
        publisher: 'Grace Books',
        pages: 250,
        language: 'English',
        isbn: '9789876543210',
        imageUrl: '',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

// Initialize sample data
initSampleData();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
