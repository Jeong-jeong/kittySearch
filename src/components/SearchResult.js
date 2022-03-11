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

  lazyLoadObserver() {
    const options = { threshold: 0.5 };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.src = entry.target.dataset.src;
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.querySelectorAll(".lazy"));
    lazyImages.forEach((image) => {
      io.observe(image);
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.lazyLoadObserver();
  }

  render() {
    const { data, status } = this.data;

    if (status === 200) {
      this.$searchResult.innerHTML =
        data.length > 0
          ? data
              ?.map(
                (cat, index) => `
            <li class="item" data-index=${index}>
              <img class="lazy" data-src=${cat.url} alt=${cat.name} />
			        <span class="Tooltip">${cat.name}</span>
            </li>
          `
              )
              .join("")
          : `<p class="noContent">검색 결과가 없습니다. 다른 키워드로 입력해주세요 🥲</p>`;
    } else {
      new ErrorMessage({ $target: this.$target, status });
    }
  }
}
