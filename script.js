document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setInterval(fetchData, 10000); // Auto-refresh every 10 seconds
    document.getElementById('feedbackForm').addEventListener('submit', submitFeedback);
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function fetchData() {
    fetch('/api/energy')
        .then(response => response.json())
        .then(data => {
            document.getElementById('solar').innerText = data.solar.toFixed(2);
            document.getElementById('wind').innerText = data.wind.toFixed(2);
            document.getElementById('geothermal').innerText = data.geothermal.toFixed(2);
            document.getElementById('consumption').innerText = data.consumption.toFixed(2);
            document.getElementById('forecast').innerText = data.forecast.toFixed(2);
            renderEnergyChart(data);
            notifyHighUsage(data.consumption);
        });

    fetch('/api/weather')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').innerText = data.temperature.toFixed(1);
            document.getElementById('condition').innerText = data.condition;
            document.getElementById('tips').innerText = getClimateTips(data.condition);
        });

    fetch('/api/air-quality')
        .then(response => response.json())
        .then(data => {
            document.getElementById('co2').innerText = data.CO2.toFixed(1);
            document.getElementById('pm25').innerText = data.PM2_5.toFixed(1);
        });
}

function renderEnergyChart(data) {
    const ctx = document.getElementById('energyChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Solar', 'Wind', 'Geothermal', 'Consumption'],
            datasets: [{
                label: 'Energy (kW)',
                data: [data.solar, data.wind, data.geothermal, data.consumption],
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function notifyHighUsage(consumption) {
    const alertBox = document.getElementById('alert');
    if (consumption > 70) { // Example threshold
        alertBox.innerText = 'Warning: High energy consumption detected!';
    } else {
        alertBox.innerText = '';
    }
}

function getClimateTips(condition) {
    switch (condition.toLowerCase()) {
        case 'sunny':
            return 'Stay hydrated and reduce energy usage by closing blinds.';
        case 'rainy':
            return 'Consider rainwater harvesting.';
        default:
            return 'Enjoy your day!';
    }
}

function optimizeEnergy() {
    fetch('/api/optimize-energy', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchData(); // Refresh data after optimization
        });
}

function submitFeedback(event) {
    event.preventDefault();
    const feedback = document.getElementById('feedback').value;

    // Handle feedback submission logic here (e.g., send to server)
    alert('Feedback submitted: ' + feedback);
    document.getElementById('feedback').value = ''; // Clear textarea
}
// Function to fetch energy data and create chart
async function fetchEnergyData() {
    const response = await fetch('http://localhost:3000/api/energy');
    const data = await response.json();
    return data;
}

// Function to create energy chart
async function createEnergyChart() {
    const data = await fetchEnergyData();

    const ctx = document.getElementById('energyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Solar', 'Wind', 'Geothermal', 'Consumption', 'Forecast'],
            datasets: [{
                label: 'Energy Data',
                data: [data.solar, data.wind, data.geothermal, data.consumption, data.forecast],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to fetch weather data and create chart
async function fetchWeatherData() {
    const response = await fetch('http://localhost:3000/api/weather');
    const data = await response.json();
    return data;
}

// Function to create weather chart
async function createWeatherChart() {
    const data = await fetchWeatherData();

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Temperature'],
            datasets: [{
                label: 'Current Temperature (°C)',
                data: [data.temperature],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to fetch air quality data and create chart
async function fetchAirQualityData() {
    const response = await fetch('http://localhost:3000/api/air-quality');
    const data = await response.json();
    return data;
}

// Function to create air quality chart
async function createAirQualityChart() {
    const data = await fetchAirQualityData();

    const ctx = document.getElementById('airQualityChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['CO2', 'PM2.5'],
            datasets: [{
                label: 'Air Quality Levels',
                data: [data.CO2, data.PM2_5],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to toggle dark/light mode
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Initialize charts on page load
window.onload = () => {
    document.body.classList.add('light-mode'); // Set default mode
    createEnergyChart();
    createWeatherChart();
    createAirQualityChart();
};
