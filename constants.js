export const COLORS = {
  white: "#ffffff",
  black: "#000000",
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

/**
 * Rounds down a given number to fix to 2 decimal places
 * @param {Number} num number to round down to
 * @returns a string equal to the input number rounded down to the nearest 2 decimal places
 */
export function roundTo2(num) {
  return Number.parseFloat(num).toFixed(2);
}

/**
 * Returns a one-line full address format
 * @param {Object} address full address object as originally uploaded to Firebase
 * @returns a one-line full address format in the form "575 18th St NW, Apt 1592, Atlanta, GA 30332"
 */
export function makeFullAddress(address) {
  if (!address) {
    return "";
  }
  const line2Present = Boolean(address.line2);
  return `${address.line1}, ${address.line2}${line2Present ? ", " : " "}${
    address.city
  }, ${address.state} ${address.zip}`;
}
