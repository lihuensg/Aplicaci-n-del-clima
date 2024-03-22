let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = 'debbcd90196a7d04d57e2e353a2ab31f';
let difKelvin = 273.15
let marker = null;

let map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=6PVzPWjO5UOgN3axK9l6',
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);


  /*  document.getElementById('botonBusqueda').addEventListener('click' , () => {
        const ciudad = document.getElementById('ciudadEntrada').value
        if (ciudad) {
          fetchDatosClima(ciudad)
        }
    })*/

    document.getElementById('ciudadEntrada').addEventListener('input', () => {
      const ciudad = document.getElementById('ciudadEntrada').value.trim();
      if (ciudad) {
          fetchDatosClima(ciudad);
      }
  });

    function fetchDatosClima(ciudad) {
        fetch(`${urlBase}?q=${ciudad}&appid=${api_key}&lang=es`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No se encontró la ciudad');
            }
            return respuesta.json();
        })
        .then(data => mostrarDatosClima(data))
        .catch(error => mostrarError(error.message));
    }

    function mostrarError(mensaje) {
        const divDatosClimas = document.getElementById('datosClima');
        divDatosClimas.innerHTML = '';
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje;
        divDatosClimas.appendChild(mensajeError);
    }

    function mostrarDatosClima(data){
        const divDatodsClimas = document.getElementById('datosClima')
        divDatodsClimas.innerHTML=''

        const ciudadNombre = data.name
        const paisNombre = data.sys.country
        const temperatura = data.main.temp
        const descripcion = data.weather[0].description
        const humedad = data.main.humidity
        const latitud = data.coord.lat
        const longitud = data.coord.lon
        //const icono = data.weather[0].icon

        const ciudadTitulo = document.createElement('h2')
        ciudadTitulo.textContent = `${ciudadNombre},${paisNombre}`

        const temperaturaInfo = document.createElement('p')
        temperaturaInfo.classList.add('temp')
        temperaturaInfo.textContent = `La temperatura es: ${(temperatura - difKelvin).toFixed(1)}°C`

        const humedadInfo = document.createElement('p')
        humedadInfo.textContent = `La humedad es: ${humedad}%`

        const iconoInfo = document.createElement('img')
        iconoInfo.src=`https://openweathermap.org/img/wn/10d@2x.png`

        const descripcionInfo = document.createElement('p')
        descripcionInfo.textContent = `La descripción metereológica es: ${descripcion}`
        

        //const latitudInfo = document.createElement('p')
        //latitudInfo.textContent = `La latitud es: ${latitud}`
        
      //  const longitudInfo = document.createElement('p')
      //  longitudInfo.textContent = `La longitud es: ${longitud}`

        divDatodsClimas.appendChild(ciudadTitulo)
        divDatodsClimas.appendChild(temperaturaInfo)
        divDatodsClimas.appendChild(humedadInfo) 
        divDatodsClimas.appendChild(iconoInfo)  
        divDatodsClimas.appendChild(descripcionInfo)
       // divDatodsClimas.appendChild(latitudInfo)  
       // divDatodsClimas.appendChild(longitudInfo)  
       
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([latitud,longitud]).addTo(map)
        map.setView([latitud, longitud], 12);
    }
