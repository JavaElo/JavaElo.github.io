async function getWeather() {
  //document.querySelector(#IDOFYOURIMGTAG).className = "classname"

  const url = 'https://api.open-meteo.com/v1/forecast?latitude=36.1682&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&temperature_unit=fahrenheit&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=10&timezone=America/Chicago&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain'

    fetch(url)
    .then(response=> {
      if(!response.ok){
        throw new Error('Bad http response')
      }
      return response.json()
    })
    .then(data=> {
      arrData = data
      let weatherCodes=["Sunny", "Mostly", "Partly cloudy", "Overcast"]
      
      document.querySelector('#data').innerHTML += `<p class="fw-bold" style="text-align: center; font-size: 2rem"><i class="bi bi-thermometer-half" style="color: orange"></i>${Math.round(arrData.current.temperature_2m)}°F</p><p class="col-12" style="font-size: 2rem"><i class="bi bi-moisture" style="margin-left: 10%; color: blue"></i> ${arrData.current.relative_humidity_2m}%<i class="bi bi-cloud-sun-fill" style="margin-left: 27%; color: gray"></i> ${arrData.current.weather_code}<i class="bi bi-droplet-half" style="margin-left: 20%; color: blue"></i> ${arrData.hourly.precipitation_probability[0]}%</p><p style="text-align: center; font-size: 1.5rem"><i class="bi bi-calendar3" style="color: gray"></i>10-DAY FORECAST</p>`
      //traverse each array and display to page
      arrData.daily.temperature_2m_min.forEach((objValue, index)=> {
        document.querySelector("#data").innerHTML += `<p class="fw-bold" id="min${index}" style="text-align: center; font-size: 1.2rem">L ${Math.round(objValue)}</p>` //Documentation used for rounding numbers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
      })

      //Using index to put min and max in the same p tag, that way it displays on the same line
      arrData.daily.temperature_2m_max.forEach((objValue, index)=>{
        document.querySelector(`#min${index}`).innerHTML += ` ${Math.round(objValue)} H`
      })
      
      // document.getElementById("data").innerHTML = `<p class="fw-bold" style="text-align: center; font-size: 2rem">${arrData.current.temperature_2m}</p><p style="text-align: center;">${arrData.daily.temperature_2m_max}</p>`
    })

    
    
    
    // document.getElementById("data").innerHTML = `<p class="fw-bold" style="text-align: center; font-size: 2rem">${data.current.temperature_2m}</p><p style="text-align: center;">${data.daily.temperature_2m_max}</p>`
  
}
getWeather()



