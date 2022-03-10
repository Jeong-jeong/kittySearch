export default class Loading {
  $Loading = null;

  constructor({ $target }) {
    this.$Loading = document.createElement("div");
    this.$Loading.className = "Loading-wrapper";

    $target.appendChild(this.$Loading);
    this.render();
  }

  closeLoading() {
    this.$Loading.remove();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$Loading.innerHTML = `
			<div class="Loading"></div>
		`;
  }
}
