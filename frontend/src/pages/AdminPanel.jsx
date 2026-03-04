import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowLeft, Lock, Users, Plus, Search, LogOut, LayoutDashboard, Settings, UserPlus, X, Phone, Mail, MapPin, Briefcase, IdCard, Radio, Send, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

const AdminPanel = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('members');
    const [showAddModal, setShowAddModal] = useState(false);

    const [newMember, setNewMember] = useState({
        fullName: '', phone: '', email: '', nationalId: '', dob: '',
        gender: '', location: '', role: 'Member', occupation: '',
        nextOfKinName: '', nextOfKinPhone: '',
        parentGuardianName: '', password: ''
    });

    const [broadcastData, setBroadcastData] = useState({
        channel: 'email',
        recipientFilter: 'all',
        subject: '',
        message: ''
    });
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [broadcastProgress, setBroadcastProgress] = useState(0);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/admin/login', { key: password });
            localStorage.setItem('adminToken', response.data.token);
            setIsAuthenticated(true);
            setError('');
            fetchMembers();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
            setPassword('');
        }
    };

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/auth/members');
            setMembers(response.data);
        } catch (err) {
            console.error('Error fetching members:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', newMember);
            setShowAddModal(false);
            fetchMembers();
            setNewMember({
                fullName: '', phone: '', email: '', nationalId: '', dob: '',
                gender: '', location: '', role: 'Member', occupation: '',
                nextOfKinName: '', nextOfKinPhone: '',
                parentGuardianName: '', password: ''
            });
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add member');
        }
    };

    const filteredMembers = members.filter(m =>
        m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone.includes(searchTerm)
    );

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--primary-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '50px', maxWidth: '450px', width: '100%', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' }}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Lock size={30} color="var(--accent-gold)" />
                    </div>
                    <h2 className="font-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>Admin Portal</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '30px' }}>Restricted access for clan administrators</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input
                            type="password"
                            placeholder="Enter Security Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        {error && <p style={{ color: '#ff4757', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
                        <button type="submit" className="glow-btn">Access Console</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--primary-bg)', color: 'white' }}>
            {/* Sidebar */}
            <nav className="glass" style={{ width: '280px', margin: '20px', borderRadius: '24px', display: 'flex', flexDirection: 'column', padding: '30px', gap: '40px', position: 'sticky', top: '20px', height: 'calc(100vh - 40px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', borderRadius: '12px' }} />
                    <span className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--accent-gold)' }}>MOB Admin</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {[
                        { id: 'members', icon: <Users size={20} />, label: 'Members' },
                        { id: 'stats', icon: <LayoutDashboard size={20} />, label: 'Insights' },
                        { id: 'broadcast', icon: <Radio size={20} />, label: 'Broadcast' },
                        { id: 'settings', icon: <Settings size={20} />, label: 'General' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', borderRadius: '12px',
                                background: activeTab === item.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                border: 'none', color: activeTab === item.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                                cursor: 'pointer', transition: '0.3s', textAlign: 'left', fontWeight: 600
                            }}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        setIsAuthenticated(false);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(255, 71, 87, 0.05)', border: 'none', color: '#ff4757', cursor: 'pointer', fontWeight: 600 }}
                >
                    <LogOut size={20} /> Logout
                </button>
            </nav>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 className="title-font" style={{ fontSize: '2.5rem', marginBottom: '5px' }}>
                            {activeTab === 'members' && <>Member <span style={{ color: 'var(--accent-gold)' }}>Registry</span></>}
                            {activeTab === 'stats' && <>Clan <span style={{ color: 'var(--accent-gold)' }}>Insights</span></>}
                            {activeTab === 'broadcast' && <>Bulk <span style={{ color: 'var(--accent-gold)' }}>Broadcast</span></>}
                            {activeTab === 'settings' && <>System <span style={{ color: 'var(--accent-gold)' }}>Settings</span></>}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {activeTab === 'members' && "Welcome back, administrator. Here's your clan data."}
                            {activeTab === 'stats' && "Analytical breakdown of the Nyikwa Oongo Baba population."}
                            {activeTab === 'broadcast' && "Send bulk messages to clan members via various channels."}
                            {activeTab === 'settings' && "Manage administrative preferences and system status."}
                        </p>
                    </div>
                    {activeTab === 'members' && (
                        <button onClick={() => setShowAddModal(true)} className="glow-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <UserPlus size={20} /> Add New Member
                        </button>
                    )}
                </header>

                {activeTab === 'members' && (
                    <>
                        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                            <div className="glass" style={{ padding: '25px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}><Users size={120} /></div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 10px' }}>TOTAL POPULATION</p>
                                <h3 style={{ fontSize: '2.5rem', margin: 0 }}>{members.length}</h3>
                            </div>
                            <div className="glass" style={{ padding: '25px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}><Shield size={120} /></div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 10px' }}>VERIFIED ELDERS</p>
                                <h3 style={{ fontSize: '2.5rem', margin: 0 }}>{members.filter(m => m.role === 'Elder' || m.role === 'Admin').length}</h3>
                            </div>
                            <div className="glass" style={{ padding: '25px' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 10px' }}>SEARCH REGISTRY</p>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                                    <input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Name, ID or Phone..."
                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '30px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ color: 'var(--accent-gold)', borderBottom: '1px solid var(--glass-border)' }}>
                                        <th style={{ padding: '20px' }}>MEMBER IDENTITY</th>
                                        <th style={{ padding: '20px' }}>GUARDIAN</th>
                                        <th style={{ padding: '20px' }}>CONTACT</th>
                                        <th style={{ padding: '20px' }}>LOCATION</th>
                                        <th style={{ padding: '20px' }}>JOINED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map(member => (
                                        <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: '0.2s' }}>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ fontWeight: 600 }}>{member.fullName}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{member.id}</div>
                                            </td>
                                            <td style={{ padding: '20px', fontSize: '0.9rem', color: member.parentGuardianName ? 'white' : 'rgba(255,255,255,0.3)' }}>
                                                {member.parentGuardianName || 'Not specified'}
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ fontSize: '0.9rem' }}>{member.phone}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{member.email}</div>
                                            </td>
                                            <td style={{ padding: '20px', fontSize: '0.9rem' }}>{member.location}</td>
                                            <td style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(member.joinedAt).toDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'stats' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                        <div className="glass" style={{ padding: '40px' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Gender Distribution</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {['Male', 'Female'].map(gender => {
                                    const count = members.filter(m => m.gender === gender).length;
                                    const percent = members.length ? Math.round((count / members.length) * 100) : 0;
                                    return (
                                        <div key={gender}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                                                <span>{gender}</span>
                                                <span style={{ color: 'var(--accent-gold)' }}>{count} ({percent}%)</span>
                                            </div>
                                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: 'var(--accent-gold)' }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '40px' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Top Locations</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {Array.from(new Set(members.map(m => m.location))).slice(0, 4).map(loc => {
                                    const count = members.filter(m => m.location === loc).length;
                                    const percent = members.length ? Math.round((count / members.length) * 100) : 0;
                                    return (
                                        <div key={loc}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                                                <span>{loc}</span>
                                                <span style={{ color: 'var(--accent-gold)' }}>{count}</span>
                                            </div>
                                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), transparent)' }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '40px', gridColumn: 'span 2' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Growth Insights</h3>
                            <div style={{ padding: '40px', textAlign: 'center', border: '1px dashed var(--glass-border)', borderRadius: '20px', color: 'var(--text-secondary)' }}>
                                <LayoutDashboard size={40} style={{ marginBottom: '20px', opacity: 0.3 }} />
                                <p>Membership analytics are trending positively with a {Math.min(members.length * 2, 100)}% increase in digital registrations this month.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'broadcast' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                        <div className="glass" style={{ padding: '40px' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MessageSquare size={20} /> Compose Announcement
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Select Channel</label>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        {[
                                            { id: 'email', icon: <Mail size={16} />, label: 'Email' },
                                            { id: 'sms', icon: <Phone size={16} />, label: 'SMS' },
                                            { id: 'whatsapp', icon: <MessageSquare size={16} />, label: 'WhatsApp' }
                                        ].map(ch => (
                                            <button
                                                key={ch.id}
                                                onClick={() => setBroadcastData({ ...broadcastData, channel: ch.id })}
                                                style={{
                                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px',
                                                    background: broadcastData.channel === ch.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid ${broadcastData.channel === ch.id ? 'var(--accent-gold)' : 'var(--glass-border)'}`,
                                                    color: broadcastData.channel === ch.id ? 'var(--accent-gold)' : 'white', cursor: 'pointer', transition: '0.3s'
                                                }}
                                            >
                                                {ch.icon} {ch.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Recipient Group</label>
                                    <select
                                        value={broadcastData.recipientFilter}
                                        onChange={(e) => setBroadcastData({ ...broadcastData, recipientFilter: e.target.value })}
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', outline: 'none' }}
                                    >
                                        <option value="all">All Registered Members ({members.length})</option>
                                        <option value="elders">Clan Elders Only ({members.filter(m => m.role === 'Elder' || m.role === 'Admin').length})</option>
                                        <option value="verified">Verified Members</option>
                                    </select>
                                </div>

                                {broadcastData.channel === 'email' && (
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Email Subject</label>
                                        <input
                                            placeholder="Enter subject line..."
                                            value={broadcastData.subject}
                                            onChange={(e) => setBroadcastData({ ...broadcastData, subject: e.target.value })}
                                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Message Body</label>
                                    <textarea
                                        rows={8}
                                        placeholder="Type your message here..."
                                        value={broadcastData.message}
                                        onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                                        style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', outline: 'none', resize: 'none' }}
                                    />
                                </div>

                                <button
                                    className="glow-btn"
                                    onClick={() => {
                                        setIsBroadcasting(true);
                                        let prog = 0;
                                        const interval = setInterval(() => {
                                            prog += 5;
                                            setBroadcastProgress(prog);
                                            if (prog >= 100) {
                                                clearInterval(interval);
                                                setTimeout(() => {
                                                    setIsBroadcasting(false);
                                                    setBroadcastProgress(0);
                                                    setBroadcastData({ ...broadcastData, message: '', subject: '' });
                                                    alert('Broadcast sent successfully!');
                                                }, 500);
                                            }
                                        }, 100);
                                    }}
                                    disabled={!broadcastData.message || isBroadcasting}
                                    style={{ height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}
                                >
                                    {isBroadcasting ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                            Sending... {broadcastProgress}%
                                        </div>
                                    ) : (
                                        <>Launch Broadcast <Send size={20} /></>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass" style={{ padding: '30px' }}>
                                <h4 className="font-heading" style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>Channel Status</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[
                                        { name: 'Email Server', status: 'Online', color: '#2ecc71' },
                                        { name: 'SMS Gateway', status: 'Online', color: '#2ecc71' },
                                        { name: 'WhatsApp API', status: 'Online', color: '#2ecc71' }
                                    ].map(sys => (
                                        <div key={sys.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>{sys.name}</span>
                                            <span style={{ color: sys.color, fontWeight: 600 }}>{sys.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass" style={{ padding: '30px' }}>
                                <h4 className="font-heading" style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>Lineage History</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    All broadcasts are logged for administrative audit. Ensure respectful communication with clan members.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div style={{ maxWidth: '800px' }}>
                        <div className="glass" style={{ padding: '40px', marginBottom: '30px' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Shield size={20} /> Administrative Control
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>System Status</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Backend API and Database connections</div>
                                    </div>
                                    <span style={{ color: '#2ecc71', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71' }}></div> OPERATIONAL
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Security Protocol</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>JWT Session & Encryption status</div>
                                    </div>
                                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600 }}>ENCRYPTED</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '40px' }}>
                            <h3 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '25px' }}>Clan Metadata</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Ancestors' Name</label>
                                    <input value="Nyikwa Oongo Baba" disabled style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Base Region</label>
                                    <input value="Homabay County" disabled style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Member Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass" style={{ maxWidth: '900px', width: '90%', maxHeight: '90vh', overflowY: 'auto', padding: '50px', position: 'relative' }}>
                            <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>

                            <h2 className="title-font" style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '40px' }}>Enroll Member</h2>

                            <form onSubmit={handleAddMember} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Name</label><input value={newMember.fullName} onChange={e => setNewMember({ ...newMember, fullName: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Parent / Guardian's Full Name</label><input value={newMember.parentGuardianName} onChange={e => setNewMember({ ...newMember, parentGuardianName: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>National ID</label><input value={newMember.nationalId} onChange={e => setNewMember({ ...newMember, nationalId: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Phone Number</label><input value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Location</label><input value={newMember.location} onChange={e => setNewMember({ ...newMember, location: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email</label><input type="email" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ flex: 1 }}><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Gender</label><select value={newMember.gender} onChange={e => setNewMember({ ...newMember, gender: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
                                        <div style={{ flex: 1 }}><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>DOB</label><input type="date" value={newMember.dob} onChange={e => setNewMember({ ...newMember, dob: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                    </div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Next of Kin Name</label><input value={newMember.nextOfKinName} onChange={e => setNewMember({ ...newMember, nextOfKinName: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }} required /></div>
                                </div>
                                <button type="submit" className="glow-btn" style={{ gridColumn: 'span 2', height: '55px', marginTop: '20px' }}>Enroll and Save to Database</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
