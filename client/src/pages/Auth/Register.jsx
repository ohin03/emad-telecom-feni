import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Register.css';




const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
   const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      // Show backend-provided message when available, otherwise a helpful network message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.request && !error.response) {
        toast.error('Cannot connect to backend. Start the server at http://localhost:8080');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    }
    
  };


  return (
    <Layout title="Register - Emad Telecom">
      <div className=" register-page ">
        <h1 className="text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>




        <div className="mb-3 password-wrapper">
         <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "🙈" : "👁️"}
       </span>
      </div>

        
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

           <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="What is you favorite sports?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

