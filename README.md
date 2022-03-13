<h1 align="center">바닐라 JS를 활용해 SPA로 구현한 고양이 검색 사이트</h1>
<p align="center"><strong><a href="https://programmers.co.kr/skill_check_assignments/4" target="_blank">프로그래머스 2020 Dev-Matching: 웹 프론트엔드 개발자 (상반기) 과제</a></strong><br/> Vanilla JS 고양이 사진 검색기</p>
<!-- <p align="center"><a href="https://vanilajskitty.web.app">데모 페이지</a></p> -->

![image](https://user-images.githubusercontent.com/68528752/158001850-ca2ff821-d47a-4d1a-b70a-6f001159f994.png)

## 👀 프로젝트 빌드 및 실행 방법

1. 상단 `Code` 버튼을 눌러 레포지토리를 클론 받습니다.

```
$ git clone https://github.com/wanted-team2/3week_ncnc.git
```

2. 패키지를 설치합니다.

```
$ yarn install
```

3. Live Server 등의 플러그인을 통해 로컬에서 실행할 수 있습니다.

## 🔥 프로젝트 과정 소개

요구사항을 처리하는 과정에서 `studyDocs`에 기록하였으며, **특히 어려웠던 부분은 별표(⭐️) 처리**하였습니다.

```shell
  💡 특정 요구사항 해결과정을 확인하고 싶다면 클릭하여 링크를 따라가 주세요!
```

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

### 6. [webpack 설정 및 배포]()
