const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample in-memory data
let books = [
    { isbn: '1', title: 'Things fali apart', author: 'Chinua Achebe', reviews: [] },
    { isbn: '2', title: 'Hans Christan, andeosen', author: 'Damte Alighieri', reviews: [] },
    { isbn: '3', title: 'The Divien Comedy', author: 'faily tolas', reviews: [] },
    { isbn: '4', title: 'The Epic Of Gilgamesh', author: 'Unknown', reviews: [] },
    { isbn: '5', title: 'The Book Of Job', author: 'Unknown', reviews: [] }
];

let users = []; // This will be a list of registered users

// Sample route for getting the book list
app.get('/books', (req, res) => {
    res.json(books);
});

// Sample route for getting books by ISBN
app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Sample route for getting books by Author
app.get('/books/author/:author', (req, res) => {
    const filteredBooks = books.filter(b => b.author === req.params.author);
    res.json(filteredBooks);
});

// Sample route for getting books by Title
app.get('/books/title/:title', (req, res) => {
    const filteredBooks = books.filter(b => b.title === req.params.title);
    res.json(filteredBooks);
});

// Sample route for getting book reviews
app.get('/books/:isbn/reviews', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

// Register new user
app.post('/users/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }
    users.push({ username, password, reviews: [] });
    res.status(201).send('User registered');
});

// Login as a registered user
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Add/Modify book review
app.post('/books/:isbn/review', (req, res) => {
    const { username, review } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        const user = users.find(u => u.username === username);
        if (user) {
            const existingReview = book.reviews.find(r => r.username === username);
            if (existingReview) {
                existingReview.review = review;
            } else {
                book.reviews.push({ username, review });
            }
            res.send('Review added/modified');
        } else {
            res.status(401).send('User not found');
        }
    } else {
        res.status(404).send('Book not found');
    }
});

// Delete book review
app.delete('/books/:isbn/review', (req, res) => {
    const { username } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        book.reviews = book.reviews.filter(r => r.username !== username);
        res.send('Review deleted');
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
