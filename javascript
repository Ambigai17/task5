const apiKey = f732c8cc9c00b06026df8f42cd018fbd; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather${location}&appid=${apiKey}&units=metric`);
        
        // Log the response for debugging
        console.log('API Response:', await response.clone().json());

        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weatherData').innerHTML = `<p>Location not found.</p>`;
            return;
        }

        const { main, weather, wind, sys } = data;
        document.getElementById('weatherData').innerHTML = `
            <h2>${data.name}, ${sys.country}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherData').innerHTML = `<p>Error fetching weather data.</p>`;
    }
}
