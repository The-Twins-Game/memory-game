document.addEventListener("DOMContentLoaded", () => {
  // list all card options
  const cardArray = [
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
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // create your board
  function createBoard() {
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
  }

  // check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].classList.remove("is-flipped");
      cards[optionTwoId].classList.remove("is-flipped");
      alert("Sorry, try again");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations! You found them all!";
    }
  }

  // flip your card
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

  createBoard();
});
