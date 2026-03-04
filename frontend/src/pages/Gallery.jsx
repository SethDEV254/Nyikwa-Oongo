import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Camera, Image as ImageIcon, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import img1 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.36 (1).jpeg';
import img2 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.36.jpeg';
import img3 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.37 (1).jpeg';
import img4 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.37 (2).jpeg';
import img5 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.37 (3).jpeg';
import img6 from '../assets/gallery/WhatsApp Image 2026-03-04 at 01.05.37.jpeg';
import img7 from '../assets/gallery/img7.jpeg';
import img8 from '../assets/gallery/img8.jpeg';

const Gallery = () => {
    const images = [
        { url: img1, title: 'Clan Gathering', category: 'Events' },
        { url: img2, title: 'Youth Mentorship', category: 'Welfare' },
        { url: img3, title: 'Heritage Site Visit', category: 'Culture' },
        { url: img4, title: 'Annual AGM', category: 'Legal' },
        { url: img5, title: 'Clan Elders Council', category: 'Legacy' },
        { url: img6, title: 'Traditional Wedding', category: 'Culture' },
        { url: img7, title: 'Community Outreach', category: 'Social' },
        { url: img8, title: 'Education Support', category: 'Welfare' },
    ];

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        // Step 1: Initial decrypting loader
        const loaderTimer = setTimeout(() => {
            setIsLoading(false);

            // Step 2: Auto-launch slideshow after 4 seconds of synchronized rotation
            const slideTimer = setTimeout(() => {
                setSelectedIndex(0);
            }, 4000);

            return () => clearTimeout(slideTimer);
        }, 1500);

        return () => clearTimeout(loaderTimer);
    }, []);

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') setSelectedIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    // Auto-play logic
    React.useEffect(() => {
        let interval;
        if (selectedIndex !== null) {
            interval = setInterval(() => {
                nextImage();
            }, 5000); // Slide every 5 seconds
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [selectedIndex]);

    return (
        <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'var(--primary-bg)', overflowX: 'hidden' }}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 5000,
                            background: 'var(--primary-bg)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '30px'
                        }}
                    >
                        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                style={{
                                    position: 'absolute', inset: 0,
                                    border: '4px solid rgba(212, 175, 55, 0.1)',
                                    borderTopColor: 'var(--accent-gold)',
                                    borderRadius: '50%'
                                }}
                            />
                            <motion.img
                                src={logo}
                                initial={{ opacity: 0.5, scale: 0.8 }}
                                animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 0.9, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ width: '60px', position: 'absolute', top: '20px', left: '20px' }}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-heading"
                                style={{ color: 'var(--accent-gold)', fontSize: '2.5rem', letterSpacing: '8px', fontWeight: 800 }}
                            >
                                DECRYPTING ARCHIVES
                            </motion.h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '15px', fontWeight: 500 }}>Authenticating Lineage Records...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Navbar />

            <header style={{ marginTop: '140px', textAlign: 'center', marginBottom: '60px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent-gold-glow)', color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '20px' }}
                >
                    <Camera size={14} /> CLAN ARCHIVES
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="font-heading"
                    style={{ fontSize: '4rem', marginBottom: '20px' }}
                >
                    Clan <span style={{ color: 'var(--accent-gold)' }}>Gallery</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 0.9 } : {}}
                    transition={{ delay: 0.8 }}
                    className="font-heading"
                    style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', background: 'none', WebkitTextFillColor: 'initial', fontSize: '1rem', fontWeight: 400, opacity: 0.9 }}
                >
                    A visual journey through our shared history, celebrating the moments that define our unity and the heritage we dwell in.
                </motion.p>
            </header>

            <motion.main
                initial={{ opacity: 0 }}
                animate={!isLoading ? { opacity: 1 } : {}}
                className="container"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto', perspective: '1000px' }}
            >
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, rotateY: 1080, scale: 0.8, rotate: 15 }}
                        animate={!isLoading ? { opacity: 1, rotateY: 0, scale: 1, rotate: 0 } : {}}
                        transition={{
                            delay: 0.5,
                            duration: 4.0,
                            ease: "easeInOut"
                        }}
                        viewport={{ once: true }}
                        className="glass gallery-card"
                        style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative', transformStyle: 'preserve-3d' }}
                        onClick={() => setSelectedIndex(i)}
                    >
                        <div style={{ height: '450px', overflow: 'hidden' }}>
                            <img
                                src={img.url}
                                alt={img.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.main>

            <Footer />

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.95)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2000,
                            padding: '40px'
                        }}
                    >
                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            style={{
                                position: 'absolute',
                                left: '30px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '15px',
                                borderRadius: '50%',
                                zIndex: 2001,
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{ position: 'relative', maxWidth: '90%', maxHeight: '80vh' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={images[selectedIndex].url}
                                    alt={images[selectedIndex].title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        objectFit: 'contain',
                                        borderRadius: '24px',
                                        boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)'
                                    }}
                                />
                                <div style={{ position: 'absolute', bottom: '30px', left: '30px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{images[selectedIndex].title}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{images[selectedIndex].category}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            style={{
                                position: 'absolute',
                                right: '30px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '15px',
                                borderRadius: '50%',
                                zIndex: 2001,
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            <motion.div style={{ transform: 'rotate(180deg)', display: 'flex' }}>
                                <ArrowLeft size={24} />
                            </motion.div>
                        </button>

                        <button
                            onClick={() => setSelectedIndex(null)}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '30px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '12px',
                                borderRadius: '50%',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            <X size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
