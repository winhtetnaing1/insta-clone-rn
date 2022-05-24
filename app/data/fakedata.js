const USER = [
  { image: require("../assets/p1.jpg"), name: "john" },
  { image: require("../assets/p2.jpg"), name: "jame" },
  { image: require("../assets/p3.jpg"), name: "jarone" },
  { image: require("../assets/p4.jpg"), name: "bruce" },
  { image: require("../assets/p5.jpg"), name: "tommy" },
];


const buttonTabIcons = [
  {
    name: "home",
    active: require("../assets/icons/home_selected.png"),
    inActive: require("../assets/icons/home.png"),
  },
  {
    name: "search",
    active: require("../assets/icons/search_selected.png"),
    inActive: require("../assets/icons/search.png"),
  },
  {
    name: "plus",
    active: require("../assets/icons/add_selected.png"),
    inActive: require("../assets/icons/add.png"),
  },
  {
    name: "heart",
    active: require("../assets/icons/heart_selected.png"),
    inActive: require("../assets/icons/heart.png"),
  },
  {
    name: "profile",
    active: require("../assets/p1.jpg"),
    inActive: require("../assets/p1.jpg"),
  },
];

export { USER, buttonTabIcons };
