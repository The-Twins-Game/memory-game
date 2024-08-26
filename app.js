document.addEventListener("DOMContentLoaded", () => {
  let vidas = 5; // Vidas del jugador.
  let puntuacion = 0; // Puntos del jugador.

  // Arreglo de cartas, cada una con su nombre e imagen.
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

  let cartasElegidas = []; // Cartas que el jugador ha seleccionado.
  let idsElegidos = []; // IDs de las cartas seleccionadas.
  let cartasGanadas = []; // Cartas que el jugador ha acertado.

  const tablero = document.querySelector(".grid");
  const mostrarVidas = document.querySelector("#result");
  const mostrarPuntuacion = document.querySelector("#score");

  // Actualiza la visualización de las vidas.
  function actualizarVidas() {
    mostrarVidas.textContent = "❤️".repeat(vidas);
  }

  // Crea el tablero mezclando las cartas y añadiéndolas al DOM.
  function crearTablero() {
    cartas.sort(() => 0.5 - Math.random()); // Mezcla las cartas.
    tablero.innerHTML = ""; // Limpia el tablero.
    cartas.forEach((_, index) => {
      const carta = document.createElement("div");
      carta.classList.add("card");
      carta.setAttribute("data-id", index);
      carta.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="images/factoriacard.png" alt="Card"></div>
          <div class="card-back"><img src="${cartas[index].imagen}" alt="Card"></div>
        </div>
      `;
      carta.addEventListener("click", voltearCarta); // Agrega el evento de clic.
      tablero.appendChild(carta); // Añade la carta al tablero.
    });
    actualizarVidas();
    mostrarPuntuacion.textContent = puntuacion;
  }

  // Verifica si las cartas seleccionadas son iguales.
  function verificarCoincidencia() {
    const todasLasCartas = document.querySelectorAll(".card");
    const [primeraId, segundaId] = idsElegidos;

    if (cartasElegidas[0] === cartasElegidas[1]) {
      cartasGanadas.push(cartasElegidas);
      puntuacion += 100;
      mostrarPuntuacion.textContent = puntuacion;
    } else {
      setTimeout(() => {
        todasLasCartas[primeraId].classList.remove("is-flipped");
        todasLasCartas[segundaId].classList.remove("is-flipped");
        alert("Intenta de nuevo");
        vidas--;
        actualizarVidas();
        if (vidas === 0) {
          alert("¡Juego terminado! Se han acabado tus vidas.");
          reiniciarJuego();
        }
      }, 500);
    }

    // Restablece las cartas elegidas y los IDs después de verificar la coincidencia
    cartasElegidas = [];
    idsElegidos = [];

    // Comprueba si el jugador ha ganado después de actualizar las variables
    if (cartasGanadas.length === cartas.length / 2) {
      setTimeout(() => {
        alert("¡Felicidades! Completaste el juego.");
        reiniciarJuego(); // Reinicia el juego después de ganar
      }, 500); // Usa setTimeout para dar tiempo a la última carta de voltearse antes de mostrar el mensaje de victoria
    }
  }

  // Maneja el volteo de la carta.
  function voltearCarta() {
    const idCarta = this.getAttribute("data-id");
    if (!idsElegidos.includes(idCarta)) {
      cartasElegidas.push(cartas[idCarta].nombre);
      idsElegidos.push(idCarta);
      this.classList.add("is-flipped");
      if (cartasElegidas.length === 2) {
        setTimeout(verificarCoincidencia, 500);
      }
    }
  }

  // Reinicia el juego desde el principio.
  function reiniciarJuego() {
    vidas = 10; // Restablece las vidas a 10
    puntuacion = 0;
    cartasGanadas = [];
    crearTablero();
  }

  crearTablero(); // Inicia el juego al cargar la página.
});
