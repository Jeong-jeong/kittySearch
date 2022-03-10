import { Loading } from "../components/index.js";
import { api } from "../utils/api.js";

export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.$target = $target;
    $target.appendChild($imageInfo);

    this.data = data; // { visible: false, image: null }
    this.render();
  }

  async setState(nextData) {
    const loading = new Loading({ $target: this.$target });
    const { image } = nextData;

    if (image) {
      const { id } = image;
      const { data } = await api.fetchCatInfo(id);
      console.log(data, "data");
      const { origin, temperament } = data;
      const newData = {
        ...nextData,
        image: { ...nextData.image, origin, temperament },
      };
      this.data = newData;
    } else {
      this.data = nextData;
    }

    loading.closeLoading();
    this.render();
  }

  toggleModal() {
    this.setState({ image: null, visible: false });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <h1 class="title">
            <strong>${name}</strong>
            <button class="close">x</button>
          </h1>
          <img src="${url}" alt="${name}"/>        
          <dl class="description">
            <dt>성격:<dt> 
              <dd>${temperament}</dd>
          </dl>
          <dl class="description">
            <dt>태생:<dt> 
              <dd>${origin}</dd>
        </div>`;
      this.$imageInfo.style.display = "block";

      const closeButton = document.querySelector(".close");
      closeButton.addEventListener("click", (e) => {
        // 클로즈 버튼은 이벤트가 안쌓임
        this.toggleModal();
      });

      // this.$imageInfo?.addEventListener("click", (e) => {
      //   e.stopPropagation();
      //   // FIXME: 이벤트 쌓임
      //   if (e.target.className === "ImageInfo") {
      //     this.toggleModal();
      //   }
      // });

      // document.addEventListener("keydown", (e) => {
      //   // FIXME: 이벤트 쌓임
      //   if (e.key === "Escape") this.toggleModal();
      // });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
