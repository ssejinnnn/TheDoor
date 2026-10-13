const doorInfo = {

  // 01 UPPER EAST SIDE

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
  },


  // 02 MIDTOWN

  m1: {
    label: "M1",
    address: "W 34th St, near 6th Ave"
  },

  m2: {
    label: "M2",
    address: "Broadway × W 34th St"
  },

  m3: {
    label: "M3",
    address: "W 34th St, near 5th Ave"
  },

  m4: {
    label: "M4",
    address: "Empire State Building, W 34th St × 5th Ave"
  },

  m5: {
    label: "M5",
    address: "E 27th St, near Madison Ave"
  },

  m6: {
    label: "M6",
    address: "W 34th St, near Empire State Building"
  },


  // 03 KIPS BAY

  k1: {
    label: "K1",
    address: "2nd Ave, near E 29th St"
  },

  k2: {
    label: "K2",
    address: "E 19th St, near Park Ave S"
  },

  k3: {
    label: "K3",
    address: "E 19th St, near Irving Pl"
  },

  k4: {
    label: "K4",
    address: "E 19th St, near Brotherhood Synagogue"
  },

  k5: {
    label: "K5",
    address: "E 21st St, near 3rd Ave"
  },

  k6: {
    label: "K6",
    address: "E 22nd St, near 2nd Ave"
  },


  // 04 GREENWICH VILLAGE

  g1: {
    label: "G1",
    address: "17 E 13th St"
  },

  g2: {
    label: "G2",
    address: "E 13th St"
  },

  g3: {
    label: "G3",
    address: "5th Ave, near E 8th St"
  },

  g4: {
    label: "G4",
    address: "5th Ave, near E 9th St"
  },

  g5: {
    label: "G5",
    address: "5th Ave, near W 8th St"
  },

  g6: {
    label: "G6",
    address: "5th Ave"
  },


  // 05 EAST VILLAGE

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
    address: "301 E 17th St"
  },


  // 06 SOHO

  s1: {
    label: "S1",
    address: "Broadway, SoHo"
  },

  s2: {
    label: "S2",
    address: "Crosby St"
  },

  s3: {
    label: "S3",
    address: "Lafayette St"
  },

  s4: {
    label: "S4",
    address: "Crosby St"
  },

  s5: {
    label: "S5",
    address: "Crosby St"
  },

  s6: {
    label: "S6",
    address: "Prince St"
  },


  // 07 BROOKLYN

  b1: {
    label: "B1",
    address: "Lorimer St, between Ainslie St and Powers St"
  },

  b2: {
    label: "B2",
    address: "Ainslie St, west of Lorimer St"
  },

  b3: {
    label: "B3",
    address: "Grand St, near Powers St"
  },

  b4: {
    label: "B4",
    address: "Lorimer St"
  },

  b5: {
    label: "B5",
    address: "Rodney St"
  },

  b6: {
    label: "B6",
    address: "Grand St, near Bedford Ave"
  }

};



const sections =
  document.querySelectorAll(".area-section");


function clearArchiveTarget(section) {

  section
    .querySelectorAll(".archive-target")
    .forEach(item => {
      item.classList.remove("archive-target");
    });


  const grid =
    section.querySelector(".door-grid");


  if (grid) {
    grid.classList.remove("archive-highlight");
  }

}



sections.forEach(section => {

  const doorItems =
    section.querySelectorAll(".door-item");

  const mapPoints =
    section.querySelectorAll(".map-point");

  const mapWrap =
    section.querySelector(".map-wrap");

  const mapDoor =
    section.querySelector(".map-door");

  const mapAddress =
    section.querySelector(".map-address");


  const defaultDoor =
    mapDoor.textContent.trim();

  const defaultAddress =
    "Hover over a door to see its location";


  function activateDoor(id) {

    const data =
      doorInfo[id];


    mapPoints.forEach(point => {
      point.classList.remove("active");
    });


    const selectedPoint =
      section.querySelector(
        `.map-point[data-point="${id}"]`
      );


    if (selectedPoint) {

      selectedPoint.classList.add("active");

      mapWrap.classList.add("has-active");

    }


    if (data) {

      mapDoor.textContent =
        data.label;

      mapAddress.textContent =
        data.address;

    }

  }



  function resetDoor() {

    mapPoints.forEach(point => {
      point.classList.remove("active");
    });


    mapWrap.classList.remove("has-active");


    mapDoor.textContent =
      defaultDoor;

    mapAddress.textContent =
      defaultAddress;

  }



  doorItems.forEach(item => {

    const id =
      item.dataset.door;


    item.addEventListener(
      "mouseenter",
      () => {

        clearArchiveTarget(section);

        activateDoor(id);

      }
    );


    item.addEventListener(
      "mouseleave",
      resetDoor
    );

  });



  mapPoints.forEach(point => {

    const id =
      point.dataset.point;


    point.addEventListener(
      "mouseenter",
      () => {

        clearArchiveTarget(section);

        activateDoor(id);

      }
    );


    point.addEventListener(
      "mouseleave",
      resetDoor
    );

  });

});



/* ARCHIVE → AREA */

const params =
  new URLSearchParams(
    window.location.search
  );


const archiveDoor =
  params.get("door");


if (archiveDoor) {

  const targetDoor =
    document.querySelector(
      `.door-item[data-door="${archiveDoor}"]`
    );


  if (targetDoor) {

    const section =
      targetDoor.closest(".area-section");


    const grid =
      section.querySelector(".door-grid");


    const point =
      section.querySelector(
        `.map-point[data-point="${archiveDoor}"]`
      );


    const mapWrap =
      section.querySelector(".map-wrap");


    const mapDoor =
      section.querySelector(".map-door");


    const mapAddress =
      section.querySelector(".map-address");


    targetDoor.classList.add(
      "archive-target"
    );


    grid.classList.add(
      "archive-highlight"
    );


    if (point) {

      point.classList.add("active");

      mapWrap.classList.add(
        "has-active"
      );

    }


    if (doorInfo[archiveDoor]) {

      mapDoor.textContent =
        doorInfo[archiveDoor].label;


      mapAddress.textContent =
        doorInfo[archiveDoor].address;

    }


    setTimeout(() => {

      section.scrollIntoView({
        behavior: "auto",
        block: "start"
      });

    }, 50);

  }

}