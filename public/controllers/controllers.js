document.getElementById('form').addEventListener('submit',async (e) =>{
    e.preventDefault();
    const city = document.getElementById('city').value;

    try{
        const response = await fetch(`/weather?city=${city}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)

        if(response.ok){
          return   document.getElementById('data-results').innerHTML =
            `<img src="${data.icon}" class="weather-icon" /> 
            <p> La temperatura es de ${data.temperature}ºC</p> <br>`
        }else{
            document.getElementById('data-results').innerHTML = `<p>Error: ${data.error}</p>`
        }

    }catch(error){
        document.getElementById('data-results').innerHTML = '<p>Error con los datos del tiempo</p>'

    }
} )





// `<p>El cielo está ${data.conditions} </p> <br>
//               La humedad es de ${data.humidity}%`

