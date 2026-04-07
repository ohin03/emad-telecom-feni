import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (auth?.user) {
            setName(auth.user.name || "");
            setEmail(auth.user.email || "");
            setPhone(auth.user.phone || "");
            setAddress(auth.user.address || "");
        }
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', {
                name, email, password, phone, address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data.updatedUser });
                let ls = JSON.parse(localStorage.getItem("auth"));
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success('Profile updated successfully');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={"Your Profile"}>
            <div className='profile-ultra-wrapper'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-3 mb-4'>
                            <div className="profile-sidebar-card">
                                <UserMenu />
                            </div>
                        </div>
                        <div className='col-lg-9'>
                            <div className='profile-main-card'>
                                {/* Top Banner Design */}
                                <div className="profile-banner">
                                    <div className="profile-avatar-wrapper">
                                        <div className="profile-avatar-main">
                                            {name ? name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-header">
                                    <h3>Personal Details</h3>
                                    <p>Manage your identity and account security</p>
                                </div>

                                <form onSubmit={handleSubmit} className="modern-form-grid">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="form-floating-custom">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder=" "
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <label htmlFor="name"><i className="fa-regular fa-user"></i> Full Name</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating-custom disabled">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    disabled
                                                    placeholder=" "
                                                />
                                                <label htmlFor="email"><i className="fa-regular fa-envelope"></i> Email Address</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating-custom">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    placeholder=" "
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <label htmlFor="phone"><i className="fa-solid fa-phone-flip"></i> Phone Number</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating-custom password-field">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="pass"
                                                    placeholder=" "
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <label htmlFor="pass"><i className="fa-solid fa-shield-halved"></i> Security Code</label>
                                                <button 
                                                    type="button" 
                                                    className="pass-toggler" 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating-custom">
                                                <textarea
                                                    id="addr"
                                                    placeholder=" "
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                ></textarea>
                                                <label htmlFor="addr"><i className="fa-solid fa-map-location-dot"></i> Your Address</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions mt-5">
                                        <button type="submit" className="btn-save-changes btn-primary">
                                            Update Profile <i className="fa-solid fa-circle-check ms-2"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;