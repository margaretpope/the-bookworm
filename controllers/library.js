const db = require("../config/connection");

//add to library when button clicked in search
async function addToLibrary(req, res) {
    const {bookId, title, authors, thumbnail} = req.body;
    const userId = req.session.user_id;
    try {
        const [currentLibrary] = await db.query(
            'SELECT * FROM library WHERE book_id = ? AND user_id = ?',
            [bookId, userId]);
        if (currentLibrary.length > 0) {
            return res.json({message: 'This book is already in your library!'})
        }
        const [result] = await db.query (
        'INSERT INTO library (book_id, title, authors, thumbnail, user_id) values (?, ?, ?, ?, ?)',
        [bookId, title, authors, thumbnail, userId]);
        res.json({message: `${title} was added to your library!`});
    } catch (error) {
        console.error('Error adding to library', error);
        res.status(500).json({error: "unable to add to library"});
    }
};

//display library when user logged in
async function renderLibrary(req, res) {
    try {
        const userId = req.session.user_id;
        const [library] = await db.query('SELECT * FROM library WHERE user_id = ?', [userId]);
        const bookCount = library.length;
        res.render('library', {isLoggedIn: req.session.isLoggedIn, library, bookCount});
    } catch (error) {
        console.error('error finding library', error);
        res.status(500).json({error: 'error finding library'});
    }
}

module.exports = {
    addToLibrary,
    renderLibrary
};

