const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load elements data
const elementsPath = path.join(__dirname, 'data', 'elements.json');
let elementsData = [];

try {
    const data = fs.readFileSync(elementsPath, 'utf8');
    elementsData = JSON.parse(data);
} catch (err) {
    console.error('Error loading elements data:', err);
}

// Routes
app.get('/api/elements', (req, res) => {
    res.json(elementsData);
});

app.get('/api/elements/:symbol', (req, res) => {
    const element = elementsData.find(e => e.symbol.toLowerCase() === req.params.symbol.toLowerCase());
    if (element) {
        res.json(element);
    } else {
        res.status(404).json({ message: 'Element not found' });
    }
});

app.get('/api/categories', (req, res) => {
    const categories = [...new Set(elementsData.map(e => e.category))];
    res.json(categories);
});

app.get('/api/quiz', (req, res) => {
    // Basic quiz logic: return 10 random elements
    const shuffled = elementsData.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    res.json(selected);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
