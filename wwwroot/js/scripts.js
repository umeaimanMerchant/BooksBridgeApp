// General interactions for the BookBridge application
document.addEventListener('DOMContentLoaded', function () {
    // Handle form submissions
    const createForm = document.getElementById('createBookForm');
    if (createForm) {
        createForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Book created successfully! (This is a mock form)');
        });
    }

    const updateForm = document.getElementById('updateBookForm');
    if (updateForm) {
        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Book updated successfully! (This is a mock form)');
        });
    }

    // Handle delete confirmation
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this book?')) {
                alert('Book deleted successfully! (This is a simulation)');
            }
        });
    });

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Sample book data (in a real application, this would come from a database)
    const books = {
        "1": {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "978-0743273565",
            genre: "fiction",
            condition: "good",
            description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
            location: "New York, NY",
            availability: "available"
        },
        "2": {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            isbn: "978-0446310789",
            genre: "fiction",
            condition: "very-good",
            description: "The story of racial injustice and the loss of innocence in the American South.",
            location: "Los Angeles, CA",
            availability: "borrowed"
        },
        "3": {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            isbn: "978-0547928227",
            genre: "fiction",
            condition: "like-new",
            description: "The adventure of Bilbo Baggins, a hobbit who embarks on a quest to help a group of dwarves.",
            location: "Chicago, IL",
            availability: "available"
        },
        "4": {
            title: "1984",
            author: "George Orwell",
            isbn: "978-0451524935",
            genre: "science-fiction",
            condition: "good",
            description: "A dystopian novel about totalitarianism and surveillance society.",
            location: "Boston, MA",
            availability: "available"
        },
        "5": {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            isbn: "978-0141439518",
            genre: "romance",
            condition: "fair",
            description: "A romantic novel following the emotional development of Elizabeth Bennet.",
            location: "Seattle, WA",
            availability: "borrowed"
        }
    };

    // Function to populate form fields with book data
    function populateBookForm(bookId) {
        const book = books[bookId];
        if (!book) return;

        // Populate form fields
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('genre').value = book.genre;
        document.getElementById('condition').value = book.condition;
        document.getElementById('description').value = book.description;
        document.getElementById('location').value = book.location;
        document.getElementById('availability').value = book.availability;
    }

    // Function to display book details in delete page
    function displayBookDetails(bookId) {
        const book = books[bookId];
        if (!book) return;

        const bookDetails = document.getElementById('bookDetails');
        bookDetails.innerHTML = `
            <div class="book-details-card">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Condition:</strong> ${book.condition}</p>
                <p><strong>Location:</strong> ${book.location}</p>
                <p><strong>Status:</strong> ${book.availability}</p>
                <p><strong>Description:</strong> ${book.description}</p>
            </div>
        `;
    }

    // Update page book selection
    const updateBookSelect = document.getElementById('bookSelect');
    if (updateBookSelect) {
        updateBookSelect.addEventListener('change', function () {
            populateBookForm(this.value);
        });
    }

    // Delete page book selection
    const deleteBookSelect = document.getElementById('bookSelect');
    if (deleteBookSelect) {
        deleteBookSelect.addEventListener('change', function () {
            displayBookDetails(this.value);
        });
    }

    // Form submission handlers
    const updateForm = document.getElementById('updateBookForm');
    if (updateForm) {
        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Book updated successfully!');
            window.location.href = 'read.html';
        });
    }

    const deleteForm = document.getElementById('deleteBookForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
                // Here you would typically send a delete request to a server
                alert('Book deleted successfully!');
                window.location.href = 'read.html';
            }
        });
    }
}); 