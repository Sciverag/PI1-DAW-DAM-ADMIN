const clientImageView = document.querySelector("#iconocliente");
const clientUser = document.querySelector("#clientUser");
const clientName = document.querySelector("#clientName");
const clientLastName = document.querySelector("#clientLastName");
const clientEmail = document.querySelector("#clientEmail");
const clientPassword = document.querySelector("#clientPassword");
const clientDomicilio = document.querySelector("#clientDomicilio");
const clientFechaNac = document.querySelector("#clientFechNac");
const clientNumTarjeta = document.querySelector("#clientNumTarjeta");
const clientIcon = document.querySelector("#clientIcon");
const clientCodPostal = document.querySelector("#clientCodPostal");

//const ipServer = "http://172.30.198.206:8080";
const ipServer = "http://127.0.0.1:8080";
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
        clientUser.value = data.nombreUsuario;
        clientName.value = data.nombre;
        clientLastName.value = data.apellido;
        clientEmail.value = data.email;
        clientPassword.value = data.contrasenya;
        clientDomicilio.value = data.domicilio;
        clientFechaNac.value = data.fechaNacimiento;
        clientNumTarjeta.value = data.num_tarjeta;
        clientIcon.value = data.url_imagen;
        clientImageView.src = data.url_imagen;
        clientCodPostal.value = data.cp;
      })
      .catch(error => {
        
      })
}

function modificarCliente(){
    const Usuario = new Usuario();
    Usuario.append('nombreUsuario',clientUser.value);
    Usuario.append('nombre',clientName.value);
    Usuario.append('apellido',clientLastName.value);
    Usuario.append('email',clientEmail.value);
    Usuario.append('contrasenya',clientPassword.value);
    Usuario.append('domicilio',clientDomicilio.value);
    Usuario.append('fechaNacimiento',clientFechaNac.value);
    Usuario.append('num_tarjeta',clientNumTarjeta.value);
    Usuario.append('changedTs',null);
    Usuario.append('url_imagen',clientIcon.value);
    Usuario.append('cp',clientCodPostal.value);

    fetch(ipServer+"/usuario/update", {
        method: 'PUT',
        body: Usuario
    }).then(response => response.json())
    .catch(error => {

    })
    
}


