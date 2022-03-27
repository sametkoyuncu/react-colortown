/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
let data = [];
(function () {
  fetch("./assets/data/colorNames.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // output = Object.entries(myJson).map(([key, value]) => ({ key, value }));
      data = [...Object.keys(myJson).map((key) => [key, myJson[key]])];
    });
})();

const getRandomPalette = () => {
  const colors = [];
  for (let i = 0; i < 5; i += 1) {
    const randomNumber = Math.round(Math.random() * 2331);
    colors.push({ color: data[randomNumber][0], name: data[randomNumber][1] });
  }
  return [...colors];
};

export default getRandomPalette;
