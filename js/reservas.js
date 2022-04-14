const formulario = document.getElementById('formulario');

const userNombre = document.getElementById('userNombre');
const userApellido = document.getElementById('userApellido');
const userTelefono = document.getElementById('userTelefono');
const userMail = document.getElementById('userMail');
const userReserva = document.getElementById('userReserva');
const userCantidad = document.getElementById('userCantidad');

const alertSucces = document.getElementById('alertSucces');
const alertNombre = document.getElementById('alertNombre');
const alertApellido = document.getElementById('alertApellido');
const alertTelefono = document.getElementById('alertTelefono');
const alertMail = document.getElementById('alertMail');
const alertReserva = document.getElementById('alertReserva');
const alertCantidad = document.getElementById('alertCantidad');

const regUserNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserApellido = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserTelefono = /[0-9]/;
const regUserMail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
const regUserReserva = /[A-Za-z0-9]/;
const regUserCantidad = /[0-9]/;



const mostrarMensajeExitoso = () => {
    alertSucces.classList.remove('d-none');
    alertSucces.textContent = "Reserva enviada con éxito"
};
const mostrarMensajeError = (errores) => {
    errores.forEach((item) =>{
        item.tipo.classList.remove('d-none');
        item.tipo.textContent = item.msg;
    });
};

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let nuevaReserva = {
        fullname: formulario.children[0].value + ' ' + formulario.children[2].value,
        phone: formulario.children[4].value,
        mail: formulario.children[6].value,
        reserva: formulario.children[8].value,
        cant: formulario.children[10].value
    }
    localStorage.setItem('reserva', JSON.stringify(nuevaReserva));
 

    alertSucces.classList.add('d-none');



    document.addEventListener("DOMContentLoaded", () => {
        fetchData()
        if (localStorage.getItem('formulario')){
            formulario = JSON.parse(localStorage.getItem('formulario'))
        }
      });

    const errores = [];


    if (!regUserNombre.test(userNombre.value) || !userNombre.value.trim())  {
        userNombre.classList.add('is-invalid');

        errores.push({
            tipo: alertNombre,
            msg: "Formato no válido"
        });
        
    } else {
        userNombre.classList.remove('is-invalid');
        userNombre.classList.add('is-valid');
        alertNombre.classList.add('d-none');
    }

    if (!regUserApellido.test(userApellido.value) || !userApellido.value.trim()) {
        userApellido.classList.add('is-invalid');

        errores.push({
            tipo: alertApellido,
            msg: "Formato no válido"
        });
    }  else {
        userApellido.classList.remove('is-invalid');
        userApellido.classList.add('is-valid');
        alertApellido.classList.add('d-none');
    }    

    if (!regUserTelefono.test(userTelefono.value) || !userTelefono.value.trim()) {
        userTelefono.classList.add('is-invalid');

        errores.push({
            tipo: alertTelefono,
            msg: "Formato no válido"
        });
    }    else {
        userTelefono.classList.remove('is-invalid');
        userTelefono.classList.add('is-valid');
        alertTelefono.classList.add('d-none');
    }    


    if (!regUserMail.test(userMail.value) || !userMail.value.trim()) {
        userMail.classList.add('is-invalid');

        errores.push({
            tipo: alertMail,
            msg: "Formato no válido"
        });
    }  else {
        userMail.classList.remove('is-invalid');
        userMail.classList.add('is-valid');
        alertMail.classList.add('d-none');
    }    


    if (!regUserReserva.test(userReserva.value) || !userReserva.value.trim()) {
        userReserva.classList.add('is-invalid');

        errores.push({
            tipo: alertReserva,
            msg: "Formato no válido"
        });
    } else {
        userReserva.classList.remove('is-invalid');
        userReserva.classList.add('is-valid');
        alertReserva.classList.add('d-none');
    }    


    if (!regUserCantidad.test(userCantidad.value) || !userCantidad.value.trim()) {
        userCantidad.classList.add('is-invalid');

        errores.push({
            tipo: alertCantidad,
            msg: "Formato no válido"
        });
    }   else {
        userCantidad.classList.remove('is-invalid');
        userCantidad.classList.add('is-valid');
        alertCantidad.classList.add('d-none');
    }    


    if (errores.length !== 0){
        mostrarMensajeError(errores);
        return;
    }
    mostrarMensajeExitoso();
    formulario.reset();
});

