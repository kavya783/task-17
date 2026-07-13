import { darken } from "@mui/material/styles";

export default function Colors(darkMode, themeColor) {

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(themeColor);

  const safeThemeColor = isValidHex
    ? themeColor
    : "#7DB9B6";

  let borderColor = "#5A8F8C";

  try {
    borderColor = darken(safeThemeColor, 0.2);
  } catch (error) {
    borderColor = "#5A8F8C";
  }

  return {
    navbar: darkMode ? "#90CAF9" : safeThemeColor,

    headings: darkMode ? "#90CAF9" : safeThemeColor,

    background: darkMode ? "#121212" : "#F5F5F5",

    text: darkMode ? "#FFFFFF" : "#000000",

    card: darkMode ? "#1e1e1e" : "#0b0b0b",

    border: darkMode ? "#0d0e0f" : borderColor,
  };
}