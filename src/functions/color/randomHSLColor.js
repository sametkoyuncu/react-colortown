const randomHSLColor = () => [
  Math.round(Math.random() * 360),
  Math.round(Math.random() * 50) + 50,
  Math.round(Math.random() * 50) + 50,
];
export default randomHSLColor;
