export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
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
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
