//Advertencia generica. Frente a Errores a la hora de cargar datos.
async function alertaError(tipo,mensaje,mensaje2) {
    await Swal.fire({
        icon: 'error',
        title: tipo,
        text: mensaje,
        footer: mensaje2,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        };
})}