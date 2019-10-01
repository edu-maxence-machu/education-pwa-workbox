import './style/main.scss';
import {callAPI, getWeatherStringFromCode, getWeatherTextFromString, renderHTML, renderOnline} from './functions'

document.addEventListener('DOMContentLoaded', async function(event) {
    
    renderOnline(navigator.onLine);

    if(navigator.onLine){
        let temps = await callAPI();
        console.log(temps)
    
        let code_temps = temps.forecast.weather
        console.info('Le code temps renvoyé par l\'API est : ', code_temps);
    
        let weather_string = getWeatherStringFromCode(code_temps);
        let weather_text = getWeatherTextFromString(weather_string);
    
        renderHTML(weather_string, weather_text);
    } else {
        // Chargement des données en localStorage
    }

})

window.addEventListener('offline', renderOnline(false));
window.addEventListener('online',renderOnline(true));