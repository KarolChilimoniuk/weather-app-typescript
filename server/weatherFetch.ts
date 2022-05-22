import fetch from 'node-fetch';

// User location weather and forecast data

export const getCurrentLocWeather = async(lat: string, lon: string) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.APIWEATHER_KEY}`;
    try{
        const currWeather = await fetch(url);
        const weatherJSON = await currWeather.json();
        return weatherJSON;
    } catch(err) {
        console.log(err.message);
    }
}

export const getForecastLocWeather = async(lat: string, lon: string) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.APIWEATHER_KEY}`;
    try{
        const weatherForecast = await fetch(url);
        const weatherJSON = await weatherForecast.json();
        return weatherJSON;
    } catch(err) {
        console.log(err.message);
    }
}

// Required city weather and forecast data

export const getReqWeather = async(cityName: string) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.APIWEATHER_KEY}`;
    try{
        const currWeather = await fetch(url);
        if(currWeather.ok) {
            const weatherJSON = await currWeather.json();
            return weatherJSON;
        } else {
            throw new Error ('Bad city name');
        }
    } catch(err) {
        console.log(err.message);
    }
}

export const getReqForecast = async(lat: string, lon: string) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.APIWEATHER_KEY}`;
    try{
        const weatherForecast = await fetch(url);
        const weatherJSON = await weatherForecast.json();
        return weatherJSON;
    } catch(err) {
        console.log(err.message);
    }
}