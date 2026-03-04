import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Phone, Mail, IdCard, MapPin, Briefcase, Camera, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        nationalId: '',
        dob: '',
        gender: '',
        location: '',
        role: 'Member',
        occupation: '',
        nextOfKinName: '',
        nextOfKinPhone: '',
        parentGuardianName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                    style={{ width: '100%', maxWidth: '800px', padding: '50px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-gold)' }}>Clan Registration</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Fill in your details to join the Bnyikwa Clan Digital Platform.</p>
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(255, 71, 87, 0.1)', border: '1px solid #ff4757', color: '#ff4757', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', gridColumn: '1 / -1' }}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
                        {/* Column 1: Personal Identity */}
                        <div className="form-column">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="fullName" onChange={handleChange} placeholder="Elder John Doe" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Parent or Guardian's Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <Shield size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="parentGuardianName" onChange={handleChange} placeholder="Protector's Name" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="email" type="email" onChange={handleChange} placeholder="alex@example.com" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="phone" onChange={handleChange} placeholder="+254 7..." style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>National ID</label>
                                    <div style={{ position: 'relative' }}>
                                        <IdCard size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                        <input name="nationalId" onChange={handleChange} placeholder="12345678" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Date of Birth</label>
                                    <input name="dob" type="date" onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Clan & Next of Kin */}
                        <div className="form-column">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current Location</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="location" onChange={handleChange} placeholder="City, County" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gender</label>
                                    <select name="gender" onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Occupation</label>
                                    <input name="occupation" onChange={handleChange} placeholder="Job/Trade" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(212, 175, 55, 0.03)', borderRadius: '12px', border: '1px dashed var(--accent-gold-glow)' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '10px', fontWeight: 600 }}>NEXT OF KIN INFORMATION</p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input name="nextOfKinName" onChange={handleChange} placeholder="Full Name" style={{ flex: 1.5, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', fontSize: '0.9rem' }} required />
                                    <input name="nextOfKinPhone" onChange={handleChange} placeholder="Phone" style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', fontSize: '0.9rem' }} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Set Portal Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--accent-gold)' }} />
                                    <input name="password" type="password" onChange={handleChange} placeholder="••••••••" style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                            </div>
                        </div>

                        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--glass-border)', paddingTop: '30px', marginTop: '10px' }}>
                            <button type="submit" className="glow-btn" disabled={loading} style={{ width: '100%', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', height: '55px' }}>
                                {loading ? 'Submitting Application...' : 'Apply for Clan Membership'} {!loading && <ArrowRight size={20} />}
                            </button>
                            <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Shield size={14} color="var(--accent-gold)" /> 256-bit Secure Enrollment
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
