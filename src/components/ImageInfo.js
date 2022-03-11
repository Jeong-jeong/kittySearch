import { Loading } from "../components/index.js";
import { api } from "../utils/api.js";
import { debounce } from "../utils/debounce.js";
import { variables } from "../utils/variable.js";
export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.$target = $target;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();
  }

  async setState(nextData) {
    const loading = new Loading({ $target: this.$target });
    const { image } = nextData;

    await this.onFetchCatInfo(image, nextData);

    loading.closeLoading();
    this.render();
  }

  async onFetchCatInfo(image, nextData) {
    try {
      if (image) {
        const { id } = image;
        const { status, data } = await api.fetchCatInfo(id);
        if (status === 200) {
          const { origin, temperament } = data;
          const newData = {
            status,
            ...nextData,
            image: { ...nextData.image, origin, temperament },
          };
          this.data = newData;
        } else {
          throw {
            status,
          };
        }
      } else {
        // @NOTE: 모달을 닫을 때 처리
        this.data = nextData;
      }
    } catch (e) {
      this.data = { ...nextData, status: e.status };
    }
  }

  onClose(e) {
    if (e.target.className === "ImageInfo" || e.target.className === "close") {
      this.toggleModal();
    }
  }

  onKeydownClose(e) {
    if (e.key === "Escape") this.toggleModal();
  }

  toggleModal() {
    this.setState({ image: null, visible: false });
  }

  render() {
    const { status, visible, image } = this.data;
    if (visible || status === 200) {
      this.$imageInfo.classList.remove("fadeOut");
      this.$imageInfo.style.display = "block";
      const { name, url, temperament, origin } = image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper" tabindex="0">
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

      this.$imageInfo?.addEventListener("click", (e) => this.onClose(e));
      const $contentWrapper = document.querySelector(".content-wrapper");
      $contentWrapper.focus();

      $contentWrapper.addEventListener(
        "keydown",
        debounce((e) => {
          this.onKeydownClose(e);
        }, variables.keyboardEventTime)
      );
    } else {
      this.$imageInfo.classList.add("fadeOut");
      setTimeout(() => {
        this.$imageInfo.style.display = "none";
      }, variables.animationTime);
    }
  }
}
