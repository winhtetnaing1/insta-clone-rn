import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  white: "#fff",
  medium: "#6e6969",
  light: "#f8f4f4",
  dark: "#0c0c0c",
  danger: "#ff5252",
  dodgerblue: "dodgerblue",
  blue: "#4096FE",
  gray: "#464646",
  gray1: "#363636",
  lightGray: "#dedede",
  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
  rainbow: "#ff8501",
};

const SIZES = {
  width,
  height,
};

export { COLORS, SIZES };
