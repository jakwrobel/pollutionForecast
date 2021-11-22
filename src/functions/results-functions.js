//Decrease value of "left" property of element. That makes div with data looks like sliding left, when overflow is set to hidden
export const slideToPrev = (elements) => {
  let actualLeftValue = parseInt(
    elements[0].style.left.slice(0, elements[0].style.left.length - 2),
    10
  );
  for (let i = 0; i < elements.length; i++) {
    if (actualLeftValue < 0) {
      elements[i].style.left = actualLeftValue + elements[i].offsetWidth + "px";
    }
  }
};

//Increase value of "left" property of element. That makes div with data looks like sliding right, when overflow is set to hidden
export const slideToNext = (elements, parent) => {
  let actualLeftValue = elements[0].style.left.slice(
    0,
    elements[0].style.left.length - 2
  );
  for (let i = 0; i < elements.length; i++) {
    if (
      elements[elements.length - 1].getBoundingClientRect().right >
      parent[0].getBoundingClientRect().right
    ) {
      elements[i].style.left = actualLeftValue - elements[i].offsetWidth + "px";
    }
  }
};

//Returns colors based on value. In this app it is used to return color of bar, based on value of pollution.
export const colorFunctions = {
  setaqiColor: (value) => {
    if (value <= 50) return "#00af50";
    if (value > 50 && value <= 100) return "#debd43";
    if (value > 100 && value <= 150) return "#fec100";
    if (value > 150 && value <= 200) return "#fe0000";
    if (value > 200 && value <= 300) return "#bf0001";
    if (value > 300 && value <= 500) return "#581845";
  },
  setpm10Color: (value) => {
    if (value <= 50) return "#00af50";
    if (value > 50 && value <= 100) return "#fec100";
    if (value > 100 && value <= 150) return "#fe0000";
    if (value > 150) return "#bf0001";
  },
  setpm25Color: (value) => {
    if (value <= 10) return "#00af50";
    if (value > 10 && value <= 25) return "#fec100";
    if (value > 25 && value <= 35) return "#fe0000";
    if (value > 35) return "#bf0001";
  },
  seto3Color: (value) => {
    if (value <= 54) return "#00af50";
    if (value > 55 && value <= 70) return "#ffff00";
    if (value > 71 && value <= 85) return "#fec100";
    if (value > 86 && value <= 105) return "#fe0000";
    if (value > 106 && value <= 200) return "#7030a1";
    if (value > 201) return "#bf0001";
  },
  setso2Color: (value) => {
    if (value <= 5) return "#00af50";
    if (value > 5 && value <= 7) return "#fec100";
    if (value > 7 && value <= 10) return "#fe0000";
    if (value > 10) return "#bf0001";
  },
  setno2Color: (value) => {
    if (value <= 150) return "#00af50";
    if (value > 150 && value <= 200) return "#fec100";
    if (value > 200 && value <= 250) return "#fe0000";
    if (value > 250) return "#bf0001";
  },
  setcoColor: (value) => {
    if (value <= 90) return "#00af50";
    if (value > 90 && value <= 100) return "#fec100";
    if (value > 100 && value <= 150) return "#fe0000";
    if (value > 150) return "#bf0001";
  },
};

//Returns date (as string) without anything else from response value from air pollution API
export const getDate = (str) => {
  return str.substring(0, str.length - 3);
};

//Returns time (as string) without anything else from response value from air pollution API
export const getTime = (str) => {
  return `${str.substring(str.length - 2, str.length)}:00`;
};

//Returns country name from geocoding API response
export const getCountry = (str) => {
  return str.substring(str.lastIndexOf(",") + 2, str.length);
};
