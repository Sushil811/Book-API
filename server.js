require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const auth = require('./middleware/authMiddleware');
const connectDB = require('./config/db'); // Path to the code in Step 2


const app = express();
app.use(express.json());

// User Routes [cite: 10, 11]
app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);

// Book Routes [cite: 14, 18]
app.get('/api/books', bookController.getBooks); // Public
app.get('/api/books/:id', bookController.getBookById); // Public
app.post('/api/books', auth, bookController.createBook); // Protected
app.put('/api/books/:id', auth, bookController.updateBook); // Protected
app.delete('/api/books/:id', auth, bookController.deleteBook); // Protected

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
// const PORT = process.env.PORT || 5000;
// if (process.env.NODE_ENV !== 'production') {
//     mongoose.connect(process.env.MONGO_URI)
//         .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
//         .catch(err => console.error(err));
// }

module.exports = app;
