import { ErrorMessage } from "../components/index.js";
import { variables } from "../utils/variable.js";

export default class SearchResult {
  $searchResult = null;
  $lastPage = null;
  originData = null; // @NOTE: 초기 원본 데이터 저장
  data = null; // @NOTE: 무한 스크롤에 따라 결합될 데이터
  onClick = null;
  dataLimit = 1;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    // @NOTE: 무한 스크롤을 위한 안보이는 엘리먼트 생성
    this.$lastPage = document.createElement("span");
    this.$lastPage.className = "LastPage";
    $target.appendChild(this.$searchResult);
    $target.appendChild(this.$lastPage);

    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;

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

  scrollPagingObserver() {
    const options = { threshold: 0 };
    const callback = (entries, observer) => {
      const { status, data } = this.data;
      const { data: originList } = this.originData;

      // @NOTE: 받아온 데이터가 원본 데이터 길이와 같다면
      if (data.length === originList.length) {
        observer.unobserve(this.$lastPage);
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting && status === 200) {
          this.dataLimit++;
          this.setState(this.originData);
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    io.observe(this.$lastPage);
  }

  combineData(originData) {
    // @NOTE: this.dataLimit에 따라 원본 데이터를 자르고 리턴
    const { data, status } = originData;
    if (status === 200) {
      const nextData = [...data].slice(
        0,
        this.dataLimit * variables.countGetDataOnce
      );
      return { status, data: nextData };
    } else {
      return { status, data: data };
    }
  }

  setState(nextData) {
    const { status, data } = nextData;
    if (status === 200 && data.length > variables.countGetDataOnce) {
      // @NOTE: 하나의 setState에서 무한스크롤을 위한 처리, 외부에서 데이터 받는 처리 구분
      // @NOTE: 외부에서 받은 데이터 길이가 무한스크롤 길이보다 크다면 원본 데이터!
      this.originData = nextData;
    }
    this.data = this.combineData(nextData);
    this.render();
    this.lazyLoadObserver();
    this.scrollPagingObserver();
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
