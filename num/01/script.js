const doors = {
  u1: {
    label: "U1",
    address: "E 70th St, west of Lexington Ave"
  },

  u2: {
    label: "U2",
    address: "E 70th St, east of Lexington Ave"
  },

  u3: {
    label: "U3",
    address: "E 70th St, east of Lexington Ave"
  },

  u4: {
    label: "U4",
    address: "E 70th St, west of Lexington Ave"
  },

  u5: {
    label: "U5",
    address: "Lexington Ave × E 70th St"
  },

  u6: {
    label: "U6",
    address: "Lexington Ave, near E 70th St"
  }
};


const doorItems =
  document.querySelectorAll(".door-item");

const mapPoints =
  document.querySelectorAll(".map-point");

const mapWrap =
  document.querySelector(".map-wrap");

const mapDoor =
  document.getElementById("mapDoor");

const mapAddress =
  document.getElementById("mapAddress");


function activateDoor(id) {

  mapPoints.forEach(point => {
    point.classList.remove("active");
  });

  const selectedPoint =
    document.querySelector(
      `[data-point="${id}"]`
    );

  if (!selectedPoint) return;

  selectedPoint.classList.add("active");

  mapWrap.classList.add("has-active");

  mapDoor.textContent =
    doors[id].label;

  mapAddress.textContent =
    doors[id].address;

}


function resetDoor() {

  mapPoints.forEach(point => {
    point.classList.remove("active");
  });

  mapWrap.classList.remove("has-active");

  mapDoor.textContent =
    "UPPER EAST SIDE";

  mapAddress.textContent =
    "Hover over a door to see its location";

}


doorItems.forEach(item => {

  const id =
    item.dataset.door;

  item.addEventListener(
    "mouseenter",
    () => activateDoor(id)
  );

  item.addEventListener(
    "mouseleave",
    resetDoor
  );

  item.addEventListener(
    "click",
    () => activateDoor(id)
  );

});


mapPoints.forEach(point => {

  const id =
    point.dataset.point;

  point.addEventListener(
    "mouseenter",
    () => activateDoor(id)
  );

  point.addEventListener(
    "mouseleave",
    resetDoor
  );

  point.addEventListener(
    "click",
    () => activateDoor(id)
  );

});