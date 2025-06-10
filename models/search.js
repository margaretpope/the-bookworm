const axios = require('axios')

async function bookSearch(userSearch) {
    try {
        response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=5`,
            {headers: {
                'X-Api-Key': process.env.API_KEY
            }})
        console.log(response.data)
        return response.data.items.map(item=> ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        }))
    } catch(err) {
        console.error(err)
    }
    res.render("books", {isLoggedIn, response})
}

exports = {
    bookSearch,
}