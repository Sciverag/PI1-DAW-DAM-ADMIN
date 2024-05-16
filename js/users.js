const userContainer = document.querySelector(".user-container");
//const ipServer = "http://172.30.198.206:8080";
const ipServer = "http://127.0.0.1:8080"
const spinner = document.querySelector("#spinner");

function fetchUsuario() {
 
    fetch(ipServer+"/usuario/")
      .then((res) => res.json())
      .then((data) => {
        for(let i=0;i<=data.length;i++){
            if(data[i].nombreUsuario=="root" || data[i].nombreUsuario=="pepanav" || data[i].nombreUsuario=="lunagarc"){
                console.log("admin");
            }else{
                crearUsuario(data[i]);
            }
        }
        spinner.style.display = "none";
      })
      .catch(error => {
        spinner.style.display = "none";
      })
    
  }
  
  function fetchUsuarios() {
    
    spinner.style.display = "block";
    fetchUsuario();
    
  }

  function crearUsuario(usuario) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    flipCard.appendChild(cardContainer);
  

    const card = document.createElement("div");
    card.classList.add("user-block");
  
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("img-container-user");
  
    const icon = document.createElement("img");
    icon.classList.add("logocircular");
    icon.src = usuario.url_imagen;
  
    iconContainer.appendChild(icon);

  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = usuario.nombreUsuario;
  
    card.appendChild(iconContainer);
    card.appendChild(name);

  
    const cardBack = document.createElement("div");
    cardBack.classList.add("user-block-back");
  
    cardBack.appendChild(botonesUsuario(usuario));
  
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    userContainer.appendChild(flipCard);

  }

  function botonesUsuario(usuario) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");


      const nombreUsuario = usuario.nombreUsuario;
  
      const buttonContainer = document.createElement("button-container");
      buttonContainer.classList.add("button-container");

  
      const botonModificar = document.createElement("a");
      botonModificar.classList.add("button");
      botonModificar.textContent = "Modificar";


      buttonContainer.appendChild(botonModificar);


      const buttonContainerEliminar = document.createElement("button-container");
      buttonContainerEliminar.classList.add("button-container");

      const botonEliminar = document.createElement("a");
      botonEliminar.classList.add("button");
      botonEliminar.textContent = "Eliminar";

      buttonContainerEliminar.appendChild(botonEliminar);
  
      buttonsContainer.appendChild(buttonContainer);
      buttonsContainer.appendChild(buttonContainerEliminar);

      
  
    return buttonsContainer;
  }

  fetchUsuarios()