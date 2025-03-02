// Task 1: Creating a Book Class
class Book {
    constructor(title, author, isbn, copies) {
        this.title = title; // Title of the book
        this.author = author; // Author of the book
        this.isbn = isbn; // Unique ISBN number
        this.copies = copies; // Number of copies available
    }

    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`; // Returns formatted book details
    }

    updateCopies(quantity) {
        this.copies += quantity; // Updates the number of copies available
    }
}

// Test cases for Task 1
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5); // Creating a book instance
console.log(book1.getDetails()); // Display book details
book1.updateCopies(-1); // Borrowing a book (reducing copies by 1)
console.log(book1.getDetails()); // Display updated book details

// Task 2: Creating a Borrower Class
class Borrower {
    constructor(name, borrowerId) {
        this.name = name; // Name of the borrower
        this.borrowerId = borrowerId; // Unique ID of the borrower
        this.borrowedBooks = []; // Array to track borrowed books
    }

    borrowBook(bookTitle) {
        this.borrowedBooks.push(bookTitle); // Adds a book to borrowed books list
    }

    returnBook(bookTitle) {
        this.borrowedBooks = this.borrowedBooks.filter(title => title !== bookTitle); // Removes returned book from borrowed list
    }
}

// Test cases for Task 2
const borrower1 = new Borrower("Alice Johnson", 201); // Creating a borrower instance
borrower1.borrowBook("The Great Gatsby"); // Borrowing a book
console.log(borrower1.borrowedBooks); // Display borrowed books
borrower1.returnBook("The Great Gatsby"); // Returning a book
console.log(borrower1.borrowedBooks); // Display updated borrowed books list

// Task 3: Creating a Library Class
class Library {
    constructor() {
        this.books = []; // Array to store book instances
        this.borrowers = []; // Array to store borrower instances
    }

    addBook(book) {
        this.books.push(book); // Adds a book to the library collection
    }

    listBooks() {
        this.books.forEach(book => console.log(book.getDetails())); // Displays details of all books in library
    }

    addBorrower(borrower) {
        this.borrowers.push(borrower); // Adds a borrower to the library system
    }
}

// Test cases for Task 3
const library = new Library(); // Creating a library instance
library.addBook(book1); // Adding a book to the library
library.listBooks(); // Listing all books in the library
library.addBorrower(borrower1); // Adding a borrower to the library

// Task 4: Implementing Book Borrowing
Library.prototype.lendBook = function(borrowerId, isbn) {
    const book = this.books.find(b => b.isbn === isbn); // Find the book by ISBN
    const borrower = this.borrowers.find(b => b.borrowerId === borrowerId); // Find the borrower by ID
    
    if (book && book.copies > 0 && borrower) {
        book.updateCopies(-1); // Reduce the book copies by 1
        borrower.borrowBook(book.title); // Add book to borrower's borrowed books list
    } else {
        console.log("Book unavailable or borrower not found."); // Display error if book not available or borrower not found
    }
};

// Test cases for Task 4
library.lendBook(201, 123456); // Borrowing a book from the library
console.log(book1.getDetails()); // Display updated book details
console.log(borrower1.borrowedBooks); // Display borrower's borrowed books list

// Task 5: Implementing Book Returns
Library.prototype.returnBook = function(borrowerId, isbn) {
    const book = this.books.find(b => b.isbn === isbn); // Find the book by ISBN
    const borrower = this.borrowers.find(b => b.borrowerId === borrowerId); // Find the borrower by ID
    
    if (book && borrower && borrower.borrowedBooks.includes(book.title)) {
        book.updateCopies(1); // Increase the book copies by 1
        borrower.returnBook(book.title); // Remove book from borrower's borrowed books list
    } else {
        console.log("Invalid return attempt."); // Display error if return is invalid
    }
};

// Test cases for Task 5
library.returnBook(201, 123456); // Returning a borrowed book
console.log(book1.getDetails()); // Display updated book details
console.log(borrower1.borrowedBooks); // Display borrower's updated borrowed books list