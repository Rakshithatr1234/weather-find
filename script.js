document.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('userName');
  if (name) {
    document.getElementById('greeting').textContent = `Hello, ${name}! 🌞 Ready to check the weather?`;
  }

  const input = document.getElementById('locationInput');
  const button = document.getElementById('getWeatherBtn');

  button.addEventListener('click', getWeather);
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('locationInput');
  const button = document.getElementById('getWeatherBtn');

  // Button click triggers weather fetch
  button.addEventListener('click', getWeather);

  // Enter key triggers weather fetch
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });
});



async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const apiKey = '7b48ef9a22614085b81140857252307'; // Replace with your WeatherAPI key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

if (!location) {
    document.getElementById('weatherResult').innerHTML = `<p>Please enter a location.</p>`;
    return;
  }


  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.location) {
      const weatherHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Weather icon">
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} kph</p>
      `;
      document.getElementById('weatherResult').innerHTML = weatherHTML;
    } else {
      document.getElementById('weatherResult').innerHTML = `<p>Location not found.</p>`;
    }
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data.</p>`;
  }
}