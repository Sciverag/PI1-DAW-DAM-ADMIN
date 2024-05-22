const contentContainer = document.querySelector(".content-container");
const tituloContenido = document.querySelector("#tituloContenido");
const selectGenero = document.querySelector("#generoContenido");
const filtroTipo = document.querySelector("#tipoContenido");
const ipServer = "http://172.30.198.206:8080";
//const ipServer = "http://127.0.0.1:8080";
const spinner = document.querySelector("#spinner");

function fetchContenido(titulo) {

  const generoSeleccionado = selectGenero.value;
  
 
    fetch(ipServer+"/contenido/")
      .then((res) => res.json())
      .then((data) => {
        for(let i=0;i<=data.length-1;i++){
          if(data[i].idGenero == generoSeleccionado || generoSeleccionado == "Todo"){
            if(data[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
              crearContenido(data[i]);
            }
          }
        }
        spinner.style.display = "none";
      })
      .catch(error => {
        spinner.style.display = "none";
        console.error(error);
      })
    
  }

  function fetchSeries(titulo){

    const generoSeleccionado = selectGenero.value;

      fetch(ipServer+"/serie/")
        .then((res) => res.json())
        .then((data) => {
          for(let i=0;i<=data.length-1;i++){
            if(generoSeleccionado == "Todo"){
              if(data[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
                crearContenido(data[i],'serie');
              }
            }
              
          }
          spinner.style.display = "none";
        })
        .catch(error => {
          spinner.style.display = "none";
          console.error(error);
        })
      
  }
  
  function fetchContenidos(titulo) {
    
    spinner.style.display = "block";
    fetchContenido(titulo);
    fetchSeries(titulo);
    
  }

  function crearContenido(contenido,tipo) {
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
  
    cardBack.appendChild(botonesContenido(contenido,tipo));
  
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    contentContainer.appendChild(flipCard);

  }

  function botonesContenido(contenido,tipo) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");


      const idContenido = contenido.id;
  
      const buttonContainer = document.createElement("button-container");
      buttonContainer.classList.add("button-container");

  
      const botonModificar = document.createElement("a");
      botonModificar.classList.add("button");
      botonModificar.addEventListener("click",function() {verContenido(idContenido,tipo)},false);
      botonModificar.textContent = "Modificar";


      buttonContainer.appendChild(botonModificar);


      const buttonContainerEliminar = document.createElement("button-container");
      buttonContainerEliminar.classList.add("button-container");

      const botonEliminar = document.createElement("a");
      botonEliminar.classList.add("button");
      botonEliminar.addEventListener("click",function() {eliminarContenido(idContenido,tipo)},false);
      botonEliminar.textContent = "Eliminar";

      buttonContainerEliminar.appendChild(botonEliminar);
  
      buttonsContainer.appendChild(buttonContainer);
      buttonsContainer.appendChild(buttonContainerEliminar);

      
  
    return buttonsContainer;
  }

  function verContenido(idContenido,tipoContenido){
    window.location.href = 'modificarContenido.html?idContenido='+encodeURIComponent(idContenido+'z'+tipoContenido);
  }

  function eliminarContenido(idContenido,tipo){
    fetch(ipServer+"/contenido/delete/"+idContenido ,{
      method: 'DELETE',
      mode: 'cors'
    }).catch(error => {
      spinner.style.display = "none";
      console.error(error);
    })
    actualizarListado();
    filtrarContenido();
  }

  function generarGeneros(){
    fetch(ipServer+"/genero/")
    .then((res) => res.json())
    .then((data) => {
      for(let i=0;i<data.length;i++){
        anyadirGenero(data[i]);
      }
    })
  }

  function anyadirGenero(genero){
    selectGenero.innerHTML += '<option value='+genero.id+'>'+genero.tipo+'</option>';
  }

  function filtrarContenido(){
    const tituloSeleccionado = tituloContenido.value;
    const tipo = filtroTipo.value; 
    console.log(tipo);
    actualizarListado();
    if(tipo == "Todo"){
      fetchContenidos(tituloSeleccionado);
    }else if(tipo == "Peliculas"){
      spinner.style.display = "block";
      sacarPeliculas(tituloSeleccionado);
    }else if(tipo == "Cortos"){
      spinner.style.display = "block";
      sacarCortos(tituloSeleccionado);
    }else if(tipo == "Capitulos"){
      spinner.style.display = "block";
      sacarCapitulos(tituloSeleccionado);
    }else{
      spinner.style.display = "block";
      fetchSeries(tituloSeleccionado);
    }
  }

  function sacarPeliculas(titulo){
    const generoSeleccionado = selectGenero.value;
    
   
      fetch(ipServer+"/contenido/pelicula/")
        .then((res) => res.json())
        .then((data) => {
          for(let i=0;i<=data.length-1;i++){
            if(data[i].idGenero == generoSeleccionado || generoSeleccionado == "Todo"){
              if(data[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
                crearContenido(data[i],'pelicula');
              }
            }
          }
          spinner.style.display = "none";
        })
        .catch(error => {
          spinner.style.display = "none";
          console.error(error);
        })
      
  }

  function sacarCortos(titulo){
    const generoSeleccionado = selectGenero.value;
   
      fetch(ipServer+"/contenido/corto/")
        .then((res) => res.json())
        .then((data) => {
          for(let i=0;i<=data.length-1;i++){
            if(data[i].idGenero == generoSeleccionado || generoSeleccionado == "Todo"){
              if(data[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
                crearContenido(data[i],'corto');
              }
            }
          }
          spinner.style.display = "none";
        })
        .catch(error => {
          spinner.style.display = "none";
          console.error(error);
        })
  }

  function sacarCapitulos(titulo){
    const generoSeleccionado = selectGenero.value;

    fetch(ipServer+"/contenido/capitulo/")
    .then((res) => res.json())
    .then((data) => {
      for(let i=0;i<=data.length-1;i++){
        if(data[i].idGenero == generoSeleccionado || generoSeleccionado == "Todo"){
          if(data[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
            crearContenido(data[i],'capitulo');
          }
        }
      }
      spinner.style.display = "none";
    })
    .catch(error => {
      spinner.style.display = "none";
      console.error(error);
    })
  }

  function actualizarListado(){
    contentContainer.innerHTML = '<div id="spinner" class="spinner-border text-light" role="status"><span class="visually-hidden">Cargando...</span></div>'
  }

  filtrarContenido("")
  generarGeneros()