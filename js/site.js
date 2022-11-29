//Simulador de gastos en combustibles en viajes
alert("Bienvenido, el siguiente es un simulador de gastos de viaje.\n\nSe le realizaran una serie de consultas sobre la travesia que va a realizar y al finalizar, obtendrá una estimación del coste que tendrá su viaje.\n\nPara continuar presione ACEPTAR.");
// Constantes:
//Consumo de combustible (L cada 100 Km)
/* Fuentes: 
https://www.coches.net/consejos/que-gasta-mas-coche-o-moto
https://surtidores.com.ar/el-precio-del-gnc-aumentara-en-las-estaciones-de-servicio-a-partir-de-noviembre/
*/
const consumoMoto = (3+6)/2;
const consumoAutoNaftero = (4.5+10)/2;
const consumoAutoGasolero = (4.0+9.2)/2;
const consumoAutoGNC = 7.5;


//Costo del litro/m3 de combustible ($/L (o M3))
const precioNafta = (150.9+184.4)/2;
const precioGasoil = (169.9+218.9)/2;
const precioGNC = 60;

//Velocidad promedio (Km/h)
const velocidadProm = 90

// Ingreso de Origen, destino y distancia
function seleccionOrigen(){
    return prompt("Indique la ciudad de Origen").toUpperCase();
}

function seleccionDestino(){
    return prompt("Indique la ciudad de Destino").toUpperCase();
}

function seleccionDistancia(){
    return parseInt(prompt("Indique la distancia entre Origen y destino (KM)"));
}

//Seleccion de tipo de vehiculo

function seleccionVehiculo() {
        let vehiculo = parseInt(prompt("Seleccione el vehiculo: \n\n1- Moto \n\n2- Auto"));
        return vehiculo;
}

function consumoStd(vehiculo) {
    switch (vehiculo) {
        case 9: //Moto
        console.log("Consumo Std Moto: " + consumoMoto + "Km x L")
        return consumoMoto;
        case 1: //Auto Naftero
        console.log("Consumo Std Auto Naftero: " + consumoAutoNaftero + "Km x L")
        return consumoAutoNaftero;
        case 2: //Auto Gasolero
        console.log("Consumo Std Auto Gasolero: " + consumoAutoGasolero + "Km x L")
        return consumoAutoGasolero;
        case 3: //Auto GNC
        console.log("Consumo Std Auto GNC: " + consumoAutoGNC + "Km x M3")
        return consumoAutoGNC; 
        default:
            alert("Seleccione una opcion válida.");
    }
}

function seleccionCombustible() {
        let vehiculo = parseInt(prompt("Seleccione el tipo de combustible: \n\n1- Nafta \n\n2- Gasoil \n\n3- GNC"));
        return vehiculo;
}

//Tipo de Combustible
function precioCombustible(tipoCombustible){
    switch (tipoCombustible) {
        case 1: //Nafta
        console.log("Nafta: "+ precioNafta +" $/L");
        return precioNafta;
        
        case 2: //Gasoil
        console.log("Gasoil: "+ precioGasoil +" $/L");
        return precioGasoil;
        
        case 3: //GNC
        console.log("GNC: "+ precioGNC +" $/M3");
        return precioGNC;
    }
}

//Calculo de gastos
function combustibleNecesario(distancia,consumoStd) {
    console.log("Combustible Necesario: "+(distancia * consumoStd /100).toFixed(2))
    return (distancia * consumoStd /100).toFixed(2);
}

function calculadoraGasto(combustibleNecesario, precioCombustible){ 
    console.log("Gasto en combustible "+ (combustibleNecesario * precioCombustible).toFixed(2) )
    return (combustibleNecesario * precioCombustible).toFixed(2);
}

function tiempo(velocidadProm, distancia){ 
    console.log("Tiempo estimado: " + (distancia/velocidadProm).toFixed(2))
    return (distancia / velocidadProm).toFixed(2);
}

//Consultar Destino, Origen, Distancia
let origen;
let destino;
let distancia;

do {
    origen = seleccionOrigen();
} while (origen == "");

do {
    destino = seleccionDestino();
} while (destino == "");

do {
    distancia = seleccionDistancia();
} while (isNaN(distancia));

alert("Su viaje sera entre las ciudades de " + origen + " y " + destino + ".Distancia aproximada de "+ distancia + " Km");

//Consulta Vehiculo
let vehiculo

//Consulta Combustible
let combustible;
let precioCombustibleUtilizado;
let consumoVehiculo;

do {
    vehiculo = seleccionVehiculo();
    if (vehiculo == 1){
        combustible = 1;
        precioCombustibleUtilizado = precioCombustible(combustible);
        let consumo = 9;
        
        consumoVehiculo = consumoStd(consumo);
    
    }else if (vehiculo == 2){ 
        do {
            combustible = seleccionCombustible();
            precioCombustibleUtilizado = precioCombustible(combustible);
            consumoVehiculo = consumoStd(combustible);
        } while (isNaN(precioCombustibleUtilizado)||isNaN(consumoVehiculo));
    }else{
        alert("Seleccione una Opcion Valida")
    }
} while (isNaN(precioCombustibleUtilizado)||isNaN(consumoVehiculo));

let totalCombustible = combustibleNecesario(distancia, consumoVehiculo);

let totalGasto= calculadoraGasto(totalCombustible, precioCombustibleUtilizado);

let totalTiempoDelViaje = tiempo(velocidadProm,distancia);

//Muestra resultado
alert("Su viaje entre las ciudades de " + origen + " y " + destino + ". \n\nDistancia: "+ distancia + " Km.\n\nConsumo de combustible: "+ totalCombustible +" Litros (o M3)\n\n Costo: " + totalGasto +" Pesos Arg.\n\nPrecio del Litro de combustible (o M3): "+ precioCombustibleUtilizado +"$/L\n\nTiempo estimado: " + totalTiempoDelViaje + " Horas\n\n")