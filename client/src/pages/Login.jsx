import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../store/adminThunk";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const [form, setForm] = useState({ username: "sagar", password: "1" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   const res= await dispatch(adminLogin(form))
   console.log(res);
   
if(!res.payload) return alert("invalid credentials")
     navigate('/taskboard')
   
   
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} 
    id="form"
    >
      <div>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
