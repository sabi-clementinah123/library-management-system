import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [membershipId, setMembershipId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!membershipId) {
      setMessage("Please enter your Membership ID.");
      return;
    }

    const savedUsers = localStorage.getItem("users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const user = users.find(
      (user) => user.membershipId === membershipId
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      setMessage(`Welcome, ${user.name}!`);

      // Go to Dashboard after login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage("User not found. Please check your Membership ID.");
    }
  };

  return (
    <div>
      <h1>Library Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Membership ID:</label>

          <input
            type="text"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            placeholder="Enter Membership ID"
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;