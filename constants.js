import * as Location from "expo-location";

export const COLORS = {
  white: "#fff",
  black: "#000",
  primary_blue: "#2C2C54",
  primary_red: "#A40E4C",
  transparent_gray: "#A40E4C0D",
  dark_gray: "#a9a9a9",
  orange: "#F49D6E",
};

export const LAYOUT = {
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  centerMiddle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const roundTo2 = (num) => {
  return Number.parseFloat(num).toFixed(2);
};

export const makeFullAddress = (address) => {
  if (!address) {
    return "";
  }
  const line2Present = Boolean(address.line2);
  return `${address.line1}, ${address.line2}${line2Present ? ", " : " "}${
    address.city
  }, ${address.state} ${address.zip}`;
};

