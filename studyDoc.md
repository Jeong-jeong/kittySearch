## 구현 명세

### 1. 코드 구조

- ES6 모듈 형태로 코드 변경하기
  script를 독립된 스코프를 가진 모듈 단위로 변경하려면 script 태그의 type을 module로 변경해줘야 한다.

  ```js
  <script type="module" src="src/main.js"></script>
  ```

  ES6 모듈은 import, export, export default 키워드들을 사용한다. package.json의 type 필드를 통해 모듈 종류를 변경할 수 있다. 기본적으로 생략될 경우 common.js 모듈 방식이다.

  ```js
  {
  // ...생략
  "type": "module",
  // ...생략
  }
  ```

- API fetch 코드를 async , await 문을 이용하여 수정하기. 해당 코드들은 에러가 났을 경우를 대비해서 적절히 처리 분기.
  - `필수` API 의 status code 에 따라 에러 메시지를 분리하여 작성.

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

### 2. HTML, CSS

- 시멘틱 코드로 변경하기

**ImageInfo**

기존에 div 태그들을 h1, button, strong, dl 태그 등을 사용해 시멘틱 하게 변경하였다.
특히 description 부분은 A는 B 형태로 사전 형식인데, 단순 div로 나뉘어 있어 dl, dt, dd로 변경하였다.
시멘틱 태그로 변경하면서 기존의 css reset 처리가 되어 있지 않아 css 파일에 추가하였다.

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

SearchResult의 리스트들을 div -> li로 변경하고 상위 태그를 ul로 변경하였다.

```js
  this.$searchResult = document.createElement("ul");

  // ... 생략
  <li class="item">
    <img src=${cat.url} alt=${cat.name} />
  </li>
```

- 반응형 처리하기.

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

992px 이하: 3개
768px 이하: 2개
576px 이하: 1개
