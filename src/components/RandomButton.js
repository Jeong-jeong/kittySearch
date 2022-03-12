import { debounce } from "../utils/debounce.js";
import { variables } from "../utils/variable.js";

export default class RandomButton {
  constructor({ $target, fetchRandomCats }) {
    this.$RandomButton = document.createElement("button");
    this.$RandomButton.className = "RandomButton";
    this.$RandomButton.innerText = "😻";
    this.$RandomButton.ariaLabel = "랜덤 고양이 사진 불러오기";
    this.$RandomButton.title = "랜덤 고양이 사진 불러오기";
    $target.appendChild(this.$RandomButton);

    this.$RandomButton.addEventListener(
      "click",
      debounce(() => {
        fetchRandomCats();
      }, variables.animationTime)
    );
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
}
