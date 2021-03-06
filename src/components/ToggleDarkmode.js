import { getItem, setItem } from "../utils/localStorage.js";
import { localKey } from "../utils/variable.js";

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
      localKey.COLOR_MODE_KEY,
      getItem(localKey.COLOR_MODE_KEY)
        ? getItem(localKey.COLOR_MODE_KEY)
        : this.currentMode
    );
    this.render();
  }

  toggleMode() {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    this.$ToggleDarkmode.classList.toggle("dark");

    const checkHasDark = body.classList.contains("dark");
    this.$ToggleDarkmode.innerText = checkHasDark
      ? "라이트 모드 🌕"
      : "다크모드 🌑";
    setItem(localKey.COLOR_MODE_KEY, checkHasDark ? "dark" : "light");
  }

  render() {
    const body = document.querySelector("body");
    const getStorageMode = getItem(localKey.COLOR_MODE_KEY);
    if (getStorageMode === "dark") {
      body.classList.add("dark");
      this.$ToggleDarkmode.classList.add("dark");
    }
    this.$ToggleDarkmode.innerText =
      getStorageMode === "dark" ? "라이트 모드 🌕" : "다크모드 🌑";
    this.$target.appendChild(this.$ToggleDarkmode);

    this.$ToggleDarkmode.addEventListener("click", () => {
      this.toggleMode();
    });
  }
}
