import "./PAGES/style.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./PAGES/Dashboard";
import Login from "./PAGES/LoginPage";
import BookManagement from "./PAGES/BookManagement";
import Transactions from "./PAGES/TransactionsPage";
import UserManagement from "./PAGES/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation bar */}
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/books">Book Management</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/users">User Management</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BookManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;