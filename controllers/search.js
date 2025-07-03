const { bookSearch } = require("../models/search");
const db = require("../config/connection");

//pull search results from search model/API call
async function handleBookSearch(req, res) {
    const {query} = req.query;
    if (!query) {
        return res.render('search', {isLoggedIn: req.session.isLoggedIn, error: 'please enter a book title'});
    }
    try {
        const books = await bookSearch(query);
        res.render('search', {books, searchQuery: query});
    } catch (error) {
        console.error('Error:', error.message);
        res.render('search', {error: 'unable to fetch books'});
    }
}

module.exports = { 
    handleBookSearch
};

