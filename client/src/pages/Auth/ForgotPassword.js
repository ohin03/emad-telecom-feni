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
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
                toast.error(res.data.message || 'Reset failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Layout title="Reset Password - Emad Telecom">
            <div className="forgot-ultra-container">
                <div className="forgot-glass-card">
                    <div className="forgot-header text-center">
                        <div className="reset-icon">🛡️</div>
                        <h2 className='text-success'>Reset Password</h2>
                        <p className="text-muted ">Verify your identity to secure your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="forgot-form mt-4">
                        <div className="premium-field">
                            <label className='text-black'>Registered Email</label>
                            <div className="input-group-premium">
                                <span className="field-icon">📧</span>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="premium-field mt-3">
                            <label className='text-black'>Security Question</label>
                            <div className="input-group-premium">
                                <span className="field-icon">⚽</span>
                                <input
                                    type="text"
                                    placeholder="Your favorite sport name?"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="premium-field mt-3">
                            <label className='text-black'>New Secure Password</label>
                            <div className="input-group-premium">
                                <span className="field-icon">🔑</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span className="eye-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="btn-reset-premium mt-4">
                            Update Password
                        </button>

                        <div className="text-center mt-4">
                            <span className="back-login-btn" onClick={() => navigate('/login')}>
                                ← Back to Login
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;