# MECar 홈페이지

연세대학교 자작자동차 동아리 MECar의 공개 웹사이트입니다. `main` 브랜치의 `site/` 폴더가 GitHub Pages로 배포됩니다.

- 주소: <https://yonsei-mecar.github.io/>
- 구성: 정적 HTML, CSS, JavaScript

## 페이지

| 파일 | 내용 |
|---|---|
| `site/index.html` | 한국어 팀 소개, 차량, 팀, 성과, 협력, 문의 |
| `site/en.html` | 영문 소개 |
| `site/gallery.html` | 2025/26 시즌 한국어 갤러리 |
| `site/gallery-en.html` | 영문 갤러리 |

메인 페이지는 팀 개요에서 두 차량 프로젝트, 팀 역할, 대회 성과 순으로 읽을 수 있게 정리했습니다. 갤러리는 별도 페이지에 두어 사진을 보기 쉽게 했습니다.

## 공개 콘텐츠 기준

팀 소개와 영문 문구는 MECar 소개서 초안을 바탕으로 간추렸습니다. 갤러리의 새 차량 주행 사진 4장은 2025/26 갤러리 초안에서 선별했습니다. 팀 사진 2장은 기존 공개 홈페이지에 있던 자산을 사용합니다.

개인 연락처, 설계 제원, 구매·예산 자료, 내부 일정, 확인되지 않은 후원 관계는 웹사이트에 올리지 않습니다. 후원사 이름과 로고는 공개 범위와 사용 허가를 확인한 뒤 추가합니다. 공식 문의는 `mecarteam@gmail.com`으로 받습니다.

헤더에는 공식 워드마크 하나만 사용합니다. 공식 M 심벌은 파비콘과 구조화 데이터에 유지합니다. 두 M을 나란히 배치하지 않도록 한 구성입니다.

## 로컬 확인

```powershell
python -m http.server 8000 --directory site
```

브라우저에서 <http://localhost:8000>을 엽니다. `file://`로 직접 열면 브라우저 보안 정책에 따라 SVG 로고 마스크가 표시되지 않을 수 있습니다.

```powershell
python check-site.py
node --check site/assets/js/main.js
python build-single.py
git diff --check
```

`check-site.py`는 네 HTML 페이지의 기본 구조, 이미지 속성, 내부 앵커와 로컬 파일 경로를 확인합니다. `build-single.py`는 한국어 메인 페이지의 CSS·JavaScript를 포함한 보조 HTML을 `dist/`에 만듭니다. 사진은 별도 파일로 남습니다.

## 배포

`.github/workflows/pages.yml`이 위 검사를 통과하면 `site/`를 GitHub Pages에 배포합니다. 사진 자산의 출처와 추가 기준은 [이미지 안내](site/assets/img/README.md)를 참고하세요.
