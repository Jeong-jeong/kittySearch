export default class ErrorMessage {
  constructor({ $target, status }) {
    const $errorMessage = document.createElement("div");
    $errorMessage.className = "ErrorMessage";
    $target.appendChild($errorMessage);

    this.$errorMessage = $errorMessage;
    this.status = status;

    this.render();
  }

  render() {
    let message = "";
    if (400 <= this.status && this.status < 500) {
      message = `결과를 찾지 못했습니다. 다시 시도해주세요. 🥲`;
    } else if (500 <= this.status) {
      message = `서버 오류가 발생했습니다. 다시 시도해주세요. 🥲`;
    } else {
      this.$errorMessage.remove();
    }
    this.$errorMessage.innerHTML = `
			<p>${message}</p>
		`;
  }
}
