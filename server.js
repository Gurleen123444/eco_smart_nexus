// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
ytu 
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simulated data (for demonstration purposes)
let energyData = {
    solar: Math.random() * 100,
    wind: Math.random() * 100,
    geothermal: Math.random() * 100,
    consumption: Math.random() * 100,
    forecast: Math.random() * 100
};

let weatherData = {
    temperature: Math.random() * 30,
    condition: 'Sunny' // Example condition
};

let airQualityData = {
    CO2: Math.random() * 100,
    PM2_5: Math.random() * 100
};

// API endpoints
app.get('/api/energy', (req, res) => {
    // Update the energy data with new random values
    energyData = {
        solar: Math.random() * 100,
        wind: Math.random() * 100,
        geothermal: Math.random() * 100,
        consumption: Math.random() * 100,
        forecast: Math.random() * 100
    };
    res.json(energyData);
});

app.get('/api/weather', (req, res) => {
    // Update the weather data with a random temperature
    weatherData.temperature = (Math.random() * 30).toFixed(1);
    res.json(weatherData);
});

app.get('/api/air-quality', (req, res) => {
    // Update the air quality data with new random values
    airQualityData.CO2 = (Math.random() * 400).toFixed(1); // CO2 levels
    airQualityData.PM2_5 = (Math.random() * 200).toFixed(1); // PM2.5 levels
    res.json(airQualityData);
});

app.post('/api/optimize-energy', (req, res) => {
    // Example logic for optimizing energy
    // In a real application, you'd implement actual optimization logic
    res.json({ message: 'Energy optimization successful!' });
});

app.post('/api/feedback', (req, res) => {
    console.log('User Feedback:', req.body.feedback);
    res.json({ message: 'Feedback received!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
