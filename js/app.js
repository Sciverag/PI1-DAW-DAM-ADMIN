const ipServer = "http://172.30.198.206:8080";
//const ipServer = "http://127.0.0.1:8080"

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.tablink').click();
});
function showAddContentForm() {
  document.getElementById('contentForm').style.display = 'block';
}

function addContent() {
  const title = document.getElementById('contentTitle').value;
  const director = document.getElementById('contentDirector').value;
  const year = document.getElementById('contentYear').value;
  fetch(ipServer + "/contenido/")
    .then(response => response.json())
    .then(json => console.log(json));
  console.log('Añadiendo contenido:', title, director, year);
}

function showAddClientForm() {
  document.getElementById('clientForm').style.display = 'block';
}

function addClient() {
  const nombre = document.getElementById('clientName');
  const contrasenya = document.getElementById('clientPassword');
  const apellido = document.getElementById('clientLastName');
  const email = document.getElementById('clientEmail');
  const usuario = document.getElementById('clientUser');

  const Usuario = {
    'nombreUsuario': usuario.value,
    'nombre': nombre.value,
    'apellido': apellido.value,
    'contrasenya': contrasenya.value,
    'email': email.value
  } 
  
  fetch(ipServer + "/usuario/",{
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(Usuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
  console.log('Añadiendo cliente: ',usuario, nombre, apellido , contrasenya , email);
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  const validUsers = [
    { username: 'root', password: 'root' },
    { username: 'pepanav', password: '1234' },
    { username: 'lunagarc', password: '1234' }
  ];

  const isValidUser = validUsers.some(user => user.username === username && user.password === password);

  if (isValidUser) {
    window.location.href = 'admin.html';
  } else {
    errorMessage.style.display = 'block';
  }
});



