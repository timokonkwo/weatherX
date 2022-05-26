const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {

    // Destructure the data object
    const { cityDetails, weather } = data;

    // Update the details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`

    // Update the night/day and icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);


    let timeSrc = null;

    if (weather.IsDayTime) {
        timeSrc = 'img/day.svg'
    } else {
        timeSrc = 'img/night.svg'
    }

    time.setAttribute('src', timeSrc);


    // Removethe d-none class in the card if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const UpdateCity = async(city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };
}

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the ui with new city
    UpdateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));
})