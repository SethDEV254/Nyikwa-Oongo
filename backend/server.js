const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development flexibility
}));
app.use(express.json());

// Simple persistence: JSON file
// On Vercel, only /tmp is writable
const DATA_DIR = process.env.VERCEL
    ? path.join('/tmp', 'data')
    : path.join(__dirname, 'data');
const DATA_PATH = path.join(DATA_DIR, 'members.json');

try {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_PATH)) {
        fs.writeFileSync(DATA_PATH, JSON.stringify([]));
    }
} catch (err) {
    console.error('Data directory init error:', err.message);
}

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Nyikwa Oongo Baba API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
