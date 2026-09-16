let cityInput = document.getElementById("cityInput");git
let searchBtn = document.getElementById("searchBtn");
let weatherBox = document.getElementById("weather");


searchBtn.addEventListener("click", async function() {

    let city = cityInput.value;
    if (city === "") {
        alert("Please enter a city!");
        return;
    }
    try{ 
        searchBtn.disabled =true;
        weatherBox.innerHTML = "";
weatherBox.textContent = "Searching weather for " + city;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);

    if (!response.ok) {
    throw new Error("City not found");
}
let data = await response.json();
searchBtn.disabled =false;

weatherBox.innerHTML = `
    <h2>${data.name}</h2>

    <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="Weather icon"
    >

    <p>Temperature: ${data.main.temp} °C</p>
    <p>Feels Like: ${data.main.feels_like} °C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
`;
    } catch (error) {
        searchBtn.disabled =false;
        weatherBox.innerHTML = `
    <h2>City Not Found</h2>
    <p>Please enter a valid city name.</p>
`;

        console.log(error.message);
    }

});
cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});