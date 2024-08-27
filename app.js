document.addEventListener("DOMContentLoaded", () => {
  // Espera a que el DOM esté completamente cargado antes de ejecutar el código.

  let vidas = 5; // Inicializa las vidas del jugador en 5.
  let puntuacion = 0; // Inicializa la puntuación del jugador en 0.

  // Arreglo de objetos que representan las cartas del juego, cada una con un nombre e imagen.
  const cartas = [
    { nombre: "Goku", imagen: "./images/CardImg/gokuUL.jpg" },
    { nombre: "Freezer", imagen: "./images/CardImg/FreezER.jpg" },
    { nombre: "Vegeta", imagen: "./images/CardImg/veguetEGO.jpg" },
    { nombre: "Cell", imagen: "./images/CardImg/Cell1.jpg" },
    { nombre: "Broly", imagen: "./images/CardImg/BrolySJ.png" },
    { nombre: "Piccolo", imagen: "./images/CardImg/piccolo.jpg" },
    { nombre: "Goku", imagen: "./images/CardImg/gokuUL.jpg" },
    { nombre: "Freezer", imagen: "./images/CardImg/FreezER.jpg" },
    { nombre: "Vegeta", imagen: "./images/CardImg/veguetEGO.jpg" },
    { nombre: "Cell", imagen: "./images/CardImg/Cell1.jpg" },
    { nombre: "Broly", imagen: "./images/CardImg/BrolySJ.png" },
    { nombre: "Piccolo", imagen: "./images/CardImg/piccolo.jpg" },
  ];
  //Un array es una estructura de datos que se utiliza para almacenar una colección de elementos, generalmente del mismo tipo, en una única variable.
  let cartasElegidas = []; // Arreglo para almacenar las cartas que el jugador ha seleccionado.
  let idsElegidos = []; // Arreglo para almacenar los IDs de las cartas seleccionadas.
  let cartasGanadas = []; // Arreglo para almacenar las cartas que el jugador ha acertado (parejas correctas).

  const tablero = document.querySelector(".grid");
  // Selecciona el elemento del DOM donde se mostrará el tablero de cartas.

  const mostrarVidas = document.querySelector("#result");
  // Selecciona el elemento del DOM donde se mostrarán las vidas restantes.

  const mostrarPuntuacion = document.querySelector("#score");
  // Selecciona el elemento del DOM donde se mostrará la puntuación del jugador.

  //FUNCION ACTUALIZARVIDAS
  // Función que actualiza la visualización de las vidas en la interfaz.
  function actualizarVidas() {
    mostrarVidas.textContent = "❤️".repeat(vidas);
    // Actualiza el texto del elemento con tantos corazones como vidas queden.
  }

  //FUCNION CREAR TABLERO
  // Función que crea y muestra el tablero mezclando las cartas.
  function crearTablero() {
    cartas.sort(() => 0.5 - Math.random());
    // Mezcla aleatoriamente las cartas.

    tablero.innerHTML = "";
    // Limpia el contenido del tablero.

    //ignorar el valor _
    cartas.forEach((_, index) => {
      // Recorre cada carta y su índice para crear y mostrar cada carta en el tablero.
      const carta = document.createElement("div");
      // Crea un nuevo elemento <div> para representar la carta.

      carta.classList.add("card");
      // Añade la clase "card" al <div> creado.

      carta.setAttribute("data-id", index);
      // Asigna un atributo "data-id" a la carta con su índice correspondiente.

      carta.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="images/factoriacard.png" alt="Card"></div>
          <div class="card-back"><img src="${cartas[index].imagen}" alt="Card"></div>
        </div>
      `;
      // Establece la estructura HTML de la carta, con un frente y un reverso.

      carta.addEventListener("click", voltearCarta);
      // Agrega un evento de clic a la carta para que se voltee cuando se haga clic en ella.

      tablero.appendChild(carta);
      // Añade la carta creada al tablero.
    });

    actualizarVidas();
    // Llama a la función para actualizar la visualización de las vidas.

    mostrarPuntuacion.textContent = puntuacion;
    // Muestra la puntuación inicial (0) en la interfaz.
  }

  //FUNCION VERIFICACOINCIDENCIA
  // Función que verifica si las dos cartas seleccionadas son iguales.
  function verificarCoincidencia() {
    const todasLasCartas = document.querySelectorAll(".card");
    // Selecciona todas las cartas en el tablero.

    const [primeraId, segundaId] = idsElegidos;
    // Desestructura los IDs de las dos cartas seleccionadas.

    if (cartasElegidas[0] === cartasElegidas[1]) {
      // Verifica si los nombres de las dos cartas seleccionadas son iguales.
      cartasGanadas.push(cartasElegidas);
      // Si son iguales, añade las cartas seleccionadas al arreglo de cartas ganadas.

      puntuacion += 100;
      // Aumenta la puntuación del jugador en 100 puntos.

      mostrarPuntuacion.textContent = puntuacion;
      // Actualiza la puntuación mostrada en la interfaz.
    } else {
      // Si las cartas no son iguales...
      setTimeout(() => {
        // Espera 500 ms antes de ejecutar el siguiente bloque de código.

        todasLasCartas[primeraId].classList.remove("is-flipped");
        // Remueve la clase "is-flipped" de la primera carta, volteándola nuevamente.

        todasLasCartas[segundaId].classList.remove("is-flipped");
        // Remueve la clase "is-flipped" de la segunda carta.

        alert("Intenta de nuevo");
        // Muestra un mensaje pidiendo al jugador que intente nuevamente.

        vidas--;
        // Resta una vida al jugador.

        actualizarVidas();
        // Actualiza la visualización de las vidas.

        if (vidas === 0) {
          // Si el jugador se queda sin vidas...
          alert("¡Juego terminado! Se han acabado tus vidas.");
          // Muestra un mensaje de fin de juego.

          reiniciarJuego();
          // Reinicia el juego desde el principio.
        }
      }, 500);
      // Ejecuta este bloque de código después de 500 ms.
    }

    // Restablece las cartas e IDs elegidos después de verificar la coincidencia.
    cartasElegidas = [];
    idsElegidos = [];

    if (cartasGanadas.length === cartas.length / 2) {
      // Verifica si el jugador ha ganado, es decir, si ha encontrado todas las parejas.
      setTimeout(() => {
        // Espera 500 ms antes de mostrar el siguiente mensaje.

        alert("¡Felicidades! Completaste el juego.");
        // Muestra un mensaje de felicitación por completar el juego.

        reiniciarJuego();
        // Reinicia el juego después de ganar.
      }, 500);
      // Espera 500 ms para que la última carta se voltee antes de mostrar el mensaje.
    }
  }

  //FUNCION VOLTEARCARTA
  // Función que maneja el volteo de las cartas.
  function voltearCarta() {
    const idCarta = this.getAttribute("data-id");
    // Obtiene el ID de la carta que se ha clicado.

    if (!idsElegidos.includes(idCarta)) {
      // Verifica que la carta clicada no haya sido ya seleccionada.
      cartasElegidas.push(cartas[idCarta].nombre);
      // Añade el nombre de la carta seleccionada al arreglo de cartas elegidas.

      idsElegidos.push(idCarta);
      // Añade el ID de la carta seleccionada al arreglo de IDs elegidos.

      this.classList.add("is-flipped");
      // Añade la clase "is-flipped" para voltear la carta.

      if (cartasElegidas.length === 2) {
        // Si se han seleccionado dos cartas...
        setTimeout(verificarCoincidencia, 500);
        // Verifica si las dos cartas coinciden después de 500 ms.
      }
    }
  }

  //FUNCION REINICIARJUEGO
  // Función que reinicia el juego desde el principio.
  function reiniciarJuego() {
    vidas = 5; // Restablece las vidas del jugador a 5.
    puntuacion = 0; // Restablece la puntuación a 0.
    cartasGanadas = []; // Vacía el arreglo de cartas ganadas.
    crearTablero(); // Vuelve a crear el tablero mezclando las cartas.
  }

  //FUNCION CREATABLERO
  crearTablero();
  // Llama a la función para iniciar el juego al cargar la página.
});
