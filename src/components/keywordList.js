export default class KeywordList {
  $keywordList = null;
  data = [];
  onClick = null;

  constructor({ $target, initialState, onDeleteKeyword, onClickKeyword }) {
    this.$keywordList = document.createElement("ul");
    this.$keywordList.className = "KeywordList";
    this.data = initialState;
    $target.appendChild(this.$keywordList);

    this.render();

    this.$keywordList.addEventListener("click", (e) => {
      switch (e.target.className) {
        case "KeywordClose":
          const button = e.target.closest("button");

          if (button) {
            const findIndex = this.data.findIndex((v) => v === button.value);
            const newData = this.data.filter((v, i) => i !== findIndex);
            onDeleteKeyword(newData);
          }
          break;
        case "KeywordButton":
          onClickKeyword(e.target.value);
          break;
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordList.innerHTML = this.data
      ?.map(
        (keyword) =>
          `<li class="KeywordItem">
					  <button class="KeywordButton" type="button" value="${keyword}">${keyword} 
						  <span class="KeywordClose">X</span>	
						</button>
					</li>`
      )
      .join("");
  }
}
