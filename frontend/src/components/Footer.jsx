import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="glass" style={{ padding: '60px 0', marginTop: '100px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="font-heading" style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>NYIKWA OONGO BABA</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '10px 0', fontSize: '0.9rem' }}>Building a legacy of unity and transparency.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                    <MessageCircle size={20} style={{ color: 'var(--text-secondary)' }} />
                    <Users size={20} style={{ color: 'var(--text-secondary)' }} />
                    <Shield size={20} style={{ color: 'var(--text-secondary)' }} />
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                        © 2026 Nyikwa Oongo Baba. All rights reserved.
                    </p>

                    {/* Small Admin Link */}
                    <Link
                        to="/admin"
                        style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            opacity: 0.5,
                            letterSpacing: '1px',
                            transition: 'opacity 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                    >
                        ADMIN PANEL
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
