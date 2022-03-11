import { debounce } from "../utils/debounce.js";
import { variables } from "../utils/variable.js";

export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.onSearch = onSearch;
    this.$searchInput.placeholder = "고양이를 검색해보세요.";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    // @NOTE: Enter가 두번 보내지는 것을 방지하기 위해 디바운싱 사용
    $searchInput.addEventListener(
      "keyup",
      debounce((e) => {
        this.onSearchResult.call(this, e);
      }, variables.animationTime)
    );
  }

  onSearchResult(e) {
    if (e.key === "Enter") this.onSearch(e.target.value);
  }
}
