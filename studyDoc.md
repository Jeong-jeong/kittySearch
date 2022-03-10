## 구현 명세

1. 코드 구조

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
