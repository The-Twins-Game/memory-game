document.addEventListener("DOMContentLoaded", () => {
  let currentLevel = 1;
  let lives = 5; // Inicializamos el juego con 5 vidas.
  let score = 0; // Inicializamos el puntaje en 0.

  const levels = {
    1: [
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
    ],
    2: [
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
    ],
    3: [
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
      { name: "gokuUL", img: "./images/CardImg/gokuUL.jpg" },
      { name: "FreezerER", img: "./images/CardImg/FreezER.jpg" },
      { name: "veguetaEGO", img: "./images/CardImg/veguetEGO.jpg" },
      { name: "Cell", img: "./images/CardImg/Cell1.jpg" },
      { name: "Broly", img: "./images/CardImg/BrolySJ.png" },
      { name: "picolo", img: "./images/CardImg/piccolo.jpg" },
    ],
  };

  let cardArray = levels[currentLevel];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result"); // Elemento para mostrar las vidas.
  const scoreDisplay = document.querySelector("#score"); // Elemento para mostrar el puntaje.

  // Función para actualizar la visualización de las vidas con corazones
  function updateLivesDisplay() {
    resultDisplay.textContent = "❤️".repeat(lives); // Muestra corazones según la cantidad de vidas
  }

  // Crea el tablero de juego
  function createBoard() {
    cardArray.sort(() => 0.5 - Math.random());
    grid.innerHTML = "";
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", i);
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="images/factoriacard.png" alt="Card"></div>
          <div class="card-back"><img src="${cardArray[i].img}" alt="Card"></div>
        </div>
      `;
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
    updateLivesDisplay(); // Muestra las vidas restantes como corazones
    scoreDisplay.textContent = score; // Muestra el puntaje
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cardsWon.push(cardsChosen);
      score += 100; // Sumar 100 puntos por un match
      scoreDisplay.textContent = score; // Actualiza el puntaje mostrado en pantalla
    } else {
      setTimeout(() => {
        cards[optionOneId].classList.remove("is-flipped");
        cards[optionTwoId].classList.remove("is-flipped");
        alert("Sorry, try again");
        lives--; // Resta una vida
        updateLivesDisplay(); // Actualiza las vidas mostradas en pantalla como corazones
        if (lives === 0) {
          alert("Game Over! You've lost all your lives.");
          resetGame(); // Reinicia el juego
          return; // Termina el juego si se pierden todas las vidas
        }
      }, 500);
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
      if (currentLevel < 3) {
        alert("Level complete! Moving to the next level.");
        currentLevel++;
        resetLevel(); // Reinicia las vidas y crea el tablero para el nuevo nivel
      } else {
        resultDisplay.textContent =
          "Congratulations! You completed all levels!";
      }
    }
  }

  // Función para voltear la carta
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.classList.add("is-flipped");
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Función para reiniciar el nivel
  function resetLevel() {
    lives = 5; // Restablece las vidas
    score = 0; // Restablece el puntaje
    cardsWon = []; // Borra las cartas ganadas
    cardArray = levels[currentLevel]; // Actualiza el array de cartas según el nivel actual
    createBoard(); // Crea el tablero para el nuevo nivel
  }

  // Función para reiniciar el juego
  function resetGame() {
    currentLevel = 1;
    resetLevel(); // Restablece el nivel inicial y las vidas
  }

  createBoard();
});
