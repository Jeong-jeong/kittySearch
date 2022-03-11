import { debounce } from "../utils/debounce.js";
import { variables } from "../utils/variable.js";
import { hasInputValue } from "../utils/validation.js";

export default class SearchInput {
  $searchInput = null;
  onSearch = null;

  constructor({ $target, initialState, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.onSetInputValue(initialState);
    this.onSearch = onSearch;
    this.$searchInput.placeholder = "고양이를 검색해보세요.";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    if (initialState) this.onSearch(initialState);

    this.render();

    // @NOTE: Enter가 두번 보내지는 것을 방지하기 위해 디바운싱 사용
    $searchInput.addEventListener(
      "keyup",
      debounce((e) => {
        this.onSearchResult.call(this, e);
      }, variables.animationTime)
    );

    $searchInput.addEventListener("click", () => this.onSetInputValue(""));
  }

  onInit() {
    this.$searchInput.focus();
  }

  onSetInputValue(newValue) {
    this.$searchInput.value = newValue;
  }

  onDeleteInputValue(value) {
    this.$searchInput.value = value.trim();
  }

  onSearchResult(e) {
    if (e.key === "Enter") {
      const value = e.target.value;
      if (hasInputValue(value)) {
        this.onDeleteInputValue(value);
        this.onSearch(value);
      }
    }
  }

  render() {
    this.onInit();
  }
}
