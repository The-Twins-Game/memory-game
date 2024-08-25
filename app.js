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
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
    ],
    3: [
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "sushi", img: "images/factoriacard-Photoroom.jpg" },
      { name: "steak", img: "images/factoriacard-Photoroom.jpg" },
      { name: "sushi", img: "images/factoriacard-Photoroom.jpg" },
      { name: "steak", img: "images/factoriacard-Photoroom.jpg" },
    ],
  };



  let cardArray = levels[currentLevel];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result"); // Elemento para mostrar las vidas.
  const scoreDisplay = document.querySelector("#score");   // Elemento para mostrar el puntaje.

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
    resultDisplay.textContent = lives;  // Muestra las vidas restantes.
    scoreDisplay.textContent = score;   // Muestra el puntaje.
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
  
    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cardsWon.push(cardsChosen);
      score += 100; // Sumar 100 puntos por un match.
      scoreDisplay.textContent = score; // Actualiza el puntaje mostrado en pantalla.
    } else {
      setTimeout(() => {
        cards[optionOneId].classList.remove("is-flipped");
        cards[optionTwoId].classList.remove("is-flipped");
        alert("Sorry, try again");
        lives--; // Resta una vida.
        resultDisplay.textContent = lives; // Actualiza las vidas mostradas en pantalla.
        if (lives === 0) {
          alert("Game Over! You've lost all your lives.");
          resetGame(); // Reinicia el juego.
          return; // Termina el juego si se pierden todas las vidas.
        }
      }, 500);
    }
  
    cardsChosen = [];
    cardsChosenId = [];
  
    if (cardsWon.length === cardArray.length / 2) {
      if (currentLevel < 3) {
        alert("Level complete! Moving to the next level.");
        currentLevel++;
        cardArray = levels[currentLevel];
        cardsWon = [];
        createBoard();
      } else {
        resultDisplay.textContent = "Congratulations! You completed all levels!";
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

  // Función para reiniciar el juego
  function resetGame() {
    currentLevel = 1;
    lives = 5;
    score = 0;
    cardsWon = [];
    cardArray = levels[currentLevel];
    createBoard();
  }

  createBoard();
});