const neighborhoodNames = {
  b: "BROOKLYN",
  e: "EAST VILLAGE",
  g: "GREENWICH VILLAGE",
  k: "KIPS BAY",
  m: "MIDTOWN",
  s: "SOHO",
  u: "UPPER EAST SIDE"
};

const doors = [
  // BROOKLYN
  { image: "b1.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b2.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b3.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b4.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b5.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b6.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b7.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b8.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b9.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b10.jpg", neighborhood: "b", address: "Brooklyn, New York" },
  { image: "b11.jpg", neighborhood: "b", address: "Brooklyn, New York" },

  // EAST VILLAGE
  { image: "e1.jpg", neighborhood: "e", address: "East Village, New York" },
  { image: "e2.jpg", neighborhood: "e", address: "East Village, New York" },
  { image: "e3.jpg", neighborhood: "e", address: "East Village, New York" },
  { image: "e4.jpg", neighborhood: "e", address: "East Village, New York" },
  { image: "e5.jpg", neighborhood: "e", address: "East Village, New York" },
  { image: "e6.jpg", neighborhood: "e", address: "East Village, New York" },

  // GREENWICH VILLAGE
  { image: "g1.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g2.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g3.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g4.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g5.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g6.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g7.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g8.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g9.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g10.jpg", neighborhood: "g", address: "Greenwich Village, New York" },
  { image: "g11.jpg", neighborhood: "g", address: "Greenwich Village, New York" },

  // KIPS BAY
  { image: "k1.jpg", neighborhood: "k", address: "Kips Bay, New York" },
  { image: "k2.jpg", neighborhood: "k", address: "Kips Bay, New York" },
  { image: "k3.jpg", neighborhood: "k", address: "Kips Bay, New York" },
  { image: "k4.jpg", neighborhood: "k", address: "Kips Bay, New York" },
  { image: "k5.jpg", neighborhood: "k", address: "Kips Bay, New York" },
  { image: "k6.jpg", neighborhood: "k", address: "Kips Bay, New York" },

  // MIDTOWN
  { image: "m2.jpg", neighborhood: "m", address: "Midtown, New York" },
  { image: "m3.jpg", neighborhood: "m", address: "Midtown, New York" },
  { image: "m4.jpg", neighborhood: "m", address: "Midtown, New York" },

  // SOHO
  { image: "s1.jpg", neighborhood: "s", address: "SoHo, New York" },
  { image: "s2.jpg", neighborhood: "s", address: "SoHo, New York" },
  { image: "s3.jpg", neighborhood: "s", address: "SoHo, New York" },
  { image: "s4.jpg", neighborhood: "s", address: "SoHo, New York" },
  { image: "s5.jpg", neighborhood: "s", address: "SoHo, New York" },

  // UPPER EAST SIDE
  { image: "u1.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u2.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u3.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u4.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u5.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u6.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u7.jpg", neighborhood: "u", address: "Upper East Side, New York" },
  { image: "u8.jpg", neighborhood: "u", address: "Upper East Side, New York" }
];

const archivePage = document.querySelector(".archive-page");
const grid = document.getElementById("archive-grid");

const startOverlay = document.getElementById("start-overlay");
const startGameButton = document.getElementById("start-game");
const viewArchiveButton = document.getElementById("view-archive");
const startCloseButton = document.getElementById("start-close");

const gameStatus = document.getElementById("game-status");
const matchCount = document.getElementById("match-count");
const scoreTotal = document.getElementById("score-total");

const modeSwitch = document.getElementById("mode-switch");

const overlay = document.getElementById("match-overlay");
const popupSmall = document.getElementById("popup-small");
const popupTitle = document.getElementById("popup-title");
const popupNeighborhood = document.getElementById("popup-neighborhood");
const popupDescription = document.getElementById("popup-description");
const continueButton = document.getElementById("continue-button");

const finishOverlay = document.getElementById("finish-overlay");
const restartButton = document.getElementById("restart-button");
const viewCompleteArchive =
  document.getElementById("view-complete-archive");

let firstDoor = null;
let secondDoor = null;
let locked = true;
let archiveView = false;

const discoveredNeighborhoods = new Set();


function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
}


function buildArchive() {
  grid.innerHTML = "";

  shuffle(doors).forEach((door, index) => {
    const item = document.createElement("article");
    const number = String(index + 1).padStart(2, "0");

    item.className = "archive-item";
    item.dataset.neighborhood = door.neighborhood;

    item.innerHTML = `
      <div
        class="door-scene"
        role="button"
        tabindex="0"
        aria-label="Open door D${number}"
      >

        <div class="inside">
          <img
            src="image/${door.image}"
            alt="Door photographed in ${neighborhoodNames[door.neighborhood]}"
          >
        </div>

        <div class="door-frame"></div>
        <div class="door-panel"></div>
        <span class="door-handle"></span>

      </div>

      <div class="door-info">

        <span class="door-number">
          D${number}
        </span>

        <span class="door-address">
          ${door.address}
        </span>

      </div>
    `;

    const scene = item.querySelector(".door-scene");

    scene.addEventListener("click", () => {
      selectDoor(item);
    });

    scene.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        selectDoor(item);
      }
    });

    grid.appendChild(item);
  });
}


function startGame() {
  archiveView = false;
  locked = false;

  firstDoor = null;
  secondDoor = null;

  discoveredNeighborhoods.clear();

  archivePage.classList.remove("archive-view");

  matchCount.textContent = "00";
  scoreTotal.textContent = "/ 07";

  startOverlay.classList.remove("show");
  finishOverlay.classList.remove("show");

  gameStatus.classList.add("show");

  modeSwitch.textContent = "VIEW ARCHIVE";

  buildArchive();
}


function showMatchingHints(selectedItem) {
  clearMatchingHints();

  const neighborhood =
    selectedItem.dataset.neighborhood;

  document
    .querySelectorAll(".archive-item")
    .forEach(item => {

      if (
        item !== selectedItem &&
        item.dataset.neighborhood === neighborhood &&
        !item.classList.contains("matched")
      ) {
        item.classList.add("match-hint");
      }

    });

  setTimeout(clearMatchingHints, 1350);
}


function clearMatchingHints() {
  document
    .querySelectorAll(".match-hint")
    .forEach(item => {
      item.classList.remove("match-hint");
    });
}


function selectDoor(item) {
  if (archiveView) return;
  if (locked) return;
  if (item.classList.contains("matched")) return;
  if (item === firstDoor) return;

  item.classList.add("open");

  if (!firstDoor) {
    firstDoor = item;

    grid.classList.add("choosing");

    showMatchingHints(item);

    return;
  }

  clearMatchingHints();

  secondDoor = item;
  locked = true;

  grid.classList.remove("choosing");
  grid.classList.add("checking");

  setTimeout(checkMatch, 650);
}


function checkMatch() {
  const first =
    firstDoor.dataset.neighborhood;

  const second =
    secondDoor.dataset.neighborhood;

  if (first === second) {
    successfulMatch(first);
  } else {
    failedMatch();
  }
}


function successfulMatch(neighborhood) {
  clearMatchingHints();

  firstDoor.classList.remove("open");
  secondDoor.classList.remove("open");

  firstDoor.classList.add("matched");
  secondDoor.classList.add("matched");

  discoveredNeighborhoods.add(neighborhood);

  matchCount.textContent =
    String(discoveredNeighborhoods.size)
      .padStart(2, "0");

  showMatchPopup(neighborhood);
}


function showMatchPopup(neighborhood) {
  overlay.classList.remove("wrong");

  popupSmall.textContent = "YOU FOUND";
  popupTitle.textContent = "IT'S A MATCH!";

  popupNeighborhood.textContent =
    neighborhoodNames[neighborhood];

  popupDescription.textContent =
    "Two doors. Same neighborhood.";

  continueButton.style.display = "flex";

  overlay.classList.add("show");
}


function failedMatch() {
  clearMatchingHints();

  overlay.classList.add("wrong");

  popupSmall.textContent = "TRY AGAIN";
  popupTitle.textContent = "NOT A MATCH";

  popupNeighborhood.textContent = "";

  popupDescription.textContent =
    "These doors belong to different neighborhoods.";

  continueButton.style.display = "none";

  overlay.classList.add("show");

  setTimeout(() => {
    overlay.classList.remove("show");

    setTimeout(closeWrongDoors, 300);
  }, 1100);
}


function closeWrongDoors() {
  if (firstDoor) {
    firstDoor.classList.remove("open");
  }

  if (secondDoor) {
    secondDoor.classList.remove("open");
  }

  resetSelection();
}


function resetSelection() {
  clearMatchingHints();

  firstDoor = null;
  secondDoor = null;
  locked = false;

  grid.classList.remove(
    "choosing",
    "checking"
  );
}


continueButton.addEventListener("click", () => {
  overlay.classList.remove("show");

  setTimeout(() => {
    resetSelection();

    if (discoveredNeighborhoods.size === 7) {
      finishOverlay.classList.add("show");
    }
  }, 300);
});


function enterArchiveView() {
  archiveView = true;
  locked = true;

  firstDoor = null;
  secondDoor = null;

  clearMatchingHints();

  startOverlay.classList.remove("show");
  overlay.classList.remove("show");
  finishOverlay.classList.remove("show");

  gameStatus.classList.remove("show");

  grid.classList.remove(
    "choosing",
    "checking"
  );

  archivePage.classList.add("archive-view");

  modeSwitch.textContent = "PLAY GAME";

  document
    .querySelectorAll(".archive-item")
    .forEach(item => {

      item.classList.remove(
        "open",
        "matched",
        "match-hint"
      );

    });
}


function restartGame() {
  finishOverlay.classList.remove("show");

  startGame();
}


function switchMode() {
  if (archiveView) {
    startGame();
  } else {
    enterArchiveView();
  }
}


startGameButton.addEventListener(
  "click",
  startGame
);

viewArchiveButton.addEventListener(
  "click",
  enterArchiveView
);

startCloseButton.addEventListener(
  "click",
  enterArchiveView
);

modeSwitch.addEventListener(
  "click",
  switchMode
);

viewCompleteArchive.addEventListener(
  "click",
  enterArchiveView
);

restartButton.addEventListener(
  "click",
  restartGame
);


buildArchive();


setTimeout(() => {
  startOverlay.classList.add("show");
}, 800);