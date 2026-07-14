type Employee = {
  id: number;
  name: string;
  email: string;
  mobile: string;
};

type EmployeeTableProps = {
  users: Employee[];
  search: string;
};

function EmployeeTable({ users, search }: EmployeeTableProps) {
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.mobile.includes(search)
    );
  });

  return (
    <div className="table-card">
      <h2>Registered Employees ({filteredUsers.length})</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;