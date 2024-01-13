const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
let searchInputVal;

data =[];

async function getData(location,geo){
    let apiUrl
    if (geo !== undefined) {
        apiUrl = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=4b5073959af24601aa854137240901&q=${location},${geo}&days=3&aqi=yes&alerts=no`);

    } else {
        apiUrl = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=4b5073959af24601aa854137240901&q=${location}&days=3&aqi=yes&alerts=no`);
    }

    let finalResponse = await apiUrl.json()
    data= finalResponse;
    dayDate();
    displayData();
}
test()


function displayData(){
    let cols = `
    <div class="col-sm-12 col-lg-4 animate__animated animate__zoomIn animate__delay-1s">
        <div class="dayone h-100">
            <div class="card colorOp mb-3">
                <div class="card-header d-flex justify-content-between">
                    <span>${resultDay}</span>
                    <span>${data.forecast.forecastday[0].date}</span>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${data.location.name}</h5>
                  <div class="tempo d-flex justify-content-around">
                    <strong>${data.forecast.forecastday[0].day.maxtemp_c}<small>o</small>c</strong>
                  <img src="${data.forecast.forecastday[0].hour[0].condition.icon}" alt="">
                  </div>
                  <p>${data.forecast.forecastday[0].day.condition.text}</p>
                  <div class="icondetails d-flex mt-5 justify-content-around">
                    <div class="percentage d-flex">
                        <img src="imgs/icon-umberella@2x.png" alt="">
                        <span>${data.forecast.forecastday[0].hour[0].chance_of_rain}%</span>
                    </div>
                    <div class="wend d-flex">
                        <img src="imgs/icon-wind@2x.png" alt="">
                        <span>${data.current.wind_mph}km/h</span>
                    </div>
                    <div class="compass d-flex">
                        <img src="imgs/icon-compass@2x.png" alt="">
                        <span>${data.current.wind_dir}</span>
                    </div>
                  </div>
                </div>
        </div>
    </div>
</div>
<div class="col-sm-12 col-lg-4 animate__animated animate__zoomIn animate__delay-2s">
    <div class="dayone text-center">
        <div class="card colorOp mb-3">
            <div class="card-header">${days[(day+1 > 6) ? day = 0: day]}</div>
            <div class="card-body py-4">
                <img src="${data.forecast.forecastday[1].hour[1].condition.icon}" alt="">
                <div class="temp my-4">
                    <strong class="my-3 d-block card-title">${data.forecast.forecastday[1].day.maxtemp_c}<small>o</small>c</strong>
                    <strong class=" d-block card-title">${data.forecast.forecastday[1].day.mintemp_c}<small>o</small>c</strong>
                </div>
                <p class="card-title">${data.forecast.forecastday[1].day.condition.text}</p>
            </div>
    </div>
</div>
</div>
<div class="col-sm-12 col-lg-4 animate__animated animate__zoomIn animate__delay-3s">
<div class="dayone text-center">
    <div class="card colorOp mb-3">
        <div class="card-header">${days[(day+2 > 6) ? day = 0: day +2]}</div>
        <div class="card-body py-4">
            <img src="${data.forecast.forecastday[2].hour[2].condition.icon}" alt="">
            <div class="temp my-4">
                <strong class="my-3 d-block card-title">${data.forecast.forecastday[2].day.maxtemp_c}<small>o</small>c</strong>
                <strong class=" d-block card-title">${data.forecast.forecastday[2].day.mintemp_c}<small>o</small>c</strong>
            </div>
            <p class="card-title">${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
</div>
</div>
</div>`
    document.getElementById('rowData').innerHTML = cols
};
let day;
let days;
let resultDay;
function dayDate(){
    let dayData=  new Date(data.location.localtime);
    day = dayData.getDay();
    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    resultDay = days[day];
    

    console.log(day)
};
// // search
searchInput.addEventListener('input',function(){
    getData(searchInput.value)
})
function test(){
        navigator.geolocation.getCurrentPosition( async function(e){
        let  lat = e.coords.latitude;
        let long = e.coords.longitude;
        await getData(lat,long);
    })
    
}

// 






