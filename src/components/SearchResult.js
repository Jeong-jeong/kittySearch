export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      ?.map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.addEventListener("click", (e) => {
      // FIXME: 이벤트 중복 호출됨
      const item = e.target.closest("li");
      if (item) {
        const { index } = item.dataset;
        this.onClick(this.data[index]);
      }
    });
  }
}
