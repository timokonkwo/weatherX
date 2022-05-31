const key = 'KzU5dSaTfvrfdZgsg3pFVH77Z03clhbq';


// Get weather information
const getWeather = async(cityCode) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

    const query = base + `${cityCode}?apikey=${key}`

    response = await fetch(query);

    data = await response.json();

    return data[0];
}


// Get city information
const getCity = async(city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = base + `?apikey=${key}&q=${city}`;

    response = await fetch(query);

    data = await response.json();

    return data[0];
};