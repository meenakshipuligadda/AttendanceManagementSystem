import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load users when page opens
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (name === "") {
      setError("Name is required");
      return;
    }

    if (email === "") {
      setError("Email is required");
      return;
    }

    if (mobile === "") {
      setError("Mobile Number is required");
      return;
    }

    setError("");

    try {
      await axios.post("http://localhost:3001/api/users", {
        name,
        email,
        mobile,
      });

      alert("User Registered Successfully!");

      setName("");
      setEmail("");
      setMobile("");

      // Refresh user list
      fetchUsers();

    } catch (error) {
      console.error(error);
      alert("Failed to Register User");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>AMS</h1>
        <h3>Attendance Management System</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Register
        </button>

        <hr />

        <h2>Registered Users</h2>

        <table
          border={1}
          cellPadding={8}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Login;