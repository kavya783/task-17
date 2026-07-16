import { darken } from "@mui/material/styles";
export default function Colors(darkMode) {
  const themeColor = localStorage.getItem("themeColor") || "#7DB9B6";

  return {
    navbar: darkMode ? "#90CAF9" : themeColor,
    headings: darkMode ? "#90CAF9" : themeColor,
    background: darkMode ? "#121212" : "#F5F5F5",
    text: darkMode ? "#FFFFFF" : "#000000",
    card:darkMode ? "#000000":"#000000",
     border: darkMode ? "#0d0e0f" : darken(themeColor, 0.4),
  };
}