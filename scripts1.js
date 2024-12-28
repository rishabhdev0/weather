const card = document.querySelector('.cards');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-detail');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const notFound = document.querySelector('.not_found');

searchButton.addEventListener('click', () => {
    const API_KEY = '37b977537aae2c76a54e2b8b4ba9328e';
    const city = searchInput.value.trim();

    // Hide all weather information and error message initially
    weatherBox.style.display = 'none';
    weatherDetail.style.display = 'none';  // Hide weather details (humidity, wind speed)
    notFound.style.display = 'none';      // Hide error message
    
    // If no city name is entered, do nothing
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                notFound.style.display = 'block';  // Show error message
                card.style.height = '400px';       // Adjust card height for error message
                return;
            }

            // If city is found, display weather info
            notFound.style.display = 'none';    // Hide error message
            weatherBox.style.display = 'block'; // Show weather image and temp
            weatherDetail.style.display = 'flex'; // Show weather details (humidity, wind speed)

            const weatherImage = weatherBox.querySelector('img');
            const temperature = weatherBox.querySelector('.temperature');
            const description = weatherBox.querySelector('.description');
            const humidity = weatherDetail.querySelector('.humidity span');
            const wind = weatherDetail.querySelector('.wind span');

            // Update weather details based on response
            switch (data.weather[0].main) {
                case 'Clear':
                    weatherImage.src = 'images/sunny.png';
                    break;
                case 'Rain':
                    weatherImage.src = 'images/rainy.png';
                    break;
                case 'Snow':
                    weatherImage.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    weatherImage.src = 'images/cloud.png';
                    break;
                default:
                    weatherImage.src = 'images/mist.png';
            }

            temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${Math.round(data.wind.speed)} km/h`;

            card.style.height = '530px';  // Adjust card height to show all details
        })
        .catch(err => console.error(err));
});
