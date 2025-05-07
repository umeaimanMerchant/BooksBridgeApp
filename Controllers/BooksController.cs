using Microsoft.AspNetCore.Mvc;
using BookBridgeApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace BookBridgeApp.Controllers
{
    public class BooksController : Controller
    {
        private static List<Book> Books = new List<Book>
        {
            new Book { Id = 1, Title = "1984", Author = "George Orwell", Genre = "Fiction", Condition = "Good", Description = "Classic dystopian novel.", UserName = "Admin", Location = "USF Library", Phone = "123-456-7890", Availability = "Available" },
            new Book { Id = 2, Title = "The Hobbit", Author = "J.R.R. Tolkien", Genre = "Fiction", Condition = "Excellent", Description = "Adventure of Bilbo Baggins.", UserName = "Admin", Location = "Downtown Tampa", Phone = "123-456-7891", Availability = "Available" },
            new Book { Id = 3, Title = "Sapiens", Author = "Yuval Noah Harari", Genre = "Non-Fiction", Condition = "Good", Description = "A brief history of humankind.", UserName = "Admin", Location = "Ybor City", Phone = "123-456-7892", Availability = "Available" },
            new Book { Id = 4, Title = "The Da Vinci Code", Author = "Dan Brown", Genre = "Mystery", Condition = "Fair", Description = "Thrilling mystery novel.", UserName = "Admin", Location = "Hyde Park", Phone = "123-456-7893", Availability = "Available" },
            new Book { Id = 5, Title = "Dune", Author = "Frank Herbert", Genre = "Science Fiction", Condition = "Good", Description = "Epic sci-fi saga.", UserName = "Admin", Location = "Channel District", Phone = "123-456-7894", Availability = "Available" },
            new Book { Id = 6, Title = "Pride and Prejudice", Author = "Jane Austen", Genre = "Romance", Condition = "Good", Description = "Classic romance novel.", UserName = "Admin", Location = "Seminole Heights", Phone = "123-456-7895", Availability = "Available" },
            new Book { Id = 7, Title = "The Diary of a Young Girl", Author = "Anne Frank", Genre = "Biography", Condition = "Excellent", Description = "Anne Frank's diary.", UserName = "Admin", Location = "Westshore", Phone = "123-456-7896", Availability = "Available" },
            new Book { Id = 8, Title = "Guns, Germs, and Steel", Author = "Jared Diamond", Genre = "History", Condition = "Good", Description = "Exploration of human societies.", UserName = "Admin", Location = "Tampa Palms", Phone = "123-456-7897", Availability = "Available" },
            new Book { Id = 9, Title = "To Kill a Mockingbird", Author = "Harper Lee", Genre = "Fiction", Condition = "Good", Description = "A story of racial injustice.", UserName = "Admin", Location = "SoHo", Phone = "123-456-7898", Availability = "Available" },
            new Book { Id = 10, Title = "The Martian", Author = "Andy Weir", Genre = "Science Fiction", Condition = "Excellent", Description = "Survival story on Mars.", UserName = "Admin", Location = "Water Street", Phone = "123-456-7899", Availability = "Available" }
        };

        private static int nextId = 11;

        // GET: Create page
        public IActionResult Create()
        {
            return View();
        }

        // POST: Add a new book
        [HttpPost]
        public IActionResult Create(Book book)
        {
            if (!ModelState.IsValid)
            {
                return View(book); // Re-show the form with validation errors
            }

            book.Id = nextId++;
            Books.Add(book);
            return RedirectToAction("Read");
        }


        // GET: Read list with filtering
        public IActionResult Read(string searchTerm, string genreFilter, string statusFilter)
        {
            var filteredBooks = Books.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                filteredBooks = filteredBooks.Where(b =>
                    b.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    b.Author.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(genreFilter))
            {
                filteredBooks = filteredBooks.Where(b =>
                    b.Genre.Equals(genreFilter, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(statusFilter))
            {
                filteredBooks = filteredBooks.Where(b =>
                    b.Availability.Equals(statusFilter, StringComparison.OrdinalIgnoreCase));
            }

            return View(filteredBooks.ToList());
        }

        // GET: Delete page
        public IActionResult Delete()
        {
            ViewBag.BooksList = Books;
            return View();
        }

        // POST: Confirm deletion
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book != null)
            {
                Books.Remove(book);
            }
            return RedirectToAction("Read");
        }

        // GET: Update page
        public IActionResult Update()
        {
            ViewBag.BooksList = Books;
            return View(new Book());
        }

        // POST: Update a book
        [HttpPost]
        public IActionResult Update(Book updatedBook)
        {
            var book = Books.FirstOrDefault(b => b.Id == updatedBook.Id);
            if (book != null)
            {
                book.Title = updatedBook.Title;
                book.Author = updatedBook.Author;
                book.Genre = updatedBook.Genre;
                book.Condition = updatedBook.Condition;
                book.Description = updatedBook.Description;
                book.UserName = updatedBook.UserName;
                book.Location = updatedBook.Location;
                book.Phone = updatedBook.Phone;
                book.Availability = updatedBook.Availability;
            }
            return RedirectToAction("Read");
        }

        // POST: Checkout (borrow) a book
        [HttpPost]
        public IActionResult Checkout([FromBody] CheckoutRequest request)
        {
            var book = Books.FirstOrDefault(b => b.Id == request.BookId);
            if (book == null)
            {
                return Json(new { success = false, message = "Book not found." });
            }

            if (book.Availability == "Checked Out" || book.Availability == "Borrowed")
            {
                return Json(new { success = false, message = "Book is already borrowed." });
            }

            book.Availability = "Borrowed";
            return Json(new { success = true });
        }
        // Charts

        public IActionResult Charts()
        {
            var books = Books; // however you're fetching book data

            var genreGroups = books.GroupBy(b => b.Genre).ToList();
            var conditionGroups = books.GroupBy(b => b.Condition).ToList();
            var availabilityGroups = books.GroupBy(b => b.Availability).ToList();

            ViewBag.GenreLabelsJson = JsonSerializer.Serialize(genreGroups.Select(g => g.Key).ToList());
            ViewBag.GenreCountsJson = JsonSerializer.Serialize(genreGroups.Select(g => g.Count()).ToList());

            ViewBag.ConditionLabelsJson = JsonSerializer.Serialize(conditionGroups.Select(g => g.Key).ToList());
            ViewBag.ConditionCountsJson = JsonSerializer.Serialize(conditionGroups.Select(g => g.Count()).ToList());

            ViewBag.AvailabilityLabelsJson = JsonSerializer.Serialize(availabilityGroups.Select(g => g.Key).ToList());
            ViewBag.AvailabilityCountsJson = JsonSerializer.Serialize(availabilityGroups.Select(g => g.Count()).ToList());

            return View();
        }

    }

    // Helper class for checkout request
    public class CheckoutRequest
    {
        public int BookId { get; set; }
    }

    
}




