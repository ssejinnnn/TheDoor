const stage =
  document.querySelector("#stage");

const currentDoor =
  document.querySelector("#currentDoor");

const placedItems =
  document.querySelector("#placedItems");

const assets =
  document.querySelectorAll(".asset");

const resetButton =
  document.querySelector("#resetButton");

const submitButton =
  document.querySelector("#submitButton");


const resultScreen =
  document.querySelector("#resultScreen");

const resultAssembly =
  document.querySelector("#resultAssembly");

const resultDoor =
  document.querySelector("#resultDoor");

const resultPlacedItems =
  document.querySelector("#resultPlacedItems");

const resultClose =
  document.querySelector("#resultClose");

const resultMaterial =
  document.querySelector("#resultMaterial");

const resultDescription =
  document.querySelector("#resultDescription");

const resultLongDescription =
  document.querySelector("#resultLongDescription");

const resultImpression =
  document.querySelector("#resultImpression");

const resultSurface =
  document.querySelector("#resultSurface");

const endingLarge =
  document.querySelector("#endingLarge");

const wordOne =
  document.querySelector("#wordOne");

const wordTwo =
  document.querySelector("#wordTwo");

const wordThree =
  document.querySelector("#wordThree");


let draggingSource = null;
let dragGhost = null;

let zCounter = 50;

let currentDoorSrc = "";


/* SOURCE DRAG */

assets.forEach(asset => {

  asset.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();
      event.stopPropagation();


      draggingSource = {

        element: asset,

        type:
          asset.dataset.type,

        src:
          asset.dataset.src,

        width:
          Number(asset.dataset.width)
          ||
          getDefaultWidth(
            asset.dataset.type
          )

      };


      asset.classList.add(
        "dragging"
      );


      createGhost(
        draggingSource,
        event.clientX,
        event.clientY
      );


      stage.classList.add(
        "drop-active"
      );


      window.addEventListener(
        "pointermove",
        moveSource
      );


      window.addEventListener(
        "pointerup",
        finishSource,
        {
          once: true
        }
      );

    }
  );

});


function getDefaultWidth(type) {

  if (type === "door") {
    return 230;
  }


  if (type === "handle") {
    return 60;
  }


  return 90;
}


/* GHOST */

function createGhost(
  data,
  x,
  y
) {

  dragGhost =
    document.createElement(
      "div"
    );


  dragGhost.className =
    "drag-ghost";


  let width =
    data.width;


  if (
    data.type === "door"
  ) {
    width = 125;
  }


  dragGhost.style.width =
    `${width}px`;


  dragGhost.innerHTML =
    `<img src="${data.src}" alt="">`;


  document.body.appendChild(
    dragGhost
  );


  moveGhost(
    x,
    y
  );

}


function moveGhost(
  x,
  y
) {

  if (!dragGhost) {
    return;
  }


  dragGhost.style.left =
    `${x}px`;


  dragGhost.style.top =
    `${y}px`;

}


/* MOVE */

function moveSource(event) {

  if (!draggingSource) {
    return;
  }


  moveGhost(
    event.clientX,
    event.clientY
  );


  stage.classList.toggle(
    "inside",

    pointInsideStage(
      event.clientX,
      event.clientY
    )
  );

}


/* DROP */

function finishSource(event) {

  window.removeEventListener(
    "pointermove",
    moveSource
  );


  if (!draggingSource) {
    return;
  }


  const inside =
    pointInsideStage(
      event.clientX,
      event.clientY
    );


  if (inside) {

    const rect =
      stage.getBoundingClientRect();


    const x =
      event.clientX -
      rect.left;


    const y =
      event.clientY -
      rect.top;


    if (
      draggingSource.type ===
      "door"
    ) {

      setDoor(
        draggingSource.src
      );

    }

    else {

      addPlacedItem(
        draggingSource,
        x,
        y
      );

    }

  }


  draggingSource.element
    .classList.remove(
      "dragging"
    );


  stage.classList.remove(
    "drop-active",
    "inside"
  );


  if (dragGhost) {

    dragGhost.remove();

    dragGhost = null;

  }


  draggingSource = null;

}


/* STAGE */

function pointInsideStage(
  x,
  y
) {

  const rect =
    stage.getBoundingClientRect();


  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );

}


/* SET DOOR */

function setDoor(src) {

  currentDoorSrc =
    src;


  currentDoor.src =
    src;


  currentDoor.classList.remove(
    "hidden"
  );


  stage.classList.add(
    "has-door"
  );

}


/* ADD ITEM */

function addPlacedItem(
  data,
  x,
  y
) {

  const item =
    document.createElement(
      "div"
    );


  item.className =
    "placed-item";


  item.style.width =
    `${data.width}px`;


  item.style.zIndex =
    ++zCounter;


  item.dataset.src =
    data.src;


  item.dataset.type =
    data.type;


  item.innerHTML =
    `<img src="${data.src}" alt="">`;


  placedItems.appendChild(
    item
  );


  item.style.left =
    `${x - data.width / 2}px`;


  item.style.top =
    `${y - data.width / 2}px`;


  requestAnimationFrame(
    () => {

      clampItem(
        item
      );

    }
  );


  enablePlacedDrag(
    item
  );


  item.addEventListener(
    "dblclick",
    () => {

      item.remove();

    }
  );

}


/* MOVE PLACED ITEM */

function enablePlacedDrag(
  item
) {

  let moving = false;

  let offsetX = 0;
  let offsetY = 0;


  item.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();

      event.stopPropagation();


      moving = true;


      item.style.zIndex =
        ++zCounter;


      const rect =
        item.getBoundingClientRect();


      offsetX =
        event.clientX -
        rect.left;


      offsetY =
        event.clientY -
        rect.top;


      item.setPointerCapture(
        event.pointerId
      );

    }
  );


  item.addEventListener(
    "pointermove",
    event => {

      if (!moving) {
        return;
      }


      const stageRect =
        stage.getBoundingClientRect();


      item.style.left =
        `${
          event.clientX -
          stageRect.left -
          offsetX
        }px`;


      item.style.top =
        `${
          event.clientY -
          stageRect.top -
          offsetY
        }px`;


      clampItem(
        item
      );

    }
  );


  item.addEventListener(
    "pointerup",
    event => {

      moving = false;


      if (
        item.hasPointerCapture(
          event.pointerId
        )
      ) {

        item.releasePointerCapture(
          event.pointerId
        );

      }

    }
  );

}


/* CLAMP */

function clampItem(item) {

  let left =
    parseFloat(
      item.style.left
    ) || 0;


  let top =
    parseFloat(
      item.style.top
    ) || 0;


  left =
    Math.max(
      0,

      Math.min(
        stage.clientWidth -
        item.offsetWidth,

        left
      )
    );


  top =
    Math.max(
      0,

      Math.min(
        stage.clientHeight -
        item.offsetHeight,

        top
      )
    );


  item.style.left =
    `${left}px`;


  item.style.top =
    `${top}px`;

}


/* RESET */

resetButton.addEventListener(
  "click",
  () => {

    currentDoorSrc =
      "";


    currentDoor.src =
      "";


    currentDoor.classList.add(
      "hidden"
    );


    stage.classList.remove(
      "has-door"
    );


    placedItems.innerHTML =
      "";

  }
);


/* MATERIALS */

const materials = {

  wood: {

    material:
      "WOOD",

    short:
      "Wood gives an entrance a warmer and more tactile character. Grain, paneling, paint, and visible wear can immediately suggest age, craft, and familiarity.",

    long: [
      "Wood is one of the most traditional materials used for entrance doors. Its visible grain, natural variation, and ability to be carved, painted, or paneled allow it to take on many different appearances.",
      "A dark, heavily detailed wooden door can emphasize the historic character of an older facade, while a flat wooden surface with minimal hardware can appear much more contemporary. Wood also changes with use and exposure. Scratches, fading, chipped paint, and worn areas become part of the entrance over time, allowing the surface to record age and activity."
    ],

    impression:
      "WARM / FAMILIAR",

    surface:
      "TEXTURED / NATURAL",

    words: [
      "WOOD",
      "CRAFTED",
      "TACTILE"
    ]

  },


  metal: {

    material:
      "METAL",

    short:
      "Metal creates a stronger and more controlled threshold. Its precise edges and solid surface can make an entrance feel secure, direct, and contemporary.",

    long: [
      "Metal changes the character of an entrance through weight, finish, and precision. Smooth steel or aluminum surfaces can create a clean and contemporary impression, while darker or weathered metal can appear heavier and more protective.",
      "Thin framing makes an entrance feel lighter, while solid metal panels establish a stronger visual boundary between public and private space. Metal hardware, joints, seams, and finishes also become visible details that influence how secure, industrial, refined, or accessible an entrance feels."
    ],

    impression:
      "MODERN / SECURE",

    surface:
      "SMOOTH / PRECISE",

    words: [
      "METAL",
      "CONTROLLED",
      "SECURE"
    ]

  },


  glass: {

    material:
      "GLASS",

    short:
      "Glass changes how an entrance is read before it is crossed. Transparency creates a visual connection between inside and outside while allowing light, movement, reflection, and activity to become part of the first impression.",

    long: [
      "Glass changes how an entrance is read before it is crossed. Transparency creates a visual connection between inside and outside, allowing light, movement, and activity to become part of the first impression. Clear glass can make an entrance feel open and accessible.",
      "Tinted, frosted, or reflective surfaces create more distance and privacy. Thin metal edges can make glass feel light and contemporary, while heavier framing gives the same material a stronger sense of boundary. Because glass reflects its surroundings, the appearance of the entrance continues to shift throughout the day."
    ],

    impression:
      "OPEN / LIGHT",

    surface:
      "REFLECTIVE / CLEAR",

    words: [
      "GLASS",
      "OPEN",
      "VISIBLE"
    ]

  }

};


/* MATERIAL TYPE */

function getMaterial() {

  if (
    currentDoorSrc.includes("door1") ||
    currentDoorSrc.includes("door3") ||
    currentDoorSrc.includes("door5")
  ) {
    return "wood";
  }


  if (
    currentDoorSrc.includes("door2") ||
    currentDoorSrc.includes("door4") ||
    currentDoorSrc.includes("door7")
  ) {
    return "metal";
  }


  return "glass";

}


/* COPY COMPLETE DOOR */

function buildCompleteDoor() {

  resultPlacedItems.innerHTML =
    "";


  const stageRect =
    stage.getBoundingClientRect();


  const resultRect =
    resultAssembly.getBoundingClientRect();


  const scaleX =
    resultRect.width /
    stageRect.width;


  const scaleY =
    resultRect.height /
    stageRect.height;


  placedItems
    .querySelectorAll(
      ".placed-item"
    )
    .forEach(item => {

      const clone =
        item.cloneNode(
          true
        );


      clone.style.pointerEvents =
        "none";


      clone.style.cursor =
        "default";


      const left =
        parseFloat(
          item.style.left
        ) || 0;


      const top =
        parseFloat(
          item.style.top
        ) || 0;


      clone.style.left =
        `${left * scaleX}px`;


      clone.style.top =
        `${top * scaleY}px`;


      clone.style.width =
        `${
          item.offsetWidth *
          scaleX
        }px`;


      resultPlacedItems.appendChild(
        clone
      );

    });

}


/* LONG COPY */

function buildLongDescription(
  paragraphs
) {

  resultLongDescription.innerHTML =
    "";


  paragraphs.forEach(text => {

    const p =
      document.createElement(
        "p"
      );


    p.textContent =
      text;


    resultLongDescription.appendChild(
      p
    );

  });

}


/* SUBMIT */

submitButton.addEventListener(
  "click",
  () => {

    if (!currentDoorSrc) {
      return;
    }


    const type =
      getMaterial();


    const data =
      materials[type];


    resultDoor.src =
      currentDoorSrc;


    resultMaterial.textContent =
      data.material;


    resultDescription.textContent =
      data.short;


    buildLongDescription(
      data.long
    );


    resultImpression.textContent =
      data.impression;


    resultSurface.textContent =
      data.surface;


    endingLarge.innerHTML =
      data.impression.replace(
        " / ",
        " /<br>"
      );


    wordOne.textContent =
      data.words[0];


    wordTwo.textContent =
      data.words[1];


    wordThree.textContent =
      data.words[2];


    document.body.classList.add(
      "result-open"
    );


    resultScreen.classList.add(
      "show"
    );


    resultScreen.scrollTop =
      0;


    requestAnimationFrame(
      buildCompleteDoor
    );

  }
);


/* CLOSE */

function closeResult() {

  document.body.classList.remove(
    "result-open"
  );


  resultScreen.classList.remove(
    "show"
  );

}


resultClose.addEventListener(
  "click",
  closeResult
);


window.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeResult();

    }

  }
);