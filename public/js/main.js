
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Please write the name to search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=ec8e09a4253dffdf1f51a24d4097a946`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            // Convert temperature from Kelvin to Celsius
            const tempInKelvin = arrData[0].main.temp;
            const tempInCelsius = (tempInKelvin - 273.15).toFixed(2); // Rounding to 2 decimal places

            temp_real_val.innerText = `${tempInCelsius}`;

            const tempMood = arrData[0].weather[0].main;

            // Condition to check weather status and set appropriate icon
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-cloud' style='color:#fff;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
            } else if (tempMood == "Mist") {
                temp_status.innerHTML =
                    "<i class='fas fa-weather' style='color:#fff;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-smog' style='color:#a4b0cc;'></i>";
            }

            datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = `No such city`;
            datahide.classList.add('data_hide');
        }
    }
};

submitBtn.addEventListener('click', getInfo);
