//La pagina se conecta con una API de Argentina datos. Donde trae localidades por el nombre que completa el usuario en origen y destino

//API DE ARGENTINA
//https://apis.datos.gob.ar/georef/api/localidades?nombre=25
let respuesta;
let opciones;
let opcionesLista;
let opcionesviejas;
let recomendaciones;
let element;

//Busca posibles resultados
async function apiLocalidades(busqueda,campo){
    await fetch("https://apis.datos.gob.ar/georef/api/localidades?nombre="+busqueda+"&campos=nombre,id,provincia.nombre")
        .then( response => response.json())
        .then( data => recomendacionesBusqueda(data,campo))
        .catch( () =>{
            respuesta = "La API no funciona, listado de ciudades no disponible";
            console.log(respuesta);
        })
}

//Busca las coordenadas del lugar elegido
async function apiInfoLocalidad(id,localizacion){
    await fetch("https://apis.datos.gob.ar/georef/api/localidades?id="+id+"&campos=nombre,id,provincia.nombre,centroide")
        .then( response => response.json())
        .then( data => respuesta = data)
        .then( ()=>{
            console.log(respuesta);
            if (respuesta.total != 1) {
                alertaError("Localidades Desconocidas","Selecciones una de las localidades que se le sugieren en la lista de opciones","La APP solo admite localidades de Argentina")
            } else {
                localStorage.setItem(localizacion,JSON.stringify(respuesta.localidades))}
            }
            )
        .catch(() =>{
            respuesta = "La API no funciona, listado de ciudades no disponible";
            console.log(respuesta);
            localStorage.setItem(localizacion,JSON.stringify(respuesta))
        })
}

//Calculadora de DISTANCIA usando la formaula de Haversine (Calcula la distancia lineal, la API de google es paga)
//https://www.movable-type.co.uk/scripts/latlong.html
function distanciaHaversine(lat1,lon1,lat2,lon2){
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return (R * c / 1000).toFixed(2); // En Kilometros
}