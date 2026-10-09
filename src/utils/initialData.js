export const DEFAULT_BOOKS = [
  {
    id: "b-101",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    isbn: "978-0061120084",
    quantity: 4,
    addedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "b-102",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "978-0451524935",
    quantity: 1, // Low stock example (< 2)
    addedAt: "2026-09-05T11:30:00Z"
  },
  {
    id: "b-103",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    genre: "Technology",
    isbn: "978-0132350884",
    quantity: 3,
    addedAt: "2026-09-10T14:20:00Z"
  },
  {
    id: "b-104",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    isbn: "978-0743273565",
    quantity: 0, // Out of stock example (< 2)
    addedAt: "2026-09-12T09:15:00Z"
  },
  {
    id: "b-105",
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    genre: "Technology",
    isbn: "978-0078022159",
    quantity: 5,
    addedAt: "2026-09-15T16:00:00Z"
  },
  {
    id: "b-106",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    genre: "Technology",
    isbn: "978-0262033848",
    quantity: 1, // Low stock example
    addedAt: "2026-09-18T13:45:00Z"
  }
];

export const DEFAULT_USERS = [

  {
    id: "u-103",
    name: "Bonolo",
    membershipId: "Lib1",
    role: "Member",
    email: "Bonolo",
    joinedDate: "2026-09-01"
  },
  {
    id: "u-104",
    name: "Thapelo",
    membershipId: "Lib2",
    role: "Member",
    email: "Thapelo@gmail",
    joinedDate: "2026-09-05"
  }
];

export const DEFAULT_TRANSACTIONS = [
  {
    id: "tx-501",
    bookId: "b-101",
    bookTitle: "To Kill a Mockingbird",
    type: "DEDUCT", // Borrowed
    quantity: 1,
    date: "2026-09-25T14:30:00Z",
    performedBy: "Lerato(Librarian)",
    notes: "Borrowed by Boitumelo"
  },
  {
    id: "tx-502",
    bookId: "b-105",
    bookTitle: "Database System Concepts",
    type: "ADD", // Restocked
    quantity: 2,
    date: "2026-09-26 10:00",
    performedBy: "Lauren (Admin)",
    notes: "New shipment received"
  },
  {
    id: "tx-503",
    bookId: "b-104",
    bookTitle: "The crooked path",
    type: "DEDUCT",
    quantity: 2,
    date: "2026-09-28 11:00",
    performedBy: "Lillian(Librarian)",
    notes: "Borrowed by Lillian"
  }
];
