const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// Load environment variables
dotenv.config();

// Add diagnostic logging for environment variables
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT verification middleware
// eslint-disable-next-line no-unused-vars
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fabrics Backend API' });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Query admin_users table
    const query = 'SELECT id, email, password, role FROM admin_users WHERE email = $1';
    const { rows } = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  // Placeholder for register logic
  res.json({ message: 'Register endpoint' });
});

// Products routes
app.get('/api/products', async (req, res) => {
   try {
      console.log('Testing database connection for GET /api/products...');
      await db.query('SELECT 1');
      console.log('Database connection successful for GET /api/products');

      const query = 'SELECT * FROM products ORDER BY created_at DESC';
      console.log('Executing GET query:', query);
      const { rows } = await db.query(query);
      console.log('GET query successful, found', rows.length, 'products');
      res.json({ products: rows });
   } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
         message: error.message,
         code: error.code,
         detail: error.detail,
         hint: error.hint
      });
      res.status(500).json({ message: 'Internal server error', error: error.message });
   }
});

app.post('/api/products', async (req, res) => {
   const {  name_en, name_ar, description_en, description_ar, image_path, created_at } = req.body;

   // Add extensive logging for request body
   console.log('POST /api/products request body:', req.body);
   console.log('Request headers:', req.headers);

   try {
      // Test database connection first
      console.log('Testing database connection...');
      await db.query('SELECT 1');
      console.log('Database connection successful');

      const query = `
         INSERT INTO products ( name_en, name_ar, description_en, description_ar, image_path, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id
      `;
      const values = [ name_en, name_ar || null, description_en || null, description_ar || null, image_path || null, created_at || new Date().toISOString()];
      console.log('Executing query:', query);
      console.log('With values:', values);
      const { rows } = await db.query(query, values);
      console.log('Query executed successfully, inserted row:', rows[0]);
      res.status(201).json({ message: 'Product added successfully', id: rows[0].id });
   } catch (error) {
      console.error('Error adding product:', error);
      console.error('Error details:', {
         message: error.message,
         code: error.code,
         detail: error.detail,
         hint: error.hint
      });
      res.status(500).json({ message: 'Internal server error', error: error.message });
   }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});