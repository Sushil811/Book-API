require('dotenv').config();
const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const auth = require('./middleware/authMiddleware');
const connectDB = require('./config/db'); // Path to the code in Step 2

// Connect to Database once when the application starts
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Serve static files (like favicon.png) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a root route to confirm the API is running
app.get('/', (req, res) => {
  res.send('Book API is running successfully!');
});

// User Routes [cite: 10, 11]
app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);

// Book Routes [cite: 14, 18]
app.get('/api/books', bookController.getBooks);
app.get('/api/books/:id', bookController.getBookById);
app.post('/api/books', auth, bookController.createBook);
app.put('/api/books/:id', auth, bookController.updateBook);
app.delete('/api/books/:id', auth, bookController.deleteBook);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
