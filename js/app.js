const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


const updateUI = data => {
    const { cityDetails, weatherInfo } = data;

    card.classList.remove('d-none')


    details.innerHTML = `<h5 class='my-3'>${cityDetails.EnglishName},  ${cityDetails.AdministrativeArea.ID}, ${cityDetails.Country.ID}.</h5>
    <span class='my-3'>${weatherInfo.WeatherText}</span>

    <div class='display-4 my-3'>
        <span my-3>${weatherInfo.Temperature.Metric.Value} &degC</span>
    </div>
    `;

    const timeSrc = weatherInfo.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    icon.setAttribute('src', `img/icons/${weatherInfo.WeatherIcon}.svg`)

    loader.classList.add('d-none');

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

    loader.classList.remove('d-none');
    card.classList.add('d-none');

    // Pass the entered city name to the update city function
    updateCity(city)
        .then(data => {
            updateUI(data);

            // Save the checked city to LocalStorage or overwrite existing.
            localStorage.setItem('city', city);
        })

    // Catch Errors if any and display error message
    .catch(err => {
        setTimeout(() => {
            loader.classList.add('d-none');
            error.classList.remove('d-none');
        }, 1000)
        error.innerHTML = `<p class="text-center p-3">An error Occured.</p>`;
        setTimeout(() => error.classList.add('d-none'), 3000)
    })

});

// Load the most recent Weather Check from LocalStorage
if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUI(data);
            localStorage.setItem('city', city);
        })
}