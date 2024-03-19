let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = 'debbcd90196a7d04d57e2e353a2ab31f';
let difKelvin = 273.15


    document.getElementById('botonBusqueda').addEventListener('click' , () => {
        const ciudad = document.getElementById('ciudadEntrada').value
        if (ciudad) {
          fetchDatosClima(ciudad)
        }
    })

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
        const temperatura = data.main.temp
        const descripcion = data.weather[0].description

        const ciudadTitulo = document.createElement('h2')
        ciudadTitulo.textContent = ciudadNombre

        const temperaturaInfo = document.createElement('p')
        temperaturaInfo.classList.add('temp')
        temperaturaInfo.textContent = `La temperatura es: ${(temperatura - difKelvin).toFixed(1)}°C`

        const descripcionInfo = document.createElement('p')
        descripcionInfo.textContent = `La descripción metereologica es: ${descripcion}`

        divDatodsClimas.appendChild(ciudadTitulo)
        divDatodsClimas.appendChild(temperaturaInfo)
        divDatodsClimas.appendChild(descripcionInfo)   
    }
