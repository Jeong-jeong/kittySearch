# 구현 명세

## 1. 코드 구조

### ES6 모듈 형태로 코드 변경하기

script를 독립된 스코프를 가진 모듈 단위로 변경하려면 script 태그의 `type을 module`로 변경해줘야 한다.

```js
<script type="module" src="src/main.js"></script>
```

ES6 모듈은 import, export, export default 키워드들을 사용한다. `package.json의 type 필드`를 통해 모듈 종류를 변경할 수 있다. 기본적으로 생략될 경우 common.js 모듈 방식이다.

```js
{
// ...생략
"type": "module",
// ...생략
}
```

### async , await 문으로 수정.

- 해당 코드들은 에러가 났을 경우를 대비해서 적절히 처리 분기.
  - API 의 status code 에 따라 에러 메시지를 분리하여 작성하기.

```js
fetchCats: async (keyword) => {
    try {
      const result = await fetch(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      if (result.ok) { // result.ok 일 때 return
        return result.json();
      } else {
        const errorData = await result.json();
        throw errorData;
      }
    } catch (e) { // 에러가 났을 때 throw 한 에러 캐시 후 status, message 보여주기
      throw {
        status: e.status,
        message: e.message,
      };
    }
  },
```

## 2. HTML, CSS

### 시멘틱 코드로 변경하기

**ImageInfo**

기존에 div 태그들을 `h1, button, strong, dl` 태그 등을 사용해 시멘틱 하게 변경하였다.
특히 description 부분은 **A는 B 형태로 사전 형식**인데, 단순 div로 나뉘어 있어 `dl, dt, dd`로 변경하고 시멘틱 태그로 변경하면서 기존의 css reset 처리가 되어 있지 않아 css 파일에 추가하였다.

```js
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
```

**SearchResult**

SearchResult의 리스트들을 div -> `li`로 변경하고 상위 태그를 `ul`로 변경하였다.

```js
  this.$searchResult = document.createElement("ul");

  // ... 생략
  <li class="item">
    <img src=${cat.url} alt=${cat.name} />
  </li>
```

### 반응형 처리하기

SearchResult에 작성된 grid는 최소 width가 250으로 정해져 있었지만, 크기를 줄이다 250이하로 가게 되면 화면이 밀리는 현상이 발생해 `1fr`로 변경하였다.

```css
@media screen and (max-width: 992px) {
  .SearchResult {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .SearchResult {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 576px) {
  .SearchResult {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### 다크모드 지원하기

다크모드는 기본적으로 OS의 다크모드 활성화 여부에 따라 동작하되, 유저가 toggle 하여 모드를 선택할 수 있게 하였다. 추가로 `localStorage`에 토글 값을 저장하여 새로고침 시에 이전 모드를 유지하도록 했다.

```css
:root {
  /* 전역 변수 저장 */
  --color-mode: "light";
  --color-dark: #000000;
  --color-light: #ffffff;
  --background: #ffffff;
  --text-color: #000000;
}

.dark {
  /* 유저 다크모드 toggle */
  background-color: var(--color-dark);
  color: var(--color-light);
}
```

해당 로직은 외부에서 onClick을 받아오는 것보다 **내부에서 처리하는 것**이 더 좋다고 판단했다. OS 다크모드 여부를 확인하기 위해 `window.matchMedia`의 `matches 속성`으로 boolean 값을 받아온 뒤 currentMode에 저장했다.

```js
this.currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
```

전체적으로 **로컬스토리지**에 맞춰 로직이 흘러가기 때문에 첫 렌더링 시 로컬 스토리지에 값이 있으면 그 값으로 모드를 변경하고 아닐 경우 OS 모드로 로컬 스토리지에 저장한다.

```js
setItem(
  COLOR_MODE_KEY,
  getItem(COLOR_MODE_KEY) ? getItem(COLOR_MODE_KEY) : this.currentMode
);
```

`render 함수` 에선 로컬스토리지 값을 가져온 뒤 body와 button에 모드 클래스를 넣어준다. 만약 사용자가 버튼을 토글할 땐 toggleMode() 함수가 작동한다.
`toggleMode 함수`는 body와 버튼의 스타일을 변경하고, 로컬 스토리지에 모드 정보를 업데이트한다.

```js
  toggleMode() {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    this.$ToggleDarkmode.classList.toggle("dark");

    const checkHasDark = body.classList.contains("dark");
    this.$ToggleDarkmode.innerText = checkHasDark
      ? "라이트 모드 🌕"
      : "다크모드 🌑";
    setItem(COLOR_MODE_KEY, checkHasDark ? "dark" : "light");
  }
```
