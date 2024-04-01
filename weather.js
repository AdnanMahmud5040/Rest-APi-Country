document.addEventListener('DOMContentLoaded', ()=>{
    

const wrapper = document.querySelector('.wrapper')
const card = wrapper.querySelector('.card text-center')
const city = wrapper.querySelector('#city')
const submit = wrapper.querySelector('#submit')
const getLocation = wrapper.querySelector('#butt')
let api;
let wIcon = document.querySelector("#icon")

city.addEventListener('keyup', e => {
    if (e.key == 'Enter' && city.value != '') {
        requestApi(city.value)
    }
})
submit.addEventListener('click', e => {
    if (city.value !== ''){
        requestApi(city.value)
        
    }else if (city.value === '') {
        alert('Sorry, please input City name!')
    }
})
getLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)

    } else {
        alert('Sorry, unable to get location!')
    }
})
function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${icon}&units=metric&appid=220789f4e8c25f055bb2d1eae7f527ab`
    fetchweatherData(api);
}

function onError(error) {
    alert('Sorry, location permission denied!')

}
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&{icon}&units=metric&appid=220789f4e8c25f055bb2d1eae7f527ab`
    fetchweatherData(api);
}


function fetchweatherData() {
    fetch(api)
        .then(response => (response.json()))
        .then(result => weatherDetails(result)
        )

}
function weatherDetails(info) {
    if (info.cod == '404') {
        alert(`${city.value} is not a valid city name`)
    } else {
        const row = document.querySelector('.row')
        const cards = row.querySelector('#cards')
        const country = cards.querySelector('#country')
         const id = cards.querySelector('#icon')
        const temp = cards.querySelector('#temp')
        const feels_like = cards.querySelector('#feels_like')
        const humidity = cards.querySelector('#humidity')
        const windSpeed = cards.querySelector('#windSpeed')
        const description = cards.querySelector('#description')
        

        country.innerText = (info['name']);
        id.innerText=  (info['weather'][0]['id'])

        if((info['weather'][0]['id']) == 800){
            wIcon.src = "./icons/Weather Icons/clear.svg"
        }
        else if((info['weather'][0]['id'])  >= 200 && (info['weather'][0]['id']) <= 232){
            wIcon.src = "./icons/Weather Icons/storm.svg"
        }
        else if((info['weather'][0]['id'])  >= 600 && (info['weather'][0]['id']) <= 622){
            wIcon.src = "./icons/Weather Icons/snow.svg"
        }
        else if((info['weather'][0]['id'])  >= 701 && (info['weather'][0]['id']) <= 781){
            wIcon.src = "./icons/Weather Icons/haze.svg"
        }
        else if((info['weather'][0]['id']) >= 801 && (info['weather'][0]['id']) <= 804){
            wIcon.src = "./icons/Weather Icons/cloud.svg"
        }
        else if(((info['weather'][0]['id']) >= 300 && (info['weather'][0]['id'])<= 321) || ((info['weather'][0]['id']) >= 500 && (info['weather'][0]['id']) <= 531)){
            wIcon.src = "./icons/Weather Icons/rain.svg"
        }
        temp.innerHTML =`Temperature: ${Math.floor((info['main']['temp']))}`;
        feels_like.innerHTML = `Feels like: ${Math.floor((info['main']['feels_like']))}`;
        humidity.innerHTML = `Humidity: ${Math.floor((info['main']['humidity']))}`;
        windSpeed.innerHTML = `Wind Speed: ${Math.floor((info['wind']['speed']))}`
        description.innerHTML = (info['weather'][0]['description'])
    }

}
} )
