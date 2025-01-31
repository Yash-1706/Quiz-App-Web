const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Endpoint to proxy the quiz API data
app.get('/api/quiz', async (req, res) => {
  try {
    // Fetch data from the remote API
    const response = await fetch('https://api.jsonserve.com/Uw5CrX');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const quizData = await response.json();
    res.json(quizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
