// server.js (The Main Application File)
// ==================== IMPORTS ====================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./db'); // Ensure the DB connection file runs

// 🚨 IMPORT BOTH ROUTE FILES 🚨
const productAddRoutes = require('./AddingProducts'); 
const generalRoutes = require('./RetrivingProducts'); 
 
dotenv.config();
// ==================== CONFIG ====================
const app = express();
const PORT = process.env.PORT || 5000;
 
// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
 
 
// ==================== BASIC ROUTE ====================
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fabrics API with complete Category/Subcategory Support 🧵' });
});
 
// 🚨 CONNECT BOTH ROUTERS 🚨
// All /api requests are now routed to their respective handlers.
app.use('/api', productAddRoutes); // Handles POST /api/products (from AddingProducts.js)
app.use('/api', generalRoutes);    // Handles GET/CRUD for everything else (from RetrivingData.js)
 
 
// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});