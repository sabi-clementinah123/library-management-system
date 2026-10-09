import { useEffect, useState } from "react";

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = () => {
      const savedBooks = localStorage.getItem("books");

      if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
      } else {
        setBooks([]);
      }
    };

    loadBooks();
  }, []);

  const totalTitles = books.length;

  const totalCopies = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  );

  const lowStockBooks = books.filter(
    (book) => Number(book.quantity) < 2
  );

  return (
    <div className="dashboard-page">

      {/* Welcome Section */}
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-label">COMMUNITY LIBRARY</p>

          <h1>Library Management Dashboard</h1>

          <p className="dashboard-description">
            Manage books, track availability and monitor your
            community library from one place.
          </p>
        </div>

        <div className="hero-book-icon">
          📚
        </div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">📚</div>

          <div>
            <p>Total Book Titles</p>
            <h2>{totalTitles}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📖</div>

          <div>
            <p>Available Copies</p>
            <h2>{totalCopies}</h2>
          </div>
        </div>

        <div className="stat-card low-stock-card">
          <div className="stat-icon">⚠️</div>

          <div>
            <p>Low Stock Books</p>
            <h2>{lowStockBooks.length}</h2>
          </div>
        </div>

      </section>

      {/* Availability */}
      <section className="dashboard-section">

        <div className="section-heading">
          <div>
            <p className="section-label">INVENTORY</p>
            <h2>Book Availability</h2>
          </div>

          <span className="book-count">
            {books.length} title{books.length !== 1 ? "s" : ""}
          </span>
        </div>

        {books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>

            <h3>No books available</h3>

            <p>
              Add your first book from the Book Management page.
            </p>
          </div>
        ) : (
          <div className="availability-table-wrapper">
            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => {
                  const quantity = Number(book.quantity);
                  const isLowStock = quantity < 2;

                  return (
                    <tr key={book.id}>

                      <td>
                        <div className="book-name">
                          <span className="small-book-icon">
                            📖
                          </span>

                          <strong>{book.title}</strong>
                        </div>
                      </td>

                      <td>{book.author}</td>

                      <td>
                        <span className="genre-badge">
                          {book.genre}
                        </span>
                      </td>

                      <td>{book.isbn}</td>

                      <td>
                        <strong>{quantity}</strong>
                      </td>

                      <td>
                        {isLowStock ? (
                          <span className="status low">
                            ⚠ Low Stock
                          </span>
                        ) : (
                          <span className="status available">
                            ✓ Available
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </section>

      {/* Low Stock Section */}
      <section className="dashboard-section">

        <div className="section-heading">
          <div>
            <p className="section-label">ATTENTION</p>
            <h2>Low Stock Alert</h2>
          </div>
        </div>

        {lowStockBooks.length === 0 ? (
          <div className="success-message">
            <span>✓</span>

            <div>
              <strong>Inventory looks good!</strong>

              <p>
                There are currently no books below the minimum
                stock level.
              </p>
            </div>
          </div>
        ) : (
          <div className="low-stock-list">

            {lowStockBooks.map((book) => (
              <div className="low-stock-item" key={book.id}>

                <div className="low-book-icon">
                  ⚠
                </div>

                <div className="low-book-info">
                  <strong>{book.title}</strong>

                  <p>
                    Only {book.quantity} cop
                    {Number(book.quantity) === 1 ? "y" : "ies"} available
                  </p>
                </div>

                <span className="restock-label">
                  Needs Restocking
                </span>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Dashboard;