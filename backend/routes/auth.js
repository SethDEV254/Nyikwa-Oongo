const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'members.json');
const JWT_SECRET = process.env.JWT_SECRET || 'clan_secret_key_2026';

// Helper to read/write members
const getMembers = () => JSON.parse(fs.readFileSync(DATA_PATH));
const saveMembers = (members) => fs.writeFileSync(DATA_PATH, JSON.stringify(members, null, 2));

// @route   POST /api/auth/register
// @desc    Register a new clan member
router.post('/register', async (req, res) => {
    try {
        const { fullName, phone, email, nationalId, dob, gender, location, occupation, nextOfKinName, nextOfKinPhone, password, parentGuardianName } = req.body;

        if (!parentGuardianName) {
            return res.status(400).json({ message: "Parent or Guardian's full name is required for identification." });
        }

        const members = getMembers();

        // Check if member already exists (by phone or ID)
        if (members.find(m => m.phone === phone || m.nationalId === nationalId)) {
            return res.status(400).json({ message: 'Member already registered with this phone or ID' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password || '123456', salt); // Default password if not provided for now

        const newMember = {
            id: nationalId,
            fullName,
            phone,
            email,
            nationalId,
            dob,
            gender,
            location,
            role: 'Member',
            occupation,
            nextOfKinName,
            nextOfKinPhone,
            parentGuardianName: parentGuardianName || '',
            password: hashedPassword,
            joinedAt: new Date().toISOString()
        };

        members.push(newMember);
        saveMembers(members);

        res.status(201).json({
            message: 'Registration successful!',
            memberId: newMember.id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate member & get token
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier can be phone or nationalId

        const members = getMembers();
        const member = members.find(m => m.phone === identifier || m.nationalId === identifier);

        if (!member) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            member: {
                id: member.id,
                fullName: member.fullName,
                role: member.role
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                member: {
                    id: member.id,
                    fullName: member.fullName,
                    role: member.role
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/admin/login
// @desc    Admin access with security key
router.post('/admin/login', (req, res) => {
    const { key } = req.body;
    if (key === 'Dollarpath_1') {
        const payload = { role: 'Admin' };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, message: 'Admin access granted' });
        });
    } else {
        res.status(401).json({ message: 'Invalid security key' });
    }
});

// @route   PUT /api/auth/profile/:id
// @desc    Update member profile (location/occupation)
router.put('/profile/:id', (req, res) => {
    try {
        const { location, occupation } = req.body;
        const members = getMembers();
        const index = members.findIndex(m => m.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Member not found' });
        }

        members[index] = { ...members[index], location, occupation };
        saveMembers(members);

        const { password, ...safeMember } = members[index];
        res.json({ message: 'Profile updated', member: safeMember });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/auth/members
// @desc    Get all members (Admin access)
router.get('/members', (req, res) => {
    try {
        const members = getMembers();
        // Remove passwords from response for security
        const safeMembers = members.map(({ password, ...m }) => m);
        res.json(safeMembers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
