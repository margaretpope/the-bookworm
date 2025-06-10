import bookSearch from "..models/search"
const db = require("../config/connection")

export async function bookSearch(req, res) {
    const {query} = req.query;
    if (!query) {
        return res.render('books', {error: 'please enter a book title'});
    }
    try {
        const books = await models.search.bookSearch(query);
        res.status('books', {books, searchQuery: query});
    } catch (error) {
        console.error('Error:', error.message);
        res.render('books', {error: 'unable to fetch books'});
    }
}

