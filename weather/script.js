document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input")
    const getWeatherButton = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityName = document.getElementById("city-name")
    const temperature = document.getElementById("temperature")
    const description = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    const apiKey = "ca51ed6a78b9aaa16b5dc64b667e289b"
    getWeatherButton.addEventListener("click",async ()=>{
        const city = cityInput.value.trim()
        if(!city) return;
        try {
            const weatherData = await getWeatherData(city)
            displayDataFromApi(weatherData);
            
        } catch (error) {
            showError();
        }
    })
    async function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            showError();
            throw new Error(alert("City not found"));
        }
        const data = await response.json();
        return data;
    }
    function displayDataFromApi(data){
        weatherInfo.classList.remove("hidden")
        cityName.innerHTML = data.name
        temperature.innerHTML = `${Math.floor(data.main.temp - 273.15)}°C`;
        description.innerHTML = data.weather[0].description;
                
    }
    function showError(){
        weatherInfo.classList.add("hidden")
        errorMessage.classList.remove("hidden")
    }
})