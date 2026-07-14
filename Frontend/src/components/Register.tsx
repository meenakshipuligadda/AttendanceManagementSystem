import { useState, useEffect } from "react";
import axios from "axios";
import TeamImage from "../assets/team.svg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
      if (editId !== null) {
        await axios.put(`http://localhost:3001/api/users/${editId}`, {
          name,
          email,
          mobile,
        });
        alert("Employee Updated Successfully!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:3001/api/users", {
          name,
          email,
          mobile,
        });
        alert("Employee Registered Successfully!");
      }

      setName("");
      setEmail("");
      setMobile("");

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">

      <div className="main-card">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <img
            src={TeamImage}
            alt="Team Illustration"
            className="team-image"
          />

          <h1>Attendance Management System</h1>

          <p>
            Manage employees effortlessly with a clean and modern attendance
            management portal.
          </p>

          <div className="feature-box">

            <div>✔ Employee Registration</div>

            <div>✔ Secure Database</div>

            <div>✔ Fast Access</div>

            <div>✔ Easy Management</div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <div className="form-card">

        <h2>{editId !== null ? "Update Employee" : "Register Employee"}</h2>

            <p className="subtitle">
              Fill in employee information below
            </p>

            {error && <p className="error">{error}</p>}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
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
              {editId !== null ? "Update Employee" : "Register Employee"}
            </button>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-card">

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <h2>Registered Employees ({users.length})</h2>

    <input
      type="text"
      placeholder="🔍 Search Employee"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "280px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        outline: "none",
      }}
    />
  </div>

  <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Mobile</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>
  {users
    .filter((user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.mobile.includes(search)
    )
    .map((user: any) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>
          <button
            onClick={() => {
              setEditId(user.id);
              setName(user.name);
              setEmail(user.email);
              setMobile(user.mobile);
            }}
            style={{marginRight:"8px"}}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => handleDelete(user.id)}
          >
            🗑️ Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>

      </div>

    </div>
  );
}

export default Register;