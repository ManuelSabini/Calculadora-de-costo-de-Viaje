//Simulador de gastos en combustibles en viajes
alert("Bienvenido, el siguiente es un simulador de gastos de viaje.\n\nSe le realizaran una serie de consultas sobre la travesia que va a realizar y al finalizar, obtendrá una estimación del coste que tendrá su viaje.\n\nPara continuar presione ACEPTAR.");
// Constantes:
/* Fuentes: 
https://www.coches.net/consejos/que-gasta-mas-coche-o-moto
https://surtidores.com.ar/el-precio-del-gnc-aumentara-en-las-estaciones-de-servicio-a-partir-de-noviembre/
*/ 
class Viaje{
    constructor(){
        this.origen = undefined;
        this.destino = undefined;
        this.distancia = undefined;
    }
    nuevoOrigen(){
        do {
            this.origen = prompt("Indique la ciudad de Origen").toUpperCase();
        } while (this.origen == "");        
    }
    nuevoDestino(){
        do {
            this.destino = prompt("Indique la ciudad de Destino").toUpperCase();
        } while (this.destino == "");
    }
    nuevaDistancia(){
        do {
            this.distancia = parseInt(prompt("Indique la distancia entre Origen y destino (KM)"));
        } while (isNaN(this.distancia));
    }
    descripcionViaje(){
        alert("Su viaje sera entre las ciudades de " + this.origen + " y " + this.destino + ".Distancia aproximada de "+ this.distancia + " Km");
    }
}

class Vehiculo{
    constructor(){
        this.consumovehiculo = 0;
        this.preciocombustible = 0;
        this.velocidadprom = 0;
        //Consumo de combustible (L cada 100 Km)
        this.consumoxvehiculo = [
            {vehiculo: 1, consumo: (3+6)/2}, //Moto
            {vehiculo: 2, consumo: (4.5+10)/2}, //Auto Naftero
            {vehiculo: 3, consumo: (4.0+9.2)/2}, //Auto gasolero
            {vehiculo: 4, consumo: 7.5}]; //Auto a GNC
        
        //Costo del litro/m3 de combustible ($/L (o M3))
        this.precioxcombustible = [
            {combustible: 1, precio: (150.9+184.4)/2}, //Promedio precio Naftas
            {combustible: 2, precio: (169.9+218.9)/2}, //Promedio Precio Gasoil
            {combustible: 3, precio: 60}]; //Promedio precio GNC
        
        //Velocidad promedio segun vehiculo (Km/h)
        this.velocidadpromxvehiculo = [
            {vehiculo: 1, velocidadprom: 90}, //Velocidad promedio Moto
            {vehiculo: 2, velocidadprom: 110}];  //Velocidad promedio Auto
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
    combustibleNecesario(distancia,consumoStd) {
        console.log("Combustible Necesario: "+(distancia * consumoStd /100).toFixed(2))
        this.totalCombustible = (distancia * consumoStd /100).toFixed(2);
    }
    calculadoraGasto(combustibleNecesario, precioCombustible){ 
        console.log("Gasto en combustible "+ (combustibleNecesario * precioCombustible).toFixed(2) )
        this.totalGasto = (combustibleNecesario * precioCombustible).toFixed(2);
    }
    tiempo(velocidadProm, distancia){ 
        console.log("Tiempo estimado: " + (distancia/velocidadProm).toFixed(2))
        this.totalTiempoDelViaje = (distancia / velocidadProm).toFixed(2);
    }
}

//Consultar Destino, Origen, Distancia

let viaje = new Viaje;
viaje.nuevoOrigen();
viaje.nuevoDestino();
viaje.nuevaDistancia();
viaje.descripcionViaje();

//Consulta Vehiculo
let tipoVehiculo;
let vehiculo = new Vehiculo;
let estimacion = new Calculos;

//Consulta Combustible
let tipoCombustible;
let errores = false;

do {
    errores = false;
    tipoVehiculo= parseInt(prompt("Seleccione el vehiculo: \n\n1- Moto \n\n2- Auto"));
    if (tipoVehiculo == 1){  //Si el tipo de vehiculo es MOTO por default se supone que la moto usa Nafta y que tiene un consumo propio de Moto naftera y una velocidad establecida
        vehiculo.consumoStd(tipoVehiculo);
        tipoCombustible = 1;
        vehiculo.precioStd(tipoCombustible);
        tipoVelocidad = tipoVehiculo;
        vehiculo.velocidadProm(tipoVelocidad);
    
    }else if (tipoVehiculo == 2){ //Si el vehiculo es Auto, el mismo puede ser Naftero, Gasolero o a GNC. Por ahora la velocidad esta fijada.
        do {
            errores = false;
            tipoCombustible = parseInt(prompt("Seleccione el tipo de combustible: \n\n1- Nafta \n\n2- Gasoil \n\n3- GNC"));
            //Seleccion del tipo de combustible utilizado y defincion del consumo
            if (tipoCombustible == 1) {
                vehiculo.consumoStd(2);
            } else if (tipoCombustible == 2) {
                vehiculo.consumoStd(3);
            } else if (tipoCombustible == 3) {
                vehiculo.consumoStd(4);
            } else {
                alert("Seleccione una opcion válida.");
                errores = true;
            }
        } while (errores);
        vehiculo.precioStd(tipoCombustible);
        tipoVelocidad = tipoVehiculo;
        vehiculo.velocidadProm(tipoVelocidad);
    }else{
        alert("Seleccione una Opcion Valida")
        errores = true;
    }
} while (errores);

//Hace calculo de las estimaciones de costo, consumo y tiempo estimado de viaje
estimacion.combustibleNecesario(viaje.distancia, vehiculo.consumovehiculo);

estimacion.calculadoraGasto(estimacion.totalCombustible, vehiculo.preciocombustible);

estimacion.tiempo(vehiculo.velocidadprom,viaje.distancia);

//Muestra resultado
alert("Su viaje entre las ciudades de " + viaje.origen + " y " + viaje.destino + ". \n\nDistancia: "+ viaje.distancia + " Km.\n\nConsumo de combustible: "+ estimacion.totalCombustible +" Litros (o M3)\n\n Costo: " + estimacion.totalGasto +" Pesos Arg.\n\nPrecio del Litro de combustible (o M3): "+ vehiculo.preciocombustible +"$/L\n\nTiempo estimado: " + estimacion.totalTiempoDelViaje + " Horas\n\n");