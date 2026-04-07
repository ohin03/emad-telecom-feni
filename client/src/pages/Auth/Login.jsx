import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Layout title="Login - Emad Telecom">
            <div className="login-ultra-wrapper">
                <div className="login-glass-box">
                    <div className="login-header text-center">
                        <div className="login-icon">🔐</div>
                        <h2 className='text-primary'>Login</h2>
                        <p className='text-danger'>Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="premium-input-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <span className="icon">📧</span>
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="premium-input-group mt-3">
                            <div className="d-flex justify-content-between">
                                <label>Password</label>
                                <span 
                                    className="forgot-link" 
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Forgot Password?
                                </span>
                            </div>
                            <div className="input-with-icon">
                                <span className="icon">🔑</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="login-submit-btn mt-4">
                            Sign In
                        </button>
                    </form>

                    <div className="login-footer text-center mt-4">
                        <p>Don't have an account? <span onClick={() => navigate('/register')}>Create One</span></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;