import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Shield, Heart, ArrowRight, MessageCircle, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import heroImage from '../assets/hero-image.jpeg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Project grain is handled in index.css */}

            <Navbar />

            {/* Hero Section */}
            <header className="section-padding container" style={{ paddingTop: '100px', textAlign: 'center', position: 'relative' }}>
                {/* Large Background/Corner Logo */}
                <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    src={logo}
                    alt="Nyikwa Oongo Baba Clan Large Logo"
                    style={{ position: 'absolute', top: '20px', left: '20px', width: '150px', height: '150px', objectFit: 'contain', zIndex: -1, filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.15))' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '100px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent-gold-glow)', color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '15px' }}
                    >
                        THE FUTURE OF OUR HERITAGE
                    </motion.div>
                    <h1 className="title-font" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginTop: '5px', lineHeight: 0.9, marginBottom: '20px', fontWeight: 800 }}>
                        Nyikwa Oongo <br /> <span style={{ color: 'var(--accent-gold)' }}>Baba Clan</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 30px', lineHeight: 1.5 }}>
                        A digital sanctuary for the Nyikwa Oongo Baba clan. Bridging generations through transparency, mutual support, and cultural preservation.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
                        <Link to="/register">
                            <button className="glow-btn" style={{ fontSize: '1rem', padding: '14px 35px' }}>Become a Member <ArrowRight size={18} style={{ marginLeft: '10px' }} /></button>
                        </Link>
                    </div>

                    {/* Visual Bridge */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', opacity: 0.8 }}>
                        <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--accent-gold))', borderRadius: '2px' }} />
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{ color: 'var(--accent-gold)', marginTop: '5px' }}
                        >
                            <ArrowDown size={24} />
                        </motion.div>
                    </div>
                </motion.div>
            </header>

            {/* Stats Section with Scroll Reveal */}
            <section className="container section-padding" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '20px', position: 'relative', zIndex: 10 }}>
                {[
                    { icon: <Users size={40} />, label: "Global Members", value: "1,200+", link: "/register" },
                    { icon: <Heart size={40} />, label: "Welfare Support", value: "Kes 2.4M", link: "/register" },
                    { icon: <Shield size={40} />, label: "Active Chapters", value: "15", link: "/register" }
                ].map((stat, i) => {
                    const CardContent = (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="glass glass-card"
                            style={{
                                padding: '50px',
                                textAlign: 'center',
                                borderBottom: `4px solid ${i === 1 ? 'var(--accent-gold)' : 'transparent'}`,
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'block',
                                cursor: stat.link ? 'pointer' : 'default'
                            }}
                        >
                            <div style={{ color: 'var(--accent-gold)', marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                            <h3 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{stat.value}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>{stat.label}</p>
                        </motion.div>
                    );

                    if (stat.link) {
                        return <Link to={stat.link} key={i} style={{ textDecoration: 'none' }}>{CardContent}</Link>;
                    }
                    return <div key={i}>{CardContent}</div>;
                })}
            </section>

            {/* Mission Section with Parallax Reveal */}
            <section id="about" style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginTop: '100px' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '60vh', minHeight: '400px', position: 'relative', overflow: 'hidden' }}
                >
                    <img
                        src={heroImage}
                        alt="Clan Gathering"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.85 }}
                    />
                    <div className="container" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: '100%' }}>
                        <div className="glass" style={{ padding: '25px', background: 'rgba(7, 12, 23, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', maxWidth: '600px', borderRadius: '20px' }}>
                            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', margin: 0, color: 'white' }}>"The strength of the clan is the individual, and the strength of the individual is the clan."</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="container"
                    style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: 1 }}>Guardians of <span style={{ color: 'var(--accent-gold)' }}>Heritage</span></h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '50px' }}>
                        We are more than a clan; we are a legacy. Our mission is to ensure every member thrives through shared resources and collective wisdom.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'left', marginBottom: '40px' }}>
                        {[
                            { title: 'Unity', desc: 'Strength in numbers and purpose.' },
                            { title: 'Legacy', desc: 'Preserving our sacred traditions.' },
                            { title: 'Support', desc: 'Welfare for every generation.' },
                            { title: 'Future', desc: 'Digital-first clan management.' },
                        ].map((feature, i) => (
                            <div key={i} className="glass" style={{ padding: '30px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', borderTop: '2px solid transparent', transition: '0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderTopColor = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.borderTopColor = 'transparent'}>
                                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.4rem', marginBottom: '15px' }}>{feature.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', padding: '10px 20px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', display: 'inline-block' }}>
                            Developed by <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>@starico</span>
                        </span>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
