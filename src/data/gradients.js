import tags from "./tags";

const gradients = [
  {
    id: "gradient_1",
    colors: [
      { hex: "#de6262", rgb: "rgb(222, 98, 98)", hsl: "hsl(0, 65%, 63%)" },
      { hex: "#ffb88c", rgb: "rgb(255, 184, 140)", hsl: "hsl(23, 100%, 77%)" },
    ],
    direction: "to bottom",
    likes: 102,
    tags: [tags[5], tags[7], tags[11]],
  },
  {
    id: "gradient_2",
    colors: [
      { hex: "#fc354c", rgb: "rgb(252, 53, 76)", hsl: "hsl(353, 97%, 60%)" },
      { hex: "#0abfbc", rgb: "rgb(10, 191, 188)", hsl: "hsl(179, 90%, 39%)" },
    ],
    direction: "to right",
    likes: 11,
    tags: [tags[2], tags[0]],
  },
  {
    id: "gradient_3",
    colors: [
      { hex: "#414d0b", rgb: "rgb(65, 77, 11)", hsl: "hsl(71, 75%, 17%)" },
      { hex: "#727a17", rgb: "rgb(114, 122, 23)", hsl: "hsl(65, 68%, 28%)" },
    ],
    direction: "to right",
    likes: 39,
    tags: [tags[2]],
  },
  {
    id: "gradient_4",
    colors: [
      { hex: "#e43a15", rgb: "rgb(228, 58, 21)", hsl: "hsl(11, 83%, 49%)" },
      { hex: "#cc13e8", rgb: "rgb(204, 19, 232)", hsl: "hsl(292, 85%, 49%)" },
    ],
    direction: "to top",
    likes: 9,
    tags: [tags[7], tags[10]],
  },
  {
    id: "gradient_5",
    colors: [
      { hex: "#c04848", rgb: "rgb(192, 72, 72)", hsl: "hsl(0, 49%, 52%)" },
      { hex: "#480048", rgb: "rgb(72, 0, 72)", hsl: "hsl(300, 100%, 14%)" },
    ],
    direction: "to right",
    likes: 3,
    tags: [tags[7], tags[10], tags[9]],
  },
  {
    id: "gradient_6",
    colors: [
      { hex: "#5f2c82", rgb: "rgb(95, 44, 129)", hsl: "hsl(276, 49%, 34%)" },
      { hex: "#49a09d", rgb: "rgb(73, 160, 157)", hsl: "hsl(178, 37%, 46%)" },
    ],
    direction: "to left",
    likes: 3,
    tags: [tags[0], tags[10]],
  },
  {
    id: "gradient_7",
    colors: [
      { hex: "#43C6AC", rgb: "rgb(68, 197, 172)", hsl: "hsl(168, 53%, 52%)" },
      { hex: "#F8FFAE", rgb: "rgb(248, 255, 174)", hsl: "hsl(65, 100%, 84%)" },
    ],
    direction: "to right",
    likes: 21,
    tags: [tags[1], tags[5], tags[11]],
  },
];

export default gradients;
