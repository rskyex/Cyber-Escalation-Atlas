"use client";

export type Theme = "dark" | "light";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("cea-theme") as Theme) || "dark";
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem("cea-theme", theme);
  document.documentElement.className = theme;
}

export function initTheme() {
  const theme = getStoredTheme();
  document.documentElement.className = theme;
  return theme;
}
