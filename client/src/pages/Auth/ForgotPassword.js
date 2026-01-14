import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  

    //from submit
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', { 
        email,
        newPassword,
        answer, 
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        
        
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Login failed');
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
    <Layout>
       <div className="forgot-password-page">
     <div className="forgot-password - Emad Telecom ">
        <h1 className="text-center mb-4 text-danger ">RESET PASSWORD</h1>

        <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        
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

           <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your favorite sport name"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>


        <div className="mb-3 password-wrapper">
         <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter Your New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "🙈" : "👁️"}
       </span>
      </div>

 
          <button type="submit" className="btn btn-primary w-100">
            Reset
          </button>
        </form>
      </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword