import { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [role, setRole] = useState("Member");

  const [editingId, setEditingId] = useState(null);

  // Save users to Local Storage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add or update a user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !membershipId || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId !== null) {
      // Update user
      setUsers(
        users.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name,
                membershipId,
                role,
              }
            : user
        )
      );

      alert("User updated successfully.");
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        name,
        membershipId,
        role,
      };

      setUsers([...users, newUser]);

      alert("User added successfully.");
    }

    clearForm();
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setMembershipId(user.membershipId);
    setRole(user.role);
  };

  // Delete user
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Clear form
  const clearForm = () => {
    setEditingId(null);
    setName("");
    setMembershipId("");
    setRole("Member");
  };

  return (
    <div>
      <h1>User Management</h1>

      <h2>{editingId !== null ? "Update User" : "Add New User"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user's name"
          />
        </div>

        <br />

        <div>
          <label>Membership ID:</label>
          <input
            type="text"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            placeholder="Enter membership ID"
          />
        </div>

        <br />

        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Librarian">Librarian</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <br />

        <button type="submit">
          {editingId !== null ? "Update User" : "Add User"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users have been added yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.membershipId}</td>
                <td>{user.role}</td>

                <td>
                  <button onClick={() => handleEdit(user)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(user.id)}>
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

export default UserManagement;