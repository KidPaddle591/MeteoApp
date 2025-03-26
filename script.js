let donnees=[]
let date=""
let time=""
let current_temperature=""
let current_feelslike=""
let isday=""
let url ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m&current=temperature_2m,is_day,wind_speed_10m,wind_direction_10m,weather_code,precipitation,apparent_temperature&timezone=Europe%2FBerlin&forecast_hours=24"
let current_weather=""
let current_windspeed=""
let current_windsdirection=""
let daily_temperatureMax=""
let daily_temperatureMin=""
let current_precipitation=""

fetch (url)
    .then (function (response){
        return response.json()
    })
    .then (function(data){
        donnees=data
        console.log (donnees);
        let now=new Date();
        date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
        time = `${now.getHours().toString().padStart(2, '0')}h${now.getMinutes().toString().padStart(2, '0')}`

        current_temperature=donnees.current.temperature_2m;
        current_feelslike=donnees.current.apparent_temperature;
        isday = donnees.current.is_day;
        current_weather=donnees.current.weather_code
        current_windspeed= donnees.current.wind_speed_10m;
        current_windsdirection= donnees.current.wind_direction_10m;
        daily_temperatureMax=donnees.daily.temperature_2m_max;
        daily_temperatureMin=donnees.daily.temperature_2m_min;
        latitude=donnees.latitude;
        longitude=donnees.longitude;
        current_precipitation=donnees.current.precipitation

        DisplayDateTime();
        IsDay();
        currentWeatherCode();
        currentTemperature();
        currentWindspeed();
        rotateCompass(current_windsdirection);
        weatherhourly();
        weatherdaily();
        getCityFromCoords(latitude, longitude);
        currentPrecipitation();
    });
    /*.catch (function(erreur){
        console.log(erreur)
        document.getElementById("resultat").innerText="Erreur de chargement des données"
    })*/

function DisplayDateTime(){
    document.getElementById("date&time").innerHTML= `${date}<br>${time}`;
}

function IsDay(){
    if (isday==1){
        document.getElementById("isday").innerHTML=`<img src=assets/images/pictures/picto/jour.png alt="image-nuit">`
    } else {
        document.getElementById("isday").innerHTML=`<img src=assets/images/pictures/picto/nuit.png alt="image-nuit">`
    }
}

function currentWeatherCode(){
    if (current_weather == 0){
        document.getElementById("currentWeather").innerHTML=`<p>Ciel Clair</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/sun.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 1){
        document.getElementById("currentWeather").innerHTML=`<p>Principalement clair</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/sun.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 2){
        document.getElementById("currentWeather").innerHTML=`<p>Partiellement nuageux</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/suncloud.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 3){
        document.getElementById("currentWeather").innerHTML=`<p>Couvert</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/suncloud.jpg)`;
        document.body.classList.add("backgroundimage")

    }
    if (current_weather == 45){
        document.getElementById("currentWeather").innerHTML='<p>Brouillard</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/cloud.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 48){
        document.getElementById("currentWeather").innerHTML='<p>Brouillard givrant</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/cloud.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 51){
        document.getElementById("currentWeather").innerHTML='<p>Bruine légère</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 53){
        document.getElementById("currentWeather").innerHTML='<p>Bruine modérée</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 55){
        document.getElementById("currentWeather").innerHTML='<p>Bruine dense</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 56){
        document.getElementById("currentWeather").innerHTML='<p>Bruine verglacente légère</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 57){
        document.getElementById("currentWeather").innerHTML='<p>Bruine verglaçante dense</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 61){
        document.getElementById("currentWeather").innerHTML='<p>Pluie faible</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 63){
        document.getElementById("currentWeather").innerHTML='<p>Pluie modérée</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 65){
        document.getElementById("currentWeather").innerHTML='<p>Pluie forte</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 66){
        document.getElementById("currentWeather").innerHTML='<p>Pluie verglancante légère</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 67){
        document.getElementById("currentWeather").innerHTML='<p>Pluie verglacante forte</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 71){
        document.getElementById("currentWeather").innerHTML='<p>Chute de neige faible</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 73){
        document.getElementById("currentWeather").innerHTML='<p>Chute de neige modérée</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 75){
        document.getElementById("currentWeather").innerHTML='<p>Chute de neige intense</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 77){
        document.getElementById("currentWeather").innerHTML='<p>Grains de neige</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 80){
        document.getElementById("currentWeather").innerHTML='<p>Averses faibles</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 81){
        document.getElementById("currentWeather").innerHTML='<p>Averses modérées</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 82){
        document.getElementById("currentWeather").innerHTML='<p>Averses violentes</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/rain.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 85){
        document.getElementById("currentWeather").innerHTML='<p>Averses de neiges faibles</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 86){
        document.getElementById("currentWeather").innerHTML='<p>Averses de neige fortes</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/snow.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 95){
        document.getElementById("currentWeather").innerHTML='<p>Orage léger ou modéré</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/thunder.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 96){
        document.getElementById("currentWeather").innerHTML='<p>Orage avec grèle légère</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/thunder.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    if (current_weather == 99){
        document.getElementById("currentWeather").innerHTML='<p>Orage avec grèle forte</p><br><img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">';
        document.body.style.backgroundImage= `url(assets/images/pictures/bg/thunder.jpg)`;
        document.body.classList.add("backgroundimage")
    }
    //else {
    //    document.getElementById("currentWeather").innerHTML='<p>Impossible de recuperer les informations sur le temps</p>'
    //}
}

function currentTemperature(){
    document.getElementById("currentWeather").innerHTML+=`<p>${current_temperature}°C (feels like ${current_feelslike}°C)</p>`;
}

function currentWindspeed(){
    document.getElementById("currentWind").innerHTML+=`<p>${current_windspeed}km/h</p>`;
}

function rotateCompass(angle) {
    const image = document.getElementById("compass");
    image.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    console.log(image)
    console.log(angle)
}

function weatherhourly(){
    for (i=0; i<24; i++){
        let temperature_forecast_hourly = donnees.hourly.temperature_2m[i];
        let precipitation_forecast_hourly = donnees.hourly.precipitation[i];
        let hour = `${i}h00`;
        let div=document.getElementById("hourly");
        let card=document.createElement("div");
        if ((i)>=hours(time)){
            card.innerHTML=`
            <div class="d-flex">
                <img class="picto" src="assets/images/icons/thermometer.png" alt="thermometer">
                <p>${temperature_forecast_hourly}</p>
            </div>
            <div class="d-flex">
                <img class="picto" src="assets/images/icons/umbrella.png" alt="umbrella">
                <p>${precipitation_forecast_hourly}</p>
            </div>
            <p>${hour}</p>
            `;
            div.appendChild(card);
            card.classList.add("card");
        }
    }
};

function weatherdaily(){
    for (i=0; i<7; i++){
        let temperature_forecast_daily_max = donnees.daily.temperature_2m_max[i];
        let temperature_forecast_daily_min  = donnees.daily.temperature_2m_min[i];
        let date = donnees.daily.time[i];
        let dailypicto=""
        if (donnees.daily.weather_code[i] == 0){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/soleil.png">`;
        }
        if (donnees.daily.weather_code[i] == 1){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/soleil.png">`;
        }
        if (donnees.daily.weather_code[i] == 2){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/soleil.png">`;
        }
        if (donnees.daily.weather_code[i] == 3){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        }
        if (donnees.daily.weather_code[i] == 45){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        }
        if (donnees.daily.weather_code[i] == 48){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/couvert.png">`;
        }
        if (donnees.daily.weather_code[i] == 51){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 53){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 55){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 56){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 57){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 61){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 63){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 65){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 66){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 67){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 71){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 73){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 75){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige.png">`;
        }
        if (donnees.daily.weather_code[i] == 77){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 80){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 81){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 82){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/averse.png">`;
        }
        if (donnees.daily.weather_code[i] == 85){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 86){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/neige.png">`;
        }
        if (donnees.daily.weather_code[i] == 95){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/orage-mini.png">`;
        }
        if (donnees.daily.weather_code[i] == 96){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/orage.png">`;
        }
        if (donnees.daily.weather_code[i] == 99){
            dailypicto=`<img class="pictoWeather" src="assets/images/pictures/picto/orage.png">`;
        }

        let div=document.getElementById("daily");
        let card=document.createElement("div");
        if (time)
            card.innerHTML=`
        <p>${date}</p>
        ${dailypicto}
        <p>${temperature_forecast_daily_max}</p>
        <p>${temperature_forecast_daily_min}</p>
        `;
        div.appendChild(card);
        card.classList.add("card");
    }
};

function getCityFromCoords() {
    navigator.geolocation.getCurrentPosition(
        
        function(position) {
            console.log=("test1")
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            
        
            let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json";
        
            fetch(url, {
                headers: {
                'User-Agent': 'MyWeatherApp/1.0 (example@email.com)' // requis par Nominatim
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let address = data.address;
                let city = address.city || address.town || address.village || address.county;
                document.getElementById("locationCity").innerText = "Ville détectée : " + city;
            })
            .catch(function(error) {
                document.getElementById("locationCity").innerText = "Erreur lors de la récupération de la ville.";
                console.error(error);
            });
        },
        function(error) {
            document.getElementById("locationCity").innerText = "Géolocalisation refusée ou non disponible.";
            console.error(error.message);
        }
    );
}

function currentPrecipitation(){
    document.getElementById("currentPrecipitation").innerHTML+=`Cumul des précipiations journalières : ${current_precipitation} mm` 
}

function hours(timeStr) {
    let parts = timeStr.split('h');
    let h = parseInt(parts[0]);
    let m = parseInt(parts[1]);
    return h
}