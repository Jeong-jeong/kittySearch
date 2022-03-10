import { getItem, setItem } from "../utils/localStorage.js";
const COLOR_MODE_KEY = "COLOR_MODE";

export default class ToggleDarkmode {
  constructor({ $target }) {
    const $ToggleDarkmode = document.createElement("button");
    $ToggleDarkmode.className = "ToggleDarkmode";
    this.$ToggleDarkmode = $ToggleDarkmode;
    this.$target = $target;
    this.currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    // 첫 렌더 시 storage에 값이 있다면 해당 값으로 변경, 없으면 OS 모드로 저장
    setItem(
      COLOR_MODE_KEY,
      getItem(COLOR_MODE_KEY) ? getItem(COLOR_MODE_KEY) : this.currentMode
    );
    this.render();
  }

  toggleMode() {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    this.$ToggleDarkmode.classList.toggle("dark");

    const checkHasDark = body.classList.contains("dark");
    this.$ToggleDarkmode.innerText = checkHasDark
      ? "다크모드 🌑"
      : "라이트 모드 🌕";
    setItem(COLOR_MODE_KEY, checkHasDark ? "dark" : "light");
  }

  render() {
    const body = document.querySelector("body");
    const getStorageMode = getItem(COLOR_MODE_KEY);
    body.classList.add(getStorageMode === "dark" ? "dark" : "light");
    this.$ToggleDarkmode.classList.add(
      getStorageMode === "dark" ? "dark" : "light"
    );
    this.$ToggleDarkmode.innerText =
      getStorageMode === "dark" ? "다크모드 🌑" : "라이트 모드 🌕";
    this.$target.appendChild(this.$ToggleDarkmode);

    this.$ToggleDarkmode.addEventListener("click", () => {
      this.toggleMode();
    });
  }
}
