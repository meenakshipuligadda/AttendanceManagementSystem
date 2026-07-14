type EmployeeFormProps = {
  name: string;
  email: string;
  mobile: string;
  error: string;

  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setMobile: React.Dispatch<React.SetStateAction<string>>;

  handleSubmit: () => void;
};

function EmployeeForm({
  name,
  email,
  mobile,
  error,
  setName,
  setEmail,
  setMobile,
  handleSubmit,
}: EmployeeFormProps) {
  return (
    <div className="form-card">

      <h2>Register Employee</h2>

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
        Register Employee
      </button>

    </div>
  );
}

export default EmployeeForm;