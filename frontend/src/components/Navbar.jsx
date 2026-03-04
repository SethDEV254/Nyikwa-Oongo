import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, BellRing, X, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setIsSubscribed(true);
        setTimeout(() => setShowModal(false), 2000);
    };

    return (
        <>
            <nav className="glass" style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 30px',
                zIndex: 1000
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px' }} />
                </Link>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    {isHome ? (
                        <>
                            <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Heritage</a>
                            <Link to="/gallery" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Gallery</Link>
                        </>
                    ) : (
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} /> Back
                        </Link>
                    )}

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid var(--accent-gold-glow)',
                            color: 'var(--accent-gold)',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                    >
                        <BellRing size={16} /> Subscribe
                    </button>

                    {localStorage.getItem('member') ? (
                        <Link to="/dashboard" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Dashboard <ArrowRight size={14} />
                        </Link>
                    ) : (
                        <Link to="/register">
                            <button className="glow-btn" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Join Clan</button>
                        </Link>
                    )}
                </div>
            </nav>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass"
                            style={{ maxWidth: '400px', width: '100%', padding: '40px', textAlign: 'center', position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <BellRing size={30} color="var(--accent-gold)" />
                            </div>

                            {isSubscribed ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="font-heading" style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Welcome Aboard!</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>You've successfully subscribed to clan updates.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="font-heading" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Clan Updates</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.9rem' }}>Stay informed about clan meetings, cultural events, and welfare updates.</p>

                                    <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={18} style={{ position: 'absolute', left: '15px', top: '14px', color: 'var(--text-secondary)' }} />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ width: '100%', padding: '12px 12px 12px 45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '10px', outline: 'none' }}
                                            />
                                        </div>
                                        <button type="submit" className="glow-btn" style={{ width: '100%' }}>Stay Informed</button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
