//MODIFICACIONES DEL HTML
//Caja de consulta Vehiculo
function InsertarCajaVehiculo() {
    //Borra los botones y bloque los inputs de la caja anterior 
    let botones = document.querySelector(".botones");
    botones.remove();
    let inputDesde = document.querySelector("#desde");
    inputDesde.setAttribute("disabled","")
    let inputHasta = document.querySelector("#hasta");
    inputHasta.setAttribute("disabled","")
    //Inserta nueva caja
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

//Inserta caja de consulta tipo de Vehiculo que utiliza
function InsertarCajaCombustible() { 
    //Borra el boton de Siguiente de la caja anterior y desabilita los radios de la caja anterior para evitar cambios posteriores
    let botones = document.querySelector(".botones");
    botones.remove();
    let inputMoto = document.querySelector("#moto");
    inputMoto.setAttribute("disabled","")
    let inputHasta = document.querySelector("#auto");
    inputHasta.setAttribute("disabled","")
    let caja = document.createElement("div");
    //Crea e inserta caja de vehiculo
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

//Caja de respuestas
async function InsertarCajaRespuesta() {
    //Calcula los resultados
    await calculoDeResultados();
    //Elimina el boton de siguiente de la caja anterior, bloquea las respuestas del usuario en la caja anterior
    let botones = document.querySelector(".botones");
    botones.remove();
    let inputNafta = document.querySelector("#nafta");
    inputNafta.setAttribute("disabled","")
    let inputGasoil = document.querySelector("#gasoil");
    inputGasoil.setAttribute("disabled","")
    let inputAuto = document.querySelector("#gnc");
    inputAuto.setAttribute("disabled","")
    //Inserta respuestas
    let caja = document.createElement("div");
    caja.className = "container";
    caja.id = "cajaRespuesta";
    caja.innerHTML =   `<h2>Resultados</h2>
                        <p>Su viaje entre:</p> 
                        <p>${viaje.origen.slice(0,-14)}</p> 
                        <p>${viaje.destino.slice(0,-14)}</p>
                        <table class="table table-hover table-bordered table-sm">
                            <tbody>
                                <tr>
                                    <th>Distancia</th>
                                    <th>Consumo de combustible</th>
                                    <th>Costo</th>
                                    <th>Precio del Litro de combustible (o M3)</th>
                                    <th>Tiempo estimado</th>
                                </tr>
                                <tr>
                                    <td>${viaje.distancia} Km.</td>
                                    <td>${estimacion.totalCombustible} Litros (o M3)</td>
                                    <td>${estimacion.totalGasto} Pesos Arg.</td>
                                    <td>${vehiculo.preciocombustible} $/L.</td>
                                    <td>${estimacion.totalTiempoDelViaje} Horas</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>*Información calculada en base a distancia lineal</p>
                        <p>**El precio del combustible se calculo en base al promedio del precio de todas las estaciones de servicio de la provincia del origen seleccionado.</p>
                        <button type="button" class="btn btn-danger" id="limpiar" type="reset">Limpiar</button>`
    document.querySelector("main").appendChild(caja);
    listenerCajaRespuesta();
}

//Recomendaciones, añadir al HTML las opciones
let cant
function recomendacionesBusqueda(respuesta,campo) { 
    //Remover Opciones viejas
    cant = document.querySelectorAll("option").length
    for (let index = 0; index < cant; index++) {
        document.querySelector("option").remove();
    }
    //Añadir opciones nuevas post respuesta de API
    respuesta.localidades.forEach(element => {
        opciones = document.createElement("option");
        opciones.setAttribute("value", `${element.nombre}, Provincia de ${element.provincia.nombre} (#${element.id})`);
        document.querySelector("#mostrarResultados"+campo).appendChild(opciones);
    })
}