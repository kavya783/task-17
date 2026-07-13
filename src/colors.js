import { darken } from "@mui/material/styles";

export default function Colors(darkMode, themeColor) {
  const safeThemeColor = themeColor || "#7DB9B6";

  return {
    navbar: darkMode ? "#90CAF9" : safeThemeColor,
    headings: darkMode ? "#90CAF9" : safeThemeColor,
    background: darkMode ? "#121212" : "#F5F5F5",
    text: darkMode ? "#FFFFFF" : "#000000",
    card: "#000000",
    border: darkMode ? "#0d0e0f" : darken(safeThemeColor, 0.2),
  };
}