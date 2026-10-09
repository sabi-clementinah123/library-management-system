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

  const [adminAccess, setAdminAccess] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminPassword === "admin123") {
      setAdminAccess(true);
      setAdminPassword("");
      alert("Admin access granted.");
    } else {
      alert("Incorrect admin password.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !membershipId || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId !== null) {
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

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setMembershipId(user.membershipId);
    setRole(user.role);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setName("");
    setMembershipId("");
    setRole("Member");
  };

  return (
    <div>
      <h1>User Management</h1>

      {!adminAccess ? (
        <div>
          <h2>Admin Login</h2>

          <form onSubmit={handleAdminLogin}>
            <label>Admin Password:</label>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
            />

            <button type="submit">
              Login as Admin
            </button>
          </form>

          <p>
            Only administrators can add, update, and delete users.
          </p>
        </div>
      ) : (
        <div>
          <h2>Admin View</h2>

          <p>
            You are logged in as an Administrator.
          </p>

          <button onClick={() => setAdminAccess(false)}>
            Logout
          </button>

          <hr />

          <h2>
            {editingId !== null ? "Update User" : "Add New User"}
          </h2>

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
      )}
    </div>
  );
}

export default UserManagement;

