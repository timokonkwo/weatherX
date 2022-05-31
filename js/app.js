const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


const updateUI = data => {
    const { cityDetails, weatherInfo } = data;
    loader.classList.add('d-none');

    // if (card.classList.contains('d-none')) {
    card.classList.remove('d-none')


    details.innerHTML = `<h5 class='my-3'>${cityDetails.EnglishName},  ${cityDetails.AdministrativeArea.ID}, ${cityDetails.Country.ID}.</h5>
    <span class='my-3'>${weatherInfo.WeatherText}</span>

    <div class='display-4 my-3'>
        <span my-3>${weatherInfo.Temperature.Metric.Value} &degC</span>
    </div>
    `;

    if (weatherInfo.IsDayTime) {
        time.setAttribute('src', 'img/day.svg')
    } else {
        time.setAttribute('src', 'img/night.svg')
    }

    icon.setAttribute('src', `img/icons/${weatherInfo.WeatherIcon}.svg`)

    let count = 0;
    scrollDown = setInterval(() => {
        if (count === 350) {
            clearInterval(scrollDown);
        } else {
            scrollTo(0, count)
            count += 10;
        }
    }, 10)
}

// setTimeout(() => scrollTo(outerHeight, outerHeight), 2000);

// Get the city information and 
const updateCity = async city => {
    const cityDetails = await getCity(city);
    const weatherInfo = await getWeather(cityDetails.Key);
    return { cityDetails, weatherInfo }
}


cityForm.addEventListener('submit', (e) => {
    city = cityForm.city.value.trim();
    cityForm.reset();
    e.preventDefault();


    // if (city == ''){

    // }
    loader.classList.remove('d-none');
    card.classList.add('d-none');

    // Pass the entered city name to the update city function
    updateCity(city)
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            loader.classList.add('d-none');
            error.classList.remove('d-none');
            error.innerHTML = `<p class="text-center p-3">An error Occured.</p>`;
            setTimeout(() => error.classList.add('d-none'), 2000)
        })
});