import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Register.css';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [auth, setAuth] = useAuth();   
    const location = useLocation();
    //from submit
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { 
        email,
        password,  
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
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
    <div>
      <Layout title="Register - Emad Telecom">
      <div className=" register-page ">
        <h1 className="text-center mb-4">Login</h1>

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


      <div className='mb-3'>
        <button type="button" className="btn btn-primary w-100" onClick={() => (navigate('/forgot-password'))}>
            Forgot Password
          </button>
      </div>
 
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </Layout>
    </div>
  )
}

export default Login
