import { useEffect, useState } from "react";

function BookManagement() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Save books to Local Storage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Add or update a book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !isbn || quantity === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    if (editingId !== null) {
      // Update existing book
      setBooks(
        books.map((book) =>
          book.id === editingId
            ? {
                ...book,
                title,
                author,
                genre,
                isbn,
                quantity: Number(quantity),
              }
            : book
        )
      );

      alert("Book updated successfully.");
    } else {
      // Add new book
      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        isbn,
        quantity: Number(quantity),
      };

      setBooks([...books, newBook]);

      alert("Book added successfully.");
    }

    clearForm();
  };

  // Delete a book
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  // Edit a book
  const handleEdit = (book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQuantity(book.quantity);
  };

  // Clear the form
  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
    setEditingId(null);
  };

  return (
    <div>
      <h1>Book Management</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author"
          />
        </div>

        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
          />
        </div>

        <div>
          <label>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
          />
        </div>

        <div>
          <label>Initial Quantity:</label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <button type="submit">
      {editingId !== null ? "Update Book" : "Add Book"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>

                <td>
                  <button onClick={() => handleEdit(book)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookManagement;