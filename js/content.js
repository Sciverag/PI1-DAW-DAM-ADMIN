const contentContainer = document.querySelector(".content-container");
const ipServer = "http://172.30.198.206:8080";
//const ipServer = "http://127.0.0.1:8080"
const spinner = document.querySelector("#spinner");

function fetchContenido() {
 
    fetch(ipServer+"/contenido/")
      .then((res) => res.json())
      .then((data) => {
        for(let i=0;i<=data.length;i++){
            crearContenido(data[i]);
        }
        spinner.style.display = "none";
      })
      .catch(error => {
        spinner.style.display = "none";
        console.error(error);
      })
    
  }
  
  function fetchContenidos() {
    
    spinner.style.display = "block";
    fetchContenido();
    
  }

  function crearContenido(contenido) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    flipCard.appendChild(cardContainer);
  
    const card = document.createElement("div");
    card.classList.add("content-block");
  
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("img-container");
  
    const icon = document.createElement("img");
    icon.src = contenido.url_image;
  
    iconContainer.appendChild(icon);

  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = contenido.titulo;
  
    card.appendChild(iconContainer);
    card.appendChild(name);

  
    const cardBack = document.createElement("div");
    cardBack.classList.add("content-block-back");
  
    cardBack.appendChild(botonesContenido(contenido));
  
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    contentContainer.appendChild(flipCard);

  }

  function botonesContenido(contenido) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");


      const idContenido = contenido.id;
  
      const buttonContainer = document.createElement("button-container");
      buttonContainer.classList.add("button-container");

  
      const botonModificar = document.createElement("a");
      botonModificar.classList.add("button");
      botonModificar.addEventListener("click",function() {verContenido(idContenido)},false);
      botonModificar.textContent = "Modificar";


      buttonContainer.appendChild(botonModificar);


      const buttonContainerEliminar = document.createElement("button-container");
      buttonContainerEliminar.classList.add("button-container");

      const botonEliminar = document.createElement("a");
      botonEliminar.classList.add("button");
      botonEliminar.addEventListener("click",function() {eliminarContenido(idContenido)},false);
      botonEliminar.textContent = "Eliminar";

      buttonContainerEliminar.appendChild(botonEliminar);
  
      buttonsContainer.appendChild(buttonContainer);
      buttonsContainer.appendChild(buttonContainerEliminar);

      
  
    return buttonsContainer;
  }

  function verContenido(nombreUser){
    window.location.href = 'modificarContenido.html?idContenido='+encodeURIComponent(idContenido);
  }

  function eliminarContenido(idContenido){
    fetch(ipServer+"/contenido/delete/"+idContenido ,{
      method: 'DELETE',
    }).catch(error => {
      spinner.style.display = "none";
    })
  }

  fetchContenidos()