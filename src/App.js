import {
  SearchInput,
  SearchResult,
  ImageInfo,
  ToggleDarkmode,
  Loading,
  keywordList,
  RandomButton,
} from "./components/index.js";
import { api } from "./utils/api.js";
import { getItem, setItem } from "./utils/localStorage.js";
import { localKey } from "./utils/variable.js";

export default class App {
  $target = null;
  data = [];
  keywords = [];
  lastSearchKeyword = "";

  constructor($target) {
    this.$target = $target;
    const getLocalResult = JSON.parse(getItem(localKey.SEARCH_RESULT_KEY));
    if (getLocalResult) {
      const { keywords, lastSearchKeyword } = getLocalResult;
      this.keywords = keywords;
      this.lastSearchKeyword = lastSearchKeyword;
    }

    this.ToggleDarkmode = new ToggleDarkmode({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      initialState: this.lastSearchKeyword,
      onSearch: async (keyword) => {
        this.lastSearchKeyword = keyword;
        const hasSameKeyword = this.keywords.find((prev) => prev === keyword);
        const checkOver5Length = this.keywords.length === 5;
        const loading = new Loading({ $target });

        const response = await api.fetchCats(keyword);

        let newKeywords = [];
        if (hasSameKeyword) {
          newKeywords = [...this.keywords];
        } else {
          if (checkOver5Length) {
            newKeywords = [...this.keywords];
            newKeywords.shift();
            newKeywords.push(keyword);
          } else {
            newKeywords = [...this.keywords, keyword];
          }
        }
        const nextState = {
          data: response,
          keywords: newKeywords,
        };
        this.setState(nextState);

        loading.closeLoading();
      },
    });

    this.randomButton = new RandomButton({
      $target,
      fetchRandomCats: async () => {
        const loading = new Loading({ $target });
        const response = await api.fetchRandomCats();

        this.setState({
          data: response,
          keywords: this.keywords,
        });
        loading.closeLoading();
      },
    });

    this.keywordList = new keywordList({
      $target,
      initialState: this.keywords,
      onDeleteKeyword: (deletedKeywordList) => {
        this.setState({
          data: this.data,
          keywords: deletedKeywordList,
        });
      },
      onClickKeyword: (keyword) => {
        this.searchInput.onSetInputValue(keyword);
        this.searchInput.onSearch(keyword);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    const { data, keywords } = nextData;
    this.data = data;
    this.keywords = keywords;
    this.searchResult.setState(data);
    this.keywordList.setState(keywords);
    const setLocalStorage = {
      keywords,
      lastSearchKeyword: this.lastSearchKeyword,
    };
    setItem(localKey.SEARCH_RESULT_KEY, JSON.stringify(setLocalStorage));
  }
}
