import axios from 'axios';

// Function to get location using IP API
async function getLocation() {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Function to get current weather using Open Meteo API
async function getCurrentWeather(latitude, longitude) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { getLocation, getCurrentWeather };
