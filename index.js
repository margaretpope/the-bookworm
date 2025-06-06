const form = document.querySelector('form')
const bookSection = document.getElementById('book')
const librarySection = document.getElementById('library')
const bookList = document.createElement('ol');
const apiKey = process.env.API_KEY

form.onsubmit = async function(e) {
    e.preventDefault()
    const userSearch = form.search.value.trim()
    localStorage.setItem('userSearch', userSearch)
    this.search.value = ''
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`)
        if (userSearch === '') throw new Error('Please search for a book.')
        const bookData = await res.json()
        console.log(bookData)
        if (bookData.items.length === 0) throw new Error('Book not found.')
        renderBook(bookData)
    } catch (err) {
        bookSection.innerHTML = err.message
    }
}

const renderBook = ({
    items: {
        0: {
            volumeInfo: {
                authors,
                imageLinks: {
                    smallThumbnail
                },
                title,
                categories
            }
        } 
    }   
}) => {
    bookSection.innerHTML = `<p>Title: ${title}</p>
    <p>Author: ${authors}</p>
    <p>Genre: ${categories}</p>
    <img src=${smallThumbnail}/>`
    bookSection.style.fontFamily = "Cactus Classical Serif, serif";
    renderButton(title, authors);
}

const renderButton = function(title, authors) {
    const addToLibrary = document.createElement('button');
    addToLibrary.textContent = 'add to library';
    addToLibrary.onclick = function() {
        const bookListItem = document.createElement('li');
        bookListItem.textContent = `${title}, by: ${authors}`;
        bookList.appendChild(bookListItem)
        librarySection.appendChild(bookList)
    }
    librarySection.style.fontFamily = "Cactus Classical Serif, serif";
    addToLibrary.style.fontFamily = "Cactus Classical Serif, serif";
    bookSection.appendChild(addToLibrary)
}
