import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '', // Phone or ID
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('member', JSON.stringify(res.data.member));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--primary-bg)', overflowX: 'hidden' }}>
            <Navbar />
            <div style={{ padding: '150px 20px 100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass"
                    style={{ width: '100%', maxWidth: '450px', padding: '50px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <img src={logo} alt="Logo" style={{ width: '64px', height: '64px', objectFit: 'contain', marginBottom: '20px', borderRadius: '16px' }} />
                        <h2 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>Member Login</h2>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Enter your clan credentials to access the portal.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ background: 'rgba(255, 71, 87, 0.1)', border: '1px solid #ff4757', color: '#ff4757', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                            <AlertCircle size={18} /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone Number or National ID</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                <input
                                    name="identifier"
                                    onChange={handleChange}
                                    placeholder="07... or ID Number"
                                    style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', outline: 'none' }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Secret Code (Password)</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', outline: 'none' }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="glow-btn"
                            disabled={loading}
                            style={{ width: '100%', fontSize: '1.1rem', padding: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                        >
                            {loading ? 'Authenticating...' : 'Enter Portal'} {!loading && <ArrowRight size={18} />}
                        </button>

                        <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Not a member yet? <Link to="/register" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>Join the Clan</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
