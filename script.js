function getWeatherByCoords(lat, lon, cityName = "Your Location") {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const w = data.current_weather;

      let icon = "☁️";
      let bg = "#dfe9f3";

      if (w.weathercode === 0) {
        icon = "☀️";
        bg = "linear-gradient(to right, #fceabb, #f8b500)";
      } 
      else if (w.weathercode <= 3) {
        icon = "⛅";
        bg = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      } 
      else if (w.weathercode <= 67) {
        icon = "🌧️";
        bg = "linear-gradient(to right, #4e54c8, #8f94fb)";
      }

      document.body.style.background = bg;

      document.getElementById("result").innerHTML = `
        <h2>${icon} ${cityName}</h2>
        <p>🌡️ Temperature: ${w.temperature}°C</p>
        <p>💨 Wind Speed: ${w.windspeed} km/h</p>
      `;
    })
    .catch(() => {
      document.getElementById("result").innerHTML = "❌ Error loading weather";
    });
}

// 🌍 SEARCH CITY WEATHER
function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = "⚠️ Please enter city name";
    return;
  }

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json())
    .then(data => {

      if (!data.results || data.results.length === 0) {
        result.innerHTML = "❌ City not found";
        return;
      }

      const lat = data.results[0].latitude;
      const lon = data.results[0].longitude;
      const name = data.results[0].name;

      getWeatherByCoords(lat, lon, name);
    })
    .catch(() => {
      result.innerHTML = "❌ Something went wrong";
    });
}

// 📍 USER LOCATION WEATHER (BONUS)
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeatherByCoords(lat, lon, "My Location");
  });
}