const clientImageView = document.querySelector("#iconocliente");
const nombreUser = document.querySelector("#nombreUser");
const clientName = document.querySelector("#clientName");
const clientLastName = document.querySelector("#clientLastName");
const clientEmail = document.querySelector("#clientEmail");
const clientPassword = document.querySelector("#clientPassword");
const clientDomicilio = document.querySelector("#clientDomicilio");
const clientFechaNac = document.querySelector("#clientFechNac");
const clientNumTarjeta = document.querySelector("#clientNumTarjeta");
const clientIcon = document.querySelector("#clientIcon");
const clientCodPostal = document.querySelector("#clientCodPostal");
const mensajeResultado = document.querySelector("#mensaje_resultado");

const ipServer = "http://172.30.198.206:8080";
//const ipServer = "http://127.0.0.1:8080";
const nombreUsuario = obtenerParametro('nombreUser');
colocarInformacion();

function obtenerParametro(nombreUser){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreUser);
}

function colocarInformacion(){
    fetch(ipServer+"/usuario/"+nombreUsuario)
      .then((res) => res.json())
      .then((data) => {
        informacionUsuario(data);
      })
      .catch(error => {
        
      })
}

function informacionUsuario(usuario){
    nombreUser.value = usuario.nombreUsuario;
    clientName.value = usuario.nombre;
    clientLastName.value = usuario.apellido;
    clientEmail.value = usuario.email;
    clientPassword.value = usuario.contrasenya;
    clientDomicilio.value = usuario.domicilio;
    clientFechaNac.value = usuario.fechaNacimiento;
    clientNumTarjeta.value = usuario.num_tarjeta;
    clientIcon.value = usuario.url_imagen;
    clientImageView.src = usuario.url_imagen;
    clientCodPostal.value = usuario.cp;
}

function modificarCliente(){
    const Usuario = {
        'nombreUsuario': nombreUser.value,
        'nombre': clientName.value,
        'apellido': clientLastName.value,
        'email': clientEmail.value,
        'contrasenya': clientPassword.value,
        'domicilio': clientDomicilio.value,
        'fechaNacimiento': clientFechaNac.value,
        'num_tarjeta': clientNumTarjeta.value,
        'url_imagen': clientIcon.value,
        'cp': clientCodPostal.value
    };
    

    fetch(ipServer+"/usuario/update", {
        
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(Usuario),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
    .then((data) => {
        if(data == 1){
            mensajeResultado.innerHTML = "El Usuario se a actualizado correctamente";
        }
    })
    .catch(error => {
        mensajeResultado.innerHTML = "Ha ocurrido un error al actualizar el usuario";
        console.error(error);
    })
    
}


