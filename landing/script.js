const landing =
  document.querySelector(".landing");

const zoomLayer =
  document.querySelector("#zoomLayer");

const areas =
  document.querySelectorAll(".area");



areas.forEach(area => {

  area.addEventListener(
    "mouseenter",
    () => {

      areas.forEach(otherArea => {

        if (otherArea !== area) {
          otherArea.classList.add("dimmed");
        }

      });

      area.classList.add("active");

    }
  );


  area.addEventListener(
    "mouseleave",
    () => {

      areas.forEach(otherArea => {
        otherArea.classList.remove("dimmed");
      });

      area.classList.remove("active");

    }
  );

});



let scale = 1;

let translateX = 0;
let translateY = 0;

const MIN_SCALE = 1;
const MAX_SCALE = 1.9;

const ZOOM_AMOUNT = 0.075;



let isDragging = false;

let startMouseX = 0;
let startMouseY = 0;

let startTranslateX = 0;
let startTranslateY = 0;



let targetMouseX = 0;
let targetMouseY = 0;

let currentMouseX = 0;
let currentMouseY = 0;

const PARALLAX_X = 11;
const PARALLAX_Y = 8;


function updateMap() {

  zoomLayer.style.transform =
    `translate3d(
      ${translateX + currentMouseX}px,
      ${translateY + currentMouseY}px,
      0
    )
    scale(${scale})`;

}



landing.addEventListener(
  "mousemove",
  event => {

    if (isDragging) return;

    const rect =
      landing.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const mouseY =
      event.clientY - rect.top;

    const normalizedX =
      mouseX / rect.width - 0.5;

    const normalizedY =
      mouseY / rect.height - 0.5;

    targetMouseX =
      normalizedX * -PARALLAX_X * 2;

    targetMouseY =
      normalizedY * -PARALLAX_Y * 2;

  }
);


landing.addEventListener(
  "mouseleave",
  () => {

    targetMouseX = 0;
    targetMouseY = 0;

  }
);



function animateMap() {

  currentMouseX +=
    (targetMouseX - currentMouseX) * 0.045;

  currentMouseY +=
    (targetMouseY - currentMouseY) * 0.045;

  updateMap();

  requestAnimationFrame(animateMap);

}

animateMap();



function clampPosition() {

  if (scale <= 1) {

    translateX = 0;
    translateY = 0;

    return;
  }

  const width =
    landing.clientWidth;

  const height =
    landing.clientHeight;

  const scaledWidth =
    width * scale;

  const scaledHeight =
    height * scale;

  const minX =
    width - scaledWidth;

  const minY =
    height - scaledHeight;

  translateX =
    Math.min(
      0,
      Math.max(minX, translateX)
    );

  translateY =
    Math.min(
      0,
      Math.max(minY, translateY)
    );

}



landing.addEventListener(
  "wheel",
  event => {

    if (
      event.target.closest(".nav") ||
      event.target.closest(".intro")
    ) {
      return;
    }

    event.preventDefault();

    const rect =
      landing.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const mouseY =
      event.clientY - rect.top;

    const mapX =
      (
        mouseX -
        translateX -
        currentMouseX
      ) / scale;

    const mapY =
      (
        mouseY -
        translateY -
        currentMouseY
      ) / scale;


    if (event.deltaY < 0) {
      scale += ZOOM_AMOUNT;
    } else {
      scale -= ZOOM_AMOUNT;
    }


    scale =
      Math.max(
        MIN_SCALE,
        Math.min(
          MAX_SCALE,
          scale
        )
      );


    translateX =
      mouseX -
      currentMouseX -
      mapX * scale;

    translateY =
      mouseY -
      currentMouseY -
      mapY * scale;


    if (scale <= 1) {

      scale = 1;

      translateX = 0;
      translateY = 0;

    }

    clampPosition();
    updateMap();

  },

  {
    passive: false
  }
);



landing.addEventListener(
  "mousedown",
  event => {

    if (
      event.target.closest(".nav") ||
      event.target.closest(".intro") ||
      event.target.closest(".area")
    ) {
      return;
    }

    if (scale <= 1) {
      return;
    }

    isDragging = true;

    zoomLayer.classList.add("dragging");

    startMouseX =
      event.clientX;

    startMouseY =
      event.clientY;

    startTranslateX =
      translateX;

    startTranslateY =
      translateY;

    targetMouseX = 0;
    targetMouseY = 0;

  }
);


window.addEventListener(
  "mousemove",
  event => {

    if (!isDragging) return;

    const moveX =
      event.clientX - startMouseX;

    const moveY =
      event.clientY - startMouseY;

    translateX =
      startTranslateX + moveX;

    translateY =
      startTranslateY + moveY;

    clampPosition();
    updateMap();

  }
);



window.addEventListener(
  "mouseup",
  () => {

    if (!isDragging) return;

    isDragging = false;

    zoomLayer.classList.remove("dragging");

  }
);



landing.addEventListener(
  "dblclick",
  event => {

    if (
      event.target.closest(".nav") ||
      event.target.closest(".area")
    ) {
      return;
    }

    scale = 1;

    translateX = 0;
    translateY = 0;

    targetMouseX = 0;
    targetMouseY = 0;

    zoomLayer.style.transition =
      "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

    updateMap();

    setTimeout(
      () => {
        zoomLayer.style.transition = "";
      },
      450
    );

  }
);



window.addEventListener(
  "resize",
  () => {

    scale = 1;

    translateX = 0;
    translateY = 0;

    targetMouseX = 0;
    targetMouseY = 0;

    currentMouseX = 0;
    currentMouseY = 0;

    updateMap();

  }
);