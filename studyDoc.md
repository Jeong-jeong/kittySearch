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

## 3. 이미지 상세보기 모달

### 768px 이하일 때, 디바이스 가로 길이만큼 모달 길이를 늘리기.

```css
@media screen and (max-width: 768px) {
  .ImageInfo .content-wrapper {
    width: 100vw;
  }
}
```

### 모달 close 처리

- 모달 영역 밖을 누르거나 / 키보드의 ESC 키를 누르거나 / 모달 우측의 닫기(x) 버튼을 누르면 닫히도록 수정.

이 부분은 `onClose`와 `onKeyDownClose` 메서드로 분리하여 addEventListener에 걸어주었다. 모달 처리 시 몇가지 문제가 발생했는데 하나하나 정리해보겠다.

```
1. 메서드로 이벤트 핸들러에 등록할 때 이벤트 객체를 받지 못해 콜백 형식으로 넘겨주어야 했다.
2. keydown 이벤트가 $imageInfo에 걸리지 않았다.
   $imageInfo는 div 엘리먼트이므로, 키보드 이벤트를 걸어주기 위해선 tabIndex를 넣어주어야 한다고 한다.

```

```js
$imageInfo.setAttribute("tabindex", 0);

this.$imageInfo?.addEventListener("click", (e) => this.onClose(e));
```

#### 🚀 trouble shooting

document에 걸기 보단 최대한 범위를 좁게하는 게 이벤트 흐름을 파악하기 쉽기 때문에 this.`$imageInfo`에 `tabindex`를 걸었더니 잘 작동되었다! 다만 `$imageInfo`나 `document`에 걸린 **이벤트 핸들러가 render가 될 때마다 이벤트가 중첩**으로 쌓였다. 이벤트 핸들러가 render 함수에 존재하기 때문이었다.
이를 해결하기 위해서는 초기화를 담당하는 constructor에 작성해야 하는데 **constructor에서는 업데이트된 상태값을 추적할 수 없어** render 함수 내에서 해결하는 게 필수적이었다.

내가 생각해낸 해결방안은 두가지이다.

```
1. 모달이 사라질 때 keydown 이벤트를 remove 시켜주기.
- 콜백형태로는 제거할 수 없기 때문에 debounce로 감싸진 함수의 메서드를 또 생성해야 한다.

2. 자식요소인 content-wrapper에서 이벤트를 걸어주기. ✅
- content-wrapper는 render 호출 시마다 새로 생성되기 때문에 이벤트를 해제할 필요가 없다.
- tabindex로 키보드 이벤트를 걸 경우 focus가 있어야 작동한다.
  렌더 시 content-wrapper에 focus()를 줘서 따로 포커스를 주지 않아도 키보드 이벤트가 동작하도록 했다.
```

```js
// 수정전

document.addEventListener(
  "keydown",
  debounce((e) => {
    this.onKeydownClose(e);
  }, variables.animationTime)
);
```

```js
const $contentWrapper = document.querySelector(".content-wrapper");
$contentWrapper.focus();

$contentWrapper.addEventListener(
  "keydown",
  debounce((e) => {
    this.onKeydownClose(e);
  }, variables.keyboardEventTime)
);
```

### 모달에서 고양이의 성격, 태생 정보를 불러오기.

기존에 `SearchResult` 컴포넌트에서 클릭하면 id값을 받아오는 로직이 구현되어 있었다. 내가 할 일은 id값으로 api 요청 후 기존 state에 업데이트 해주는 것이다.

```js
// App.js
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

// SearchResult.js
// 기존에 있던 로직을 메서드로 분리
findIndexWithClick(e) {
    const { data } = this.data;
    const item = e.target.closest("li");
    if (item) {
      const { index } = item.dataset;
      this.onClick(data[index]);
    }
  }

// constructor에서 이벤트 등록 + 이벤트 위임 방식 활용
 this.$searchResult.addEventListener("click", (e) =>
    this.findIndexWithClick(e)
  );
```

`ImageInfo` 컴포넌트에서 기존에 받아온 데이터에 fetchCatInfo를 추가로 요청해서 합친다. 웬만하면 setState에 async를 쓰고 싶지 않았지만 `onFetchCatInfo`가 비동기로 동작하기 때문에 데이터를 다 받아온 뒤 loading을 끝내도록 await를 붙여줘야 했다.

```js
// ImageInfo.js
 async setState(nextData) {
    const loading = new Loading({ $target: this.$target });
    const { image } = nextData;

    await this.onFetchCatInfo(image, nextData);

    loading.closeLoading();
    this.render();
  }
```

### `추가` 모달 열고 닫기에 fade in/out을 적용.

기본적으로 모달에 `animation fadeIn`을 넣어서 block이 될 때 클래스를 추가하지 않아도 애니메이션이 적용되었다. 이후 setState를 통해 `visible이 false`로 변경되면 fadeOut 클래스를 붙여서 fadeOut 애니메이션이 적용된다.

```css
/* css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}
```

바로 display: none을 줘버리면 애니메이션을 넣어도 작동하지 않기 때문에,
`fadeOut`이 끝날 때 `display: none`이 아닌 hidden을 줘서 **애니메이션이 다 마무리 되고 난 후**, `setTimeout으로 display: none`을 줘서 DOM 요소에서 없앤다.

```js
// ImageInfo.js
if (!visible) {
  this.$imageInfo.classList.add("fadeOut");
  setTimeout(() => {
    this.$imageInfo.style.display = "none";
  }, variables.animationTime);
}
```

## 4. 검색 페이지

### 검색 페이지 진입 시 input focus 처리

초기화 함수를 만들고(`onInit`) render 메서드에서 실행시켰다.

```js
// SearchInput.js
onInit() {
  this.$searchInput.focus();
}

render() {
  this.onInit();
}
```

### input 클릭 시 기존 키워드 삭제처리

초기에는 `onResetInputValue` 함수를 따로 만들었는데, **외부에서 Input 값을 변경할 일이 종종 생기자** 새 value를 받고, value를 설정해주는 메서드로 변경했다.

```js
onSetInputValue(newValue) {
    this.$searchInput.value = newValue;
  }
```

### 필수 검색 결과가 없을 때, UI 처리

```js
if (status === 200) {
  // fetching한 데이터의 status code가 200일 때
      this.$searchResult.innerHTML =
        data.length > 0
          ? data.map(순회~~)
          : `<p class="noContent">검색 결과가 없습니다. 다른 키워드로 입력해주세요 🥲</p>`; // 검색 결과가 존재하지 않을 때
    } else {
      // 400, 500 등의 오류가 생겼을 때
      new ErrorMessage({ $target: this.$target, status });
    }
```

### 최근 검색 5개까지 키워드 구현

- 특정 키워드를 누르면 검색.
- 가장 최근에 검색한 5개의 키워드까지만
- x 버튼을 누르면 삭제하기

#### 검색 키워드를 5개까지 표시하기

기존에 SearchInput에서 만들어놨던 로직을 재활용하면 돼서 편했다. SerchInput의 `onSearch` 메서드는 **검색 후 keyword를 받아 데이터를 fetching 한다**.
로직을 살짝 바꿔 App 컴포넌트에서 관리할 keywords 상태를 만들었다. 이후 onSearch에서 keyword 검색이 발생하면 3가지 정도의 분기에 따라 keywords를 저장한다.

1. keywords 배열에 이미 **검색한 키워드가 있는 경우**
   기존의 keywords를 그대로 사용한다.

2. keywords 배열에 이미 **검색한 키워드가 없는 경우**
   이때는 keywords **배열의 길이가 5가 넘는지 안넘는지** 구분해줘야 한다. 넘는다면 `후입선출` 로직으로 가장 오래된 데이터를 shift로 지우고 새 데이터를 넣는다. 넘지 않으면 그대로 새 keyword를 마지막에 넣어준다. 데이터를 바꿀 때는 **불변성을 유지하는 게 중요하므로** 항상 새 참조값으로 변경해줘야 한다! 또 항상 setState를 통해 상태를 변경해야 한다.

   ```js
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
   ```

   #### 키워드를 누를 경우 검색, x버튼을 누를 경우 삭제

KeywordList 컴포넌트는 `$target`, `initialState`, `onDeleteKeyword`, `onClickKeyword` 4가지를 인수로 받는다. 외부에서 메서드를 받는 이유는 삭제 메서드에선 keywords를 보관하다 로컬 스토리지에 저장해야하기 때문이고, 클릭 메서드에선 SearchInput을 건드려야 하기 때문에 컴포넌트 내부는 최대한 순수하게 작성하고자 노력했다.

```js
// App.js
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
```

삭제 메서드에선 처음에 filter로 클릭한 키워드와 같은 것만 삭제하려 했는데, **중복으로 같은 keyword가 있을 경우 다 삭제**되는 문제가 있었다. 따라서 `findIndex`로 **중복된 값중 오래된 value 한 개만 삭제**하도록 구현했다.

```js
// KeywordList.js
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
```

### 새로 고침 시 마지막 검색 화면 유지

### 50마리 랜덤 고양이 사진 뿌리기

### 이미지 lazy 로딩 처리하기

### 고양이 사진 hover 시 이름 노출
