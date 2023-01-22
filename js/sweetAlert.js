function alertaError(tipo,mensaje) {
    Swal.fire({
        icon: 'error',
        title: tipo,
        text: mensaje,
        footer: 'Solo son validas ciudades de Argentina'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        };
})}