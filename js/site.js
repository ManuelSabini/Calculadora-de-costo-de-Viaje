//Simulador de gastos en combustibles en viajes

// Constantes:
/* Fuentes: 
https://www.coches.net/consejos/que-gasta-mas-coche-o-moto
https://surtidores.com.ar/el-precio-del-gnc-aumentara-en-las-estaciones-de-servicio-a-partir-de-noviembre/
*/ 


//Creacion de Objetos, con sus respectivos metodos
class Viaje{
    constructor(){
        this.origen = undefined;
        this.destino = undefined;
        this.distancia = undefined;
    }
    nuevoOrigen(){
        this.origen = document.getElementById("desde").value.toUpperCase();   
    }
    nuevoDestino(){
        this.destino = document.getElementById("hasta").value.toUpperCase();   
    }
    async nuevaDistancia(){
        await apiInfoLocalidad(this.origen.slice(-12,-1),"origen_pos")
        await apiInfoLocalidad(this.destino.slice(-12,-1),"destino_pos")
        this.distancia = distanciaHaversine(JSON.parse(localStorage.getItem("origen_pos"))[0].centroide.lat,
        JSON.parse(localStorage.getItem("origen_pos"))[0].centroide.lon,
        JSON.parse(localStorage.getItem("destino_pos"))[0].centroide.lat,
        JSON.parse(localStorage.getItem("destino_pos"))[0].centroide.lon
        );
    }
}

class Vehiculo{
    constructor(){
        this.consumovehiculo = 0;
        this.preciocombustible = 0;
        this.velocidadprom = 0;
        //Consumo de combustible (L cada 100 Km)
        this.consumoxvehiculo = [
            {vehiculo: "MotoNafta", consumo: (3+6)/2}, //Moto
            {vehiculo: "AutoNafta", consumo: (4.5+10)/2}, //Auto Naftero
            {vehiculo: "AutoGasoil", consumo: (4.0+9.2)/2}, //Auto gasolero
            {vehiculo: "AutoGNC", consumo: 7.5}]; //Auto a GNC
        
        //Costo del litro/m3 de combustible ($/L (o M3))
        this.precioxcombustible = [
            {combustible: "Nafta", precio: (150.9+184.4)/2}, //Promedio precio Naftas
            {combustible: "Gasoil", precio: (169.9+218.9)/2}, //Promedio Precio Gasoil
            {combustible: "GNC", precio: 60}]; //Promedio precio GNC
        
        //Velocidad promedio segun vehiculo (Km/h)
        this.velocidadpromxvehiculo = [
            {vehiculo: "Moto", velocidadprom: 90}, //Velocidad promedio Moto
            {vehiculo: "Auto", velocidadprom: 110}];  //Velocidad promedio Auto
    }
    tipoVehiculo(){
        this.tipoTransporte = document.querySelector("#form2 input:checked").value;
    }
    tipoCombustible(){
        this.tipoMotor = document.querySelector("#form3 input:checked").value;
    }
        
    consumoStd(tipoVehiculo){
        this.consumovehiculo = this.consumoxvehiculo.find((el) => el.vehiculo == tipoVehiculo)["consumo"];
    }
    precioStd(tipoCombustible){
        this.preciocombustible = this.precioxcombustible.find((el) => el.combustible == tipoCombustible)["precio"];
    }
    velocidadProm(tipoVehiculo){
        this.velocidadprom = this.velocidadpromxvehiculo.find((el) => el.vehiculo == tipoVehiculo)["velocidadprom"];
    }
}

class Calculos{
    constructor(){
        this.totalCombustible = 0;
        this.totalGasto = 0;
        this.totalTiempoDelViaje = 0;
    }
    combustibleNecesario(distancia, consumoStd) {
        console.log("Combustible Necesario: "+(distancia * consumoStd /100).toFixed(2));
        this.totalCombustible = (distancia * consumoStd /100);
    }
    calculadoraGasto(combustibleNecesario, precioCombustible){ 
        console.log("Gasto en combustible "+ (combustibleNecesario * precioCombustible).toFixed(2));
        this.totalGasto = parseInt(combustibleNecesario * precioCombustible);
    }
    tiempo(velocidadProm, distancia){ 
        console.log("Tiempo estimado: " + (distancia/velocidadProm).toFixed(2));
        this.totalTiempoDelViaje = (distancia / velocidadProm).toFixed(2);
    }
}

//MODIFICACIONES DEL HTML
function InsertarCajaVehiculo() { 
    let botones = document.querySelector(".botones");
    botones.remove();
    let caja = document.createElement("div");
        caja.className = "container";
        caja.id = "cajaVehiculo";
    caja.innerHTML =   `<h2>Seleccione el vehiculo</h2>
                        <form id="form2">
                            <input type="radio" class="form-check-label" id="moto" name="tipoVehiculo" value="Moto">
                            <label class="form-check-label" for="moto">Moto</label><br>
                            <input type="radio" class="form-check-label" id="auto" name="tipoVehiculo" value="Auto">
                            <label for="auto" class="form-check-label">Auto</label><br>
                            <div class="botones"> 
                                <button type="submit" class="btn btn-primary" type="button">Siguiente</button>
                            </div>
                        </form>`
    document.querySelector("main").appendChild(caja);
}

function InsertarCajaCombustible() { 
    let botones = document.querySelector(".botones");
    botones.remove();
    let caja = document.createElement("div");
    caja.className = "container";
    caja.id = "cajaVehiculo";
    caja.innerHTML =   `<h2>Seleccione el tipo de combustible</h2>
                        <form id="form3">
                            <input type="radio" class="form-check-label" id="nafta" name="tipoCombustible" value="Nafta">
                            <label for="nafta" class="form-check-label">Nafta</label><br>
                            <input type="radio" class="form-check-label" id="gasoil" name="tipoCombustible" value="Gasoil">
                            <label for="gasoil" class="form-check-label">Gasoil</label><br>
                            <input type="radio" class="form-check-label" id="gnc" name="tipoCombustible" value="GNC">
                            <label for="gnc" class="form-check-label">GNC</label><br>
                            <div class="botones">
                                <button type="submit" class="btn btn-primary" type="button">Siguiente</button>
                            </div>
                        </form>`
    document.querySelector("main").appendChild(caja);
}

function InsertarCajaRespuesta() { 
    vehiculo.precioStd(vehiculo.tipoMotor);
    vehiculo.velocidadProm(vehiculo.tipoTransporte);
    vehiculo.consumoStd(vehiculo.tipoTransporte+vehiculo.tipoMotor);
    estimacion.combustibleNecesario(viaje.distancia, vehiculo.consumovehiculo);
    estimacion.calculadoraGasto(estimacion.totalCombustible, vehiculo.preciocombustible);
    estimacion.tiempo(vehiculo.velocidadprom, viaje.distancia);
    let botones = document.querySelector(".botones");
    botones.remove();
    let caja = document.createElement("div");
    caja.className = "container";
    caja.id = "cajaRespuesta";
    caja.innerHTML =   `<p>Su viaje entre las ciudades de ${viaje.origen} y ${viaje.destino}.</p>
                        <p>Distancia:  ${viaje.distancia} Km.</p>
                        <p>Consumo de combustible: ${estimacion.totalCombustible} Litros (o M3)</p>
                        <p>Costo: ${estimacion.totalGasto} Pesos Arg.</p>
                        <p>Precio del Litro de combustible (o M3): ${vehiculo.preciocombustible} $/L.</p>
                        <p>Tiempo estimado: ${estimacion.totalTiempoDelViaje} Horas</p>
                        <p>Proximamente boton compartir</p>
                        <p>Proximamente boton recomendar a un amigo</p>
                        <button type="button" class="btn btn-danger" id="limpiar" type="reset">Limpiar</button>`
    document.querySelector("main").appendChild(caja);
}

//Listeners y Funciones de cada Caja
function listenerCajaTravesia(){ 
    siguiente = document.querySelector("#form1 .btn-primary");
    siguiente.addEventListener("click",(e) => {
        e.preventDefault();
        console.log("Hiciste click en siguiente");
        viaje.nuevoOrigen();
        viaje.nuevoDestino();
        viaje.nuevaDistancia();
        //guardar en Local Storage
        let travesiaJSON = {"origen": viaje.origen, "destino": viaje.destino,"distancia": viaje.distancia};
        localStorage.setItem("travesia", JSON.stringify(travesiaJSON));
        //Insertar la siguiente caja
        InsertarCajaVehiculo();
        listenerCajaVehiculo();
    })
}

function listenerCajaVehiculo(){
    siguiente = document.querySelector("#form2 .btn-primary");
    siguiente.addEventListener("click",(e) => {
        e.preventDefault();
        console.log("Hiciste click en siguiente2");
        vehiculo.tipoVehiculo();
        //guardar en Local Storage
        vehiculoJSON = {"tipo": vehiculo.tipoTransporte};
        localStorage.setItem("vehiculo", JSON.stringify(vehiculoJSON));
        //Insertar la siguiente caja
        InsertarCajaCombustible();
        listenerCajaCombustible();
    })
}

function listenerCajaCombustible(){
    siguiente = document.querySelector("#form3 .btn-primary")
    siguiente.addEventListener("click",(e) => {
        e.preventDefault();
        console.log("Hiciste click en siguiente3");
        vehiculo.tipoCombustible();
        //Guardar en LocalStorage
        combustibleJSON = {"tipoCombustible": vehiculo.tipoMotor};
        localStorage.setItem("tipoCombustible", JSON.stringify(combustibleJSON));
        //Mostrar respuestas
        InsertarCajaRespuesta();
        listenerCajaRespuesta();
    })
}

function listenerCajaRespuesta(){
    limpiar = document.querySelector("#limpiar");
    limpiar.addEventListener("click", location.reload.bind(location));
}


//Creacion de Objetos
let viaje = new Viaje;
let vehiculo = new Vehiculo;
let estimacion = new Calculos;

let siguiente;

listenerCajaTravesia();


function listenerRecomendacion(campo){
    camposOrigenDestino = document.querySelector("#"+campo)
    camposOrigenDestino.addEventListener("keydown", ()=>{
        texto = document.getElementById(campo).value;
        texto.length > 3 ? apiLocalidades(texto,campo) : console.log("Inserte mas caracteres, para una mejor busqueda");
    })
}

listenerRecomendacion("desde");
listenerRecomendacion("hasta");

function recomendacionesBusqueda(respuesta,campo) { 
//    opcionesviejas = document.querySelector("option");
//    opcionesviejas.remove()
    respuesta.localidades.forEach(element => {
        opciones = document.createElement("option")
        console.log(`<option value="${element.nombre}, Provincia de ${element.provincia.nombre} (#${element.id})">`);
        opciones.setAttribute("value", `${element.nombre}, Provincia de ${element.provincia.nombre} (#${element.id})`);
        document.querySelector("#mostrarResultados"+campo).appendChild(opciones);
    })
}