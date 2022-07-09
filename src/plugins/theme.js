import { ref } from "vue";

const theme = ref("");

export function setTheme(newTheme) {
  theme.value = newTheme;
  localStorage.setItem("theme", newTheme);

  if (newTheme === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
}

export function getTheme() {
  return theme.value;
}

export function toggleTheme() {
  switch (localStorage.getItem("theme")) {
    case "light":
      setTheme("dark");
      break;

    default:
      setTheme("light");
      break;
  }
}

export function initTheme() {
  const cachedTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : false;
  const userPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (cachedTheme) {
    setTheme(cachedTheme);
  } else if (userPrefersDark) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}
