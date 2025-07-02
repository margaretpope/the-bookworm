//deals with user interactions with "add to library" button

document.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message');
    document.querySelectorAll('.add-book').forEach(button => {
        button.addEventListener("click", async () => {
            if (!isLoggedIn) {
                alert("Login to add books to your library!");
            }
            const bookId = button.dataset.bookId;
            const title = button.dataset.title;
            const authorsArr = button.dataset.authors;
            const authors = JSON.parse(authorsArr).join(', ');
            const thumbnail = button.dataset.thumbnail;
            try {
                const res = await fetch('/api/library', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ bookId, title, authors, thumbnail})
                });
                const result = await res.json();
                if(messageBox) {
                    messageBox.textContent = result.message || "Added to library!";
                }
            } catch(err) {
                console.error('unable to add to library', err);
                if(messageBox) {
                    messageBox.textContent = "Oops! We couldn't add your book."
                }
            }
        })
    })
})