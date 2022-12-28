console.log('cient side javascript file is loaded');
let date = new Date();

const todayDate = document.querySelector(".todayDate");
const weatherForm = document.querySelector('form')
const locationForm = document.querySelector('#location');
const unitForm = document.querySelector('#unit');
const submitButtonForm = document.querySelector('#button');
const errorMessage = document.querySelector(".error p");
const errorBox = document.querySelector(".error");
errorBox.style.display ='none';
const country = document.querySelector(".country p");
const region = document.querySelector(".region p");
const weatherDescription = document.querySelector(".weatherDescription p"); 
const weatherIcons = document.querySelector(".weatherIcons img");
weatherIcons.style.display ='none'; 
const weatherTemperature = document.querySelector(".weatherTemperature p"); 
const uvIndex = document.querySelector(".uvIndex p"); 
const feelslike = document.querySelector(".feelslike p"); 
const humidity = document.querySelector(".humidity p"); 
const windSpeed = document.querySelector(".windSpeed p"); 
const windDirection = document.querySelector(".windDirection p"); 
const airPressure = document.querySelector(".airPressure p"); 
const cloudcover = document.querySelector(".cloudcover p"); 
const precipitation = document.querySelector(".precipitation p"); 
const visibility = document.querySelector(".visibility p");
const forecastTable = document.querySelector(".forecastTable");
forecastTable.style.display = "none";

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    /*todayDate.textContent = '';
    country.textContent = '';
    region.textContent = '';
    weatherDescription.textContent = '';
    weatherIcons.src = '';
    weatherIcons.style.display ='none';
    weatherTemperature.textContent = '';
    uvIndex.textContent = '';
    feelslike.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
    windDirection.textContent = '';
    airPressure.textContent = '';
    cloudcover.textContent = '';
    precipitation.textContent = '';
    visibility.textContent = '';*/
    forecastTable.style.display = "none";
    errorBox.style.display = "none";
    submitButtonForm.disabled = true;
    submitButtonForm.textContent = "Loading...";

    if(locationForm.value && unitForm.value){
        fetch(`http://localhost:3000/weather?address=${locationForm.value}&units=${unitForm.value}`).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    todayDate.textContent = '';
                    forecastTable.style.display = "none";
                    console.log(data.error);
                    errorMessage.textContent = data.error;
                    errorBox.style.display = "block";
                    submitButtonForm.textContent = "Search";
                    submitButtonForm.disabled = false;
                } else {
                    todayDate.textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                    console.log(JSON.stringify(data));
                    errorBox.style.display = "none";
                    country.textContent = data.country;
                    region.textContent = data.region;
                    weatherDescription.textContent = `Today it is a ${data.forecast.weatherDescription} day`;
                    weatherIcons.style.display = "block";
                    weatherIcons.src = data.forecast.weatherIcons;
                    weatherTemperature.textContent = `Temp.: ${data.forecast.temperature} ºC - ºF`;
                    uvIndex.textContent = `UV Index: ${data.forecast.uvIndex}`;
                    feelslike.textContent = `Feels like: ${data.forecast.feelslike} ºC - ºF`;
                    humidity.textContent = `Humidity: ${data.forecast.humidity} %`;
                    windSpeed.textContent = `Wind Speed: ${data.forecast.windSpeed} k/h - m/h`;
                    windDirection.textContent = `Wind Dir.: ${data.forecast.windDirection}`;
                    airPressure.textContent = `Air Pressure: ${data.forecast.airPressure} MB`;
                    cloudcover.textContent = `CLoudcover: ${data.forecast.cloudcover}%`;
                    precipitation.textContent = `Precip.: ${data.forecast.precipitation} mm - inches`;
                    visibility.textContent = `Visibility: ${data.forecast.visibility} k/h - m/h`;
                    submitButtonForm.disabled = false;
                    submitButtonForm.textContent = "Search";
                    forecastTable.style.display = "inline-table";
                }
                
            });
        });
    } else {
        todayDate.textContent = '';
        submitButtonForm.disabled = false;
        submitButtonForm.textContent = "Search";
        errorMessage.textContent = "You need to enter location and unit";
        errorBox.style.display = "block";
    }
    
});

/*
fetch("http://localhost:3000/weather?address=!&units=m").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        } else {
            console.log(data);
        }
        
    });
});
*/