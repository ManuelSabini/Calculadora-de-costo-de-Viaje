//La pagina se conecta con una API de Argentina datos. Donde trae localidades por el nombre que completa el usuario en origen y destino

//API DE ARGENTINA
//https://apis.datos.gob.ar/georef/api/localidades?nombre=25
let respuesta
function apiLocalidades(busqueda,localizacion){
    fetch("https://apis.datos.gob.ar/georef/api/localidades?nombre="+busqueda)
    .then( response => response.json())
    .then( data => respuesta = data)
    .then( ()=>{
        console.log(respuesta);
        localStorage.setItem(localizacion,JSON.stringify(respuesta.localidades))}
        )
    .catch(() =>{
        respuesta = "La API no funciona, listado de ciudades no disponible";
        console.log(respuesta);
        })
    .finally(()=>{
        respuesta.localidades.forEach(element => {
            console.log(`${element.nombre}, Provincia de ${element.provincia.nombre}` )
    })})
}
    //https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md
    
    //Probar este requestAnimationFrame
    //http://router.project-osrm.org/table/v1/driving/13.388860,52.517037;13.397634,52.529407?annotations=distance,duration
    
