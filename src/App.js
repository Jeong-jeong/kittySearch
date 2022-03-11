import {
  SearchInput,
  SearchResult,
  ImageInfo,
  ToggleDarkmode,
  Loading,
} from "./components/index.js";
import { api } from "./utils/api.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.ToggleDarkmode = new ToggleDarkmode({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        const loading = new Loading({ $target });
        const response = await api.fetchCats(keyword);
        this.setState(response);
        loading.closeLoading();
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
