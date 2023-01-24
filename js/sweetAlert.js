//Advertencia generica. Frente a Errores a la hora de cargar datos.
async function alertaError(tipo,mensaje) {
    await Swal.fire({
        icon: 'error',
        title: tipo,
        text: mensaje,
        footer: 'La APP solo admite localidades de Argentina'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        };
})}