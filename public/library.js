//deals with user interactions with "add to library" button

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-book').forEach(button => {
        button.addEventListener("click", async () => {
            const bookId = button.dataset.bookId;
            const title = button.dataset.title;
            const authors = button.dataset.authors;
            try {
                const res = await fetch('/library', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ bookId, title, authors})
                });
                const result = await res.json();
            } catch(err) {
                console.error('unable to add to library', err);
            }
        })
    })
})