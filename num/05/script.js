/* ========================================
   EAST VILLAGE STATIC MAP
======================================== */


/* ========================================
   DOOR INFORMATION
======================================== */

const doors = {

  e1: {
    label: "E1",
    address: "770 Broadway"
  },

  e2: {
    label: "E2",
    address: "51 Astor Place"
  },

  e3: {
    label: "E3",
    address: "St. Marks Place"
  },

  e4: {
    label: "E4",
    address: "St. Marks Place"
  },

  e5: {
    label: "E5",
    address: "2nd Ave × St. Marks Place"
  },

  e6: {
    label: "E6",
    address: "E 17th St × 2nd Ave"
  }

};



/* ========================================
   ELEMENTS
======================================== */

const doorItems =
  document.querySelectorAll(
    ".door-item"
  );

const mapPoints =
  document.querySelectorAll(
    ".map-point"
  );

const mapWrap =
  document.querySelector(
    ".map-wrap"
  );

const mapDoor =
  document.getElementById(
    "mapDoor"
  );

const mapAddress =
  document.getElementById(
    "mapAddress"
  );



/* ========================================
   ACTIVATE
======================================== */

function activateDoor(id) {

  mapPoints.forEach(
    point => {

      point.classList.remove(
        "active"
      );

    }
  );


  const selectedPoint =
    document.querySelector(
      `[data-point="${id}"]`
    );


  if (!selectedPoint) {
    return;
  }


  selectedPoint.classList.add(
    "active"
  );


  mapWrap.classList.add(
    "has-active"
  );


  mapDoor.textContent =
    doors[id].label;


  mapAddress.textContent =
    doors[id].address;

}



/* ========================================
   RESET
======================================== */

function resetDoor() {

  mapPoints.forEach(
    point => {

      point.classList.remove(
        "active"
      );

    }
  );


  mapWrap.classList.remove(
    "has-active"
  );


  mapDoor.textContent =
    "EAST VILLAGE";


  mapAddress.textContent =
    "Hover over a door to see its location";

}



/* ========================================
   DOOR EVENTS
======================================== */

doorItems.forEach(
  item => {

    const id =
      item.dataset.door;


    item.addEventListener(
      "mouseenter",
      () => {

        activateDoor(id);

      }
    );


    item.addEventListener(
      "mouseleave",
      () => {

        resetDoor();

      }
    );


    item.addEventListener(
      "click",
      () => {

        activateDoor(id);

      }
    );

  }
);



/* ========================================
   MAP POINT EVENTS
======================================== */

mapPoints.forEach(
  point => {

    const id =
      point.dataset.point;


    point.addEventListener(
      "mouseenter",
      () => {

        activateDoor(id);

      }
    );


    point.addEventListener(
      "mouseleave",
      () => {

        resetDoor();

      }
    );


    point.addEventListener(
      "click",
      () => {

        activateDoor(id);

      }
    );

  }
);