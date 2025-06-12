const db = require("../config/connection");

//add to library when button clicked in search
async function addToLibrary(req, res) {
    const {bookId, title, authors} = req.body;
    try {
        const [currentLibrary] = await db.query(
            'SELECT * FROM library WHERE book_id = ?',
            [bookId]);
        if (currentLibrary.length > 0) {
            return res.json({message: 'This book is already in your library!'})
        }
        const [result] = await db.query (
        'INSERT INTO library (book_id, title, authors, user_id) values (?, ?, ?, ?)',
        [{bookId, title, authors}, req.params.user_id]);
        res.json({message: `${title} was added to your library!`});
    } catch (error) {
        console.error('Error adding to library', error);
        res.status(500).json({error: "unable to add to library"});
    }
};

//display library when user logged in
async function renderLibrary(req, res) {
    try {
        const [library] = await db.query('SELECT * FROM library WHERE user_id = ?');
        res.render('library', {library}, req.params.user_id);
    } catch (error) {
        console.error('error finding library', error);
        res.status(500).json({error: 'error finding library'});
    }
}

module.exports = {
    addToLibrary,
    renderLibrary
};

