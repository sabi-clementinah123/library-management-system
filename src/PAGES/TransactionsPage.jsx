import { useEffect, useState } from "react";

function TransactionsPage() {
  const [books, setBooks] = useState(() => {
  const savedBooks = localStorage.getItem("books");
 return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [transactions, setTransactions] = useState(() => {
     const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [selectedBook, setSelectedBook] = useState("");
  const [type, setType] = useState("Borrow");
  const [quantity, setQuantity] = useState("");

  // Save books whenever they change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const handleTransaction = (e) => {
    e.preventDefault();

    if (!selectedBook || quantity === "") {
      alert("Please select a book and enter a quantity.");
      return;
    }

    const transactionQuantity = Number(quantity);

    if (transactionQuantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    const book = books.find(
      (book) => book.id === Number(selectedBook)
    );

    if (!book) {
      alert("Book not found.");
      return;
    }

    // Borrow a book
    if (type === "Borrow") {
      if (transactionQuantity > book.quantity) {
        alert("There are not enough books available.");
        return;
      }

      setBooks(
        books.map((book) =>
          book.id === Number(selectedBook)
            ? {
                ...book,
                quantity: book.quantity - transactionQuantity,
              }
            : book
        )
      );
    }

    // Add stock
    if (type === "Add Stock") {
      setBooks(
        books.map((book) =>
          book.id === Number(selectedBook)
            ? {
                ...book,
                quantity: book.quantity + transactionQuantity,
              }
            : book
        )
      );
    }

    // Save transaction history
    const newTransaction = {
      id: Date.now(),
      bookTitle: book.title,
      type: type,
      quantity: transactionQuantity,
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);

    alert("Transaction completed successfully.");

    setSelectedBook("");
    setQuantity("");
  };

  return (
    <div>
      <h1>Transactions</h1>

      <form onSubmit={handleTransaction}>
        <div>
          <label>Select Book:</label>

          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value=""> Select a Book </option>

            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} - Available: {book.quantity}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Transaction Type:</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Borrow">Borrow</option>
            <option value="Add Stock">Add Stock</option>
          </select>
        </div>

        <br />

        <div>
          <label>Quantity:</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <br />

        <button type="submit">
          Complete Transaction
        </button>
      </form>

      <hr />

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions have been recorded yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Book</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.bookTitle}</td>
                <td>{transaction.type}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionsPage;