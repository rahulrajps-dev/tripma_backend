import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ imported!

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // ✅ handleChange is back!
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",  // ✅ http not https
        formData,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");  // ✅ redirect after register
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);  // ✅ show error
    }
  };

  return(
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>  {/* ✅ form with onSubmit */}
        <input
          name="name"           // ✅ connected to state
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"          // ✅ connected to state
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"       // ✅ connected to state
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default Register;