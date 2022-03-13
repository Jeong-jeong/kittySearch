## 🔥 프로젝트 과정 소개

요구사항을 처리하는 과정에서 `studyDocs`에 기록하였으며, **특히 어려웠던 부분은 별표(⭐️) 처리**하였습니다.

```shell
  💡 특정 요구사항 해결과정을 확인하고 싶다면 클릭하여 링크를 따라가 주세요!
```

<br>

### 1. [코드 구조](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#1-코드-구조)

- [ES6 모듈 형태로 코드 변경하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#es6-모듈-형태로-코드-변경하기)
- [async, await 문으로 수정하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#async--await-문으로-수정)

### 2. [HTML, CSS](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#2-html-css)

- [시멘틱 코드로 변경하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#시멘틱-코드로-변경하기)
- [반응형 처리하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#반응형-처리하기)
- [다크모드 지원하기 with localStorage](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#다크모드-지원하기)

### 3. [이미지 상세보기 모달](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#3-이미지-상세보기-모달)

- [768px 이하일 때 모달 길이 늘리기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#768px-이하일-때-디바이스-가로-길이만큼-모달-길이를-늘리기)
- [모달 close 처리하기 ⭐️](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#모달-close-처리)
- [모달에서 고양이 정보 불러오기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#모달에서-고양이의-성격-태생-정보를-불러오기)
  - [모달 열고 닫기에 애니메이션 적용하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#추가-모달-열고-닫기에-fade-inout을-적용)

### 4. [검색 페이지](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#4-검색-페이지)

- [검색 페이지 진입 시 focus 처리하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#검색-페이지-진입-시-input-focus-처리)
- [input 클릭 시 기존 키워드 삭제하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#input-클릭-시-기존-키워드-삭제처리)
- [필수 검색 결과 없을 때 UI 처리](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#필수-검색-결과가-없을-때-ui-처리)
- [최근 검색어 처리 ⭐️](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#최근-검색-5개까지-키워드-구현)
- [새로고침 시 마지막 화면 유지하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#새로-고침-시-마지막-검색-화면-유지)
- [50마리 랜덤 고양이 사진 뿌리기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#50마리-랜덤-고양이-사진-뿌리기)
- [이미지 lazy 로딩 처리하기 ⭐️](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#이미지-lazy-로딩-처리하기)
- [고양이 사진 hover 시 이름 노출하기](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#고양이-사진-hover-시-이름-노출)

### 5. [스크롤 페이징 구현 ⭐️](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#5-스크롤-페이징-구현)

### 6. [webpack 설정 및 배포](https://github.com/Jeong-jeong/kittySearch/blob/main/studyDoc.md#6-webpack-설정-및-배포-1)

<br>
<br>

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
로직을 살짝 바꿔 App 컴포넌트에서 관리할 `keywords` 상태를 만들었다. 이후 onSearch에서 keyword 검색이 발생하면 **3가지 정도의 분기에 따라** keywords를 저장한다.

1. keywords 배열에 이미 **검색한 키워드가 있는 경우**
   기존의 keywords를 그대로 사용한다.

2. keywords 배열에 이미 **검색한 키워드가 없는 경우**
   이때는 keywords **배열의 길이가 5가 넘는지 안 넘는지** 구분해줘야 한다.
   - 넘는다면 `후입선출` 로직으로 가장 오래된 데이터를 shift로 지우고 새 데이터를 넣는다. - 넘지 않으면 그대로 새 keyword를 마지막에 넣어준다.

데이터를 바꿀 때는 **불변성을 유지하는 게 중요하므로** 항상 새 참조값으로 변경해줘야 한다! 또 항상 setState를 통해 상태를 변경해야 한다.

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

KeywordList 컴포넌트는 `$target`, `initialState`, `onDeleteKeyword`, `onClickKeyword` 4가지를 인수로 받는다.
외부에서 메서드를 받는 이유는 `삭제 메서드`에선 keywords를 보관하다 로컬 스토리지에 저장해야하기 때문이고, `클릭 메서드`에선 `SearchInput`을 건드려야 하기 때문에 컴포넌트 내부는 최대한 순수하게 작성하고자 노력했다.

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

`삭제 메서드`에선 처음에 filter로 클릭한 키워드와 같은 것만 삭제하려 했는데, **중복으로 같은 keyword가 있을 경우 다 삭제**되는 문제가 있었다. 따라서 `findIndex`로 **중복된 값중 오래된 value 한 개만 삭제**하도록 구현했다.

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

마지막 검색화면을 유지하기 위해선 결과 화면에 뿌려줄 `키워드 목록`, input에 넣을 `마지막 검색 키워드`가 필요하다.

```js
// App.js
keywords = [];
lastSearchKeyword = "";
```

검색 이벤트가 일어날 때마다 setState가 발생하면 `localStorage에 저장`하고 App이 렌더될 때마다 `localStorage` 값을 가져온다.

```js
// App.js
setState(nextData) {
    const { data, keywords } = nextData;
    this.data = data;
    this.keywords = keywords;
    this.searchResult.setState(data);
    this.keywordList.setState(keywords);

    // @NOTE: 로컬 스토리지에 변경된 데이터를 저장한다.
    const setLocalStorage = {
      keywords,
      lastSearchKeyword: this.lastSearchKeyword,
    };
    setItem(localKey.SEARCH_RESULT_KEY, JSON.stringify(setLocalStorage));
  }
```

```js
// App.js
// @NOTE: App이 렌더되면 로컬 스토리지에서 값을 가져온 뒤 초기화 시킨다.
constructor($target) {
    const getLocalResult = JSON.parse(getItem(localKey.SEARCH_RESULT_KEY));
    if (getLocalResult) {
      const { keywords, lastSearchKeyword } = getLocalResult;
      this.keywords = keywords;
      this.lastSearchKeyword = lastSearchKeyword;
    }
}
```

두 값을 최상단에서 갖고 있다가 각 컴포넌트에 `initialState`로 넣어주어 첫 렌더 시에 화면에 뿌려준다.

```js
this.searchInput = new SearchInput({
  $target,
  initialState: this.lastSearchKeyword,
  // ... 생략
});

this.keywordList = new keywordList({
  $target,
  initialState: this.keywords,
  // ... 생략
});
```

이미 **마지막 키워드를 첫 렌더시에 로컬 스토리지에서 가져오므로**, 가져온 값이 존재한다면 SearchInput에서 초기화 시 검색 이벤트를 발생시킨다. 코드 몇 줄로 마지막 검색 화면을 유지할 수 있다니 참 편리하다 ☺️

```js
// SearchInput.js
constructor({ $target, initialState, onSearch }) {
    if (initialState) this.onSearch(initialState);
}
```

### 50마리 랜덤 고양이 사진 뿌리기

App의 setState는 `검색 결과 목록`과 `키워드 목록`을 받아 각 컴포넌트에 저장해주므로, 랜덤 고양이 사진을 받아와 setState를 발생시키면 알아서 유기적으로 동작한다.

```js
// App.js
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
```

### 이미지 lazy 로딩 처리하기

#### 🚀 Troble Shooting

`Lazy loading`이란 viewport에 보일 이미지들만 받고, 나저미 소스들은 대기시키는 것을 의미한다. 어떠한 대상이 viewport에 들어왔는지 지속적으로 관찰해야하기 때문에 동기적으로 작동하는 scroll 이벤트보다 **비동기적으로 작동하는 `InterceptorObserver API` 를 활용**하면 좋다.
`InterceptionObserver(IO)`는 `target`과 `root(기본 viewport)`의 교차점을 비동기적으로 관찰하는 web API 이다. 인수로 callback과 options을 받아 target이 root에 진입했을 때 처리할 작업을 `callback`에 작성하면 된다.
**전체적인 프로세스는 img src를 비워뒀다가 교차점에 진입했을 때 data-src에 저장되어 있던 값을 src로 옮겨주는 것**이다.

1. 우선 IO를 생성하고 callback과 options를 선언한다.
2. img에 lazy 클래스를 붙이고 돌면서 `observe` 메서드로 등록해준다.

```js
lazyLoadObserver() {
    const options = { threshold: 0.5 };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.src = entry.target.dataset.src;
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    // @NOTE: 관찰 대상들을 observe 메서드로 등록한다.
    const lazyImages = Array.from(document.querySelectorAll(".lazy"));
    lazyImages.forEach((image) => {
      io.observe(image);
    });
  }
```

3. callback의 첫번째 매개변수인 `entries`엔 각 대상들이 교차점에 진입했는지 여부 뿐만 아니라 다른 것들도 확인이 가능하다.
   ![image](https://user-images.githubusercontent.com/68528752/157995877-ad390e7f-c1d9-4cf3-8a75-1eda368cda19.png)

4. target이 `isIntersecting`(진입 여부)라면, 이미 진입했다는 뜻이므로 `unobserve(관찰 해제)` 시키고, `data-src`에 저장했던 이미지 경로를 src로 옮긴다.
   unobserve 시키는 이유는 다시 위로 올렸을 때 같은 액션이 발생하지 않도록 하기 위해서이다.

### 고양이 사진 hover 시 이름 노출

Tooltip 이라는 태그를 만들고, hover시에 `visibility` 값을 변경한다. visibility를 사용하는 이유는 **visibility가 DOM에 남아있기 때문에 리플로우가 일어나지 않아** 렌더링 최적화에 도움이 된다.

```js
 <li class="item" data-index=${index}>
  <img class="lazy" data-src=${cat.url} alt=${cat.name} />
  <span class="Tooltip">${cat.name}</span> // NOTE: Tooltip 추가
</li>
```

```css
.SearchResult .item:hover .Tooltip {
  visibility: visible;
}

.Tooltip {
  visibility: hidden;
  position: absolute;
  min-width: 120px;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-dark);
  color: var(--color-light);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
}

.Tooltip::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  border-style: solid;
  border-width: 5px;
  border-color: var(--color-dark) transparent transparent transparent;
}
```

## 5. 스크롤 페이징 구현

부분적으로 받을 수 있는 API가 존재하지 않아 **기존 데이터를 전체적으로 받고 10개씩 끊어서** 불러오게끔 했다.

```js
// variable.js
export const variables = {
  countGetDataOnce: 10, // 한번에 몇개까지 받을지 상수화
};
```

스크롤 페이징도 IO를 활용한다. target을 **ul의 가장 마지막에 위치**시키고, IO로 감시하며 교차했을 때 callback 함수를 실행한다. li가 길어지면 알아서 target이 뒤로 밀리기 때문에 데이터를 다 받지 않는 이상 unobserve 시킬 필요가 없다.

```js
// SearchResult.js
// @NOTE: 안보이는 target 생성
this.$lastPage = document.createElement("span");
this.$lastPage.className = "LastPage";
$target.appendChild(this.$lastPage);
```

IO 로직을 설명하기 전에 우선 데이터를 자르는 함수가 필요하다. `combineData`는 원본 데이터를 받고 limit 값에 따라 새 데이터를 리턴한다. 끊어받을 limit 데이터는 인스턴스 프로퍼티를 활용했다.

```js
  combineData(originData) {
    // @NOTE: this.dataLimit에 따라 원본 데이터를 자르고 리턴
    const { data, status } = originData;
    if (status === 200) {
      const nextData = [...data].slice(
        0,
        this.dataLimit * variables.countGetDataOnce
      );
      return { status, data: nextData };
    } else {
      return { status, data: data };
    }
  }
```

`combineData`는 **원본 데이터를 변경하는 작업**이기 때문에, setState 함수 내에서 활용되어야 한다. setState가 `외부에서 fetch한 데이터를 저장`할 때도 사용되고, `무한 스크롤 때에도 활용`되므로 두 가지를 잘 구분해야 한다.
특히 무한스크롤 시에 기존의 data가 변경되므로, **원본 데이터를 저장할 필요가 있다**. 원본 데이터를 받아올 때는 무한 스크롤 시에 데이터 보다 길이가 무조건 크거나 같으므로 그때 저장해준다.

```js
  setState(nextData) {
    const { status, data } = nextData;
    if (status === 200 && data.length > variables.countGetDataOnce) {
      // @NOTE: 하나의 setState에서 무한스크롤을 위한 처리, 외부에서 데이터 받는 처리 구분
      // @NOTE: 외부에서 받은 데이터 길이가 무한스크롤 길이보다 크다면 원본 데이터!
      this.originData = nextData;
    }
    this.data = this.combineData(nextData);
    this.render();
    this.lazyLoadObserver();
    this.scrollPagingObserver();
  }
```

<br>

IO 로직을 설명할 차례다. 중요한 것은 `IO에서 setState`는 항상 **originData를 인수로 받는다는 것**이다. 그래야만 원본 데이터를 받아 slice가 limit 길이만큼 자를 수가 있다. 이 때문에 originData를 저장하는 작업이 필요했던 것이다.
target이 뷰포트에 진입했다면 `limit`값을 높이고 `setState`를 실행한다.
**만약 무한 스크롤 데이터가 이미 다 받아졌다면** target을 `unobserve` 하여 더이상 callback을 실행하지 않도록 한다.

```js
scrollPagingObserver() {
    const options = { threshold: 0 };
    const callback = (entries, observer) => {
      const { status, data } = this.data;
      const { data: originList } = this.originData;

      // @NOTE: 받아온 데이터가 원본 데이터 길이와 같다면
      if (data.length === originList.length) {
        observer.unobserve(this.$lastPage);
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting && status === 200) {
          this.dataLimit++;
          this.setState(this.originData);
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    io.observe(this.$lastPage);
  }
```

마지막으로 데이터를 불러왔을 때 Lazy-loading 때문에 **첫 렌더링 시 일시적으로 이미지의 alt값이 노출되면서 높이가 줄어든다**. 이는 target이 viewport에 노출될 수 있기 때문에 img의 `최소 height`을 줘서 target이 노출되지 않도록 해야한다.

```css
.SearchResult img {
  min-height: 200px;
}
```

## 6. webpack 설정 및 배포

이번에는 firebase를 활용해 배포를 진행했다. firebase는 빌드된 정적파일로 배포가 진행되기 때문에 webpack을 통해 번들링했다. 사실 작은 프로젝트에 너무 거창한 플러그인들을 추가한 것 같은데 실무같은 마음으로 임하고자 다양하게 활용해보았다. 각 플러그인과 로더들의 활용방안은 아래와 같다.

```js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html을 읽고 minify 하기 위함
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css를 읽고 따로 추출하기 위함
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css 파일을 minify 하기 위함
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // build 될 때 기존에 남아있던 파일을 삭제하기 위함
const TerserPlugin = require("terser-webpack-plugin"); // js를 minify, uglify 하기 위함
```

```js
const path = require("path");

module.exports = {
  mode: "production", // production 모드로 해야 파일들이 uglify 된다고 함.
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // html 파일 추출
      template: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({}), // css 파일 별도 추출
    new CleanWebpackPlugin(), // 번들시 기존 public 폴더 내 초기화
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // css 파일을 읽고 따로 추출
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }, // html 파일 minify
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // css, js minize, js uglify
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
```
