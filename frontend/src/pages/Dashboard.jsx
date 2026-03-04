import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Wallet,
    Bell,
    Settings,
    LogOut,
    User,
    Shield,
    TrendingUp,
    Clock,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

const Dashboard = () => {
    const [member, setMember] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({ location: '', occupation: '' });
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMember = JSON.parse(localStorage.getItem('member'));
        if (!storedMember) {
            navigate('/login');
            return;
        }
        setMember(storedMember);
        setUpdateData({ location: storedMember.location, occupation: storedMember.occupation });

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('member');
        navigate('/login');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await axios.put(`/api/auth/profile/${member.id}`, updateData);
            const updatedMember = response.data.member;
            setMember(updatedMember);
            localStorage.setItem('member', JSON.stringify(updatedMember));
            setShowUpdateModal(false);
            alert('Profile updated successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Update failed');
        } finally {
            setUpdating(false);
        }
    };

    if (!member) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
            {/* Sidebar - Advanced Glass */}
            <aside className="glass" style={{ width: '280px', margin: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'column', padding: '40px 30px', border: '1px solid var(--glass-border)', background: 'rgba(15, 23, 42, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px' }}>
                    <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '12px' }} />

                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
                        { icon: <Users size={20} />, label: 'Clan Tree' },
                        { icon: <Wallet size={20} />, label: 'Welfare' },
                        { icon: <Calendar size={20} />, label: 'Events' },
                        { icon: <Bell size={20} />, label: 'Updates' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '14px 20px',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                background: item.active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                color: item.active ? 'var(--accent-gold)' : 'var(--text-secondary)',
                                border: item.active ? '1px solid var(--accent-gold-glow)' : '1px solid transparent',
                                transition: '0.3s'
                            }}
                        >
                            {item.icon}
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</span>
                        </motion.div>
                    ))}
                </nav>

                <div
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 20px', borderRadius: '16px', cursor: 'pointer', color: '#ff4757', marginTop: 'auto', background: 'rgba(255, 71, 87, 0.05)' }}
                >
                    <LogOut size={20} />
                    <span style={{ fontWeight: 600 }}>Sign Out</span>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px 40px 40px 0', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px' }}>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ fontSize: '2.5rem', marginBottom: '8px' }}
                        >
                            Habari, <span style={{ color: 'var(--accent-gold)' }}>{member.fullName.split(' ')[0]}</span>
                        </motion.h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-secondary)' }}>
                            <span className="glass" style={{ padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)' }}>{member.id}</span>
                            <span style={{ fontSize: '0.9rem' }}>•</span>
                            <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {currentTime.toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>{member.fullName}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{member.role}</p>
                        </div>
                        <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--accent-gold), #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={24} color="var(--primary-bg)" />
                        </div>
                    </div>
                </header>

                {/* Bento Grid Stats */}
                <div className="bento-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gridAutoRows: 'minmax(180px, auto)',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    {/* Large Card: Balance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass glass-card"
                        style={{ gridColumn: 'span 2', gridRow: 'span 2', padding: '40px', background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <Shield color="var(--accent-gold)" size={28} />
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Lineage & Identity</p>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{member.fullName}</h2>
                            <p style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Guardian: {member.parentGuardianName}</p>
                            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.85rem' }}>
                                <div><span style={{ color: 'var(--text-secondary)' }}>ID:</span> {member.nationalId}</div>
                                <div><span style={{ color: 'var(--text-secondary)' }}>Born:</span> {new Date(member.dob).toLocaleDateString()}</div>
                                <div><span style={{ color: 'var(--text-secondary)' }}>Home:</span> {member.location}</div>
                                <div><span style={{ color: 'var(--text-secondary)' }}>Job:</span> {member.occupation}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <button className="glow-btn" style={{ flex: 1.5, height: '50px' }}>Contribute Now</button>
                            <button className="glass" style={{ flex: 1, padding: '12px', color: 'white', cursor: 'pointer', border: '1px solid var(--glass-border)' }}>View Audit</button>
                        </div>
                    </motion.div>

                    {/* Medium Card: Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass glass-card" style={{ gridColumn: 'span 2', padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}
                    >
                        <div style={{ background: 'rgba(52, 152, 219, 0.1)', padding: '15px', borderRadius: '15px' }}>
                            <Calendar color="#3498db" size={28} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>NEXT CLAN MEETING</p>
                            <h3 style={{ fontSize: '1.6rem', margin: '5px 0' }}>March 15, 2026</h3>
                            <p style={{ color: '#3498db', fontSize: '0.8rem', margin: 0 }}>📍 Nairobi Central Hall</p>
                        </div>
                        <ArrowRight style={{ color: 'var(--text-secondary)' }} />
                    </motion.div>

                    {/* Small Card: Members */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass glass-card" style={{ padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Users color="var(--accent-gold)" size={32} style={{ marginBottom: '10px' }} />
                        <h3 style={{ fontSize: '2.2rem', margin: 0 }}>1,248</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '5px 0 0' }}>Verified Members</p>
                    </motion.div>

                    {/* Small Card: Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass glass-card" style={{ padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <div style={{ position: 'relative' }}>
                            <Shield color="#2ecc71" size={32} style={{ marginBottom: '10px' }} />
                            <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', background: '#2ecc71', borderRadius: '50%', border: '2px solid var(--primary-bg)' }} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', color: '#2ecc71', margin: 0 }}>Active</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '5px 0 0' }}>Account Status</p>
                    </motion.div>
                </div>

                {/* Bottom Sections */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
                    <section className="glass" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h3 style={{ fontSize: '1.3rem' }}>Recent Activity</h3>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>See All Activity</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {[
                                { title: 'Monthly Welfare Fund', time: '2h ago', amount: '+ Kes 1,000', type: 'positive' },
                                { title: 'Education Grant Payout', time: 'Yesterday', amount: '- Kes 50,000', type: 'negative' },
                                { title: 'New Member: Otieno Baba', time: '2 days ago', status: 'Approved', type: 'neutral' },
                            ].map((activity, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid transparent', transition: '0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                                >
                                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}>
                                        <Clock size={18} color="var(--text-secondary)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 500, fontSize: '0.95rem', margin: 0 }}>{activity.title}</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>{activity.time}</p>
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: activity.type === 'positive' ? '#2ed573' : activity.type === 'negative' ? '#ff4757' : 'var(--accent-gold)' }}>
                                        {activity.amount || activity.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <section className="glass" style={{ padding: '30px', background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, rgba(10, 25, 47, 0) 100%)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Portal Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button className="glow-btn" style={{ width: '100%' }}>Secure Contribution</button>
                            <button className="glass" style={{ width: '100%', padding: '12px', cursor: 'pointer', color: 'white', border: '1px solid var(--glass-border)' }}>Apply for Welfare</button>
                            <button onClick={() => setShowUpdateModal(true)} className="glass" style={{ width: '100%', padding: '12px', cursor: 'pointer', color: 'white', border: '1px solid var(--glass-border)' }}>Update Profile Details</button>
                        </div>
                        <div className="glass" style={{ marginTop: '25px', padding: '20px', borderRadius: '16px', border: '1px dashed var(--accent-gold-glow)', textAlign: 'center' }}>
                            <TrendingUp size={32} color="var(--accent-gold)" style={{ marginBottom: '10px' }} />
                            <h4 style={{ color: 'var(--accent-gold)', margin: 0 }}>Heritage Goal</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>We've reached 85% of our annual recruitment and welfare targets.</p>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{ height: '100%', background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold-glow)' }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Update Profile Modal */}
            <AnimatePresence>
                {showUpdateModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass" style={{ width: '400px', padding: '40px' }}>
                            <h2 className="title-font" style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '30px' }}>Update Profile</h2>
                            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Location</label>
                                    <input value={updateData.location} onChange={e => setUpdateData({ ...updateData, location: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Occupation</label>
                                    <input value={updateData.occupation} onChange={e => setUpdateData({ ...updateData, occupation: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required />
                                </div>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                    <button type="button" onClick={() => setShowUpdateModal(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" className="glow-btn" style={{ flex: 1, height: '45px' }} disabled={updating}>{updating ? 'Saving...' : 'Save Changes'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
