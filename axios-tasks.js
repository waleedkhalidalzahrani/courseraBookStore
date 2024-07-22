const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Replace with your server URL

// Task 10: Get all books – Using async callback function
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        console.log('All Books:', response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
    return axios.get(`${BASE_URL}/books/${isbn}`)
        .then(response => console.log('Book Details:', response.data))
        .catch(error => console.error('Error fetching book by ISBN:', error));
}

// Task 12: Search by Author
async function searchByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/books/author/${author}`);
        console.log('Books by Author:', response.data);
    } catch (error) {
        console.error('Error fetching books by author:', error);
    }
}

// Task 13: Search by Title
async function searchByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/books/title/${title}`);
        console.log('Books by Title:', response.data);
    } catch (error) {
        console.error('Error fetching books by title:', error);
    }
}

// Example usage
getAllBooks();
searchByISBN('1234567890');
searchByAuthor('Author X');
searchByTitle('Book A');
