import { ErrorMessage } from "../components/index.js";

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;

    this.render();

    this.$searchResult.addEventListener("click", (e) =>
      this.findIndexWithClick(e)
    );
  }

  findIndexWithClick(e) {
    const { data } = this.data;
    const item = e.target.closest("li");
    if (item) {
      const { index } = item.dataset;
      this.onClick(data[index]);
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const { data, status } = this.data;

    if (status === 200) {
      this.$searchResult.innerHTML = data
        ?.map(
          (cat, index) => `
            <li class="item" data-index=${index}>
              <img src=${cat.url} alt=${cat.name} />
            </li>
          `
        )
        .join("");
    } else {
      new ErrorMessage({ $target: this.$target, status });
    }
  }
}
