class Forecast {
    constructor() {
        this.key = 'KzU5dSaTfvrfdZgsg3pFVH77Z03clhbq';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    }

    async getCity(city) {
        const query = this.cityURI + `?apikey=${this.key}&q=${city}`;
        const response = await fetch(query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(cityCode) {
        const query = this.weatherURI + `${cityCode}?apikey=${this.key}`
        const response = await fetch(query);
        const data = await response.json();
        return data[0];
    }

    // Get the city information and 
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weatherInfo = await this.getWeather(cityDetails.Key);
        return { cityDetails, weatherInfo }
    }
}