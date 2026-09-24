# MECar 홈페이지

연세대학교 자작자동차 동아리 MECar의 공개 웹사이트입니다. `main` 브랜치의 `site/` 폴더가 GitHub Pages로 배포됩니다.

- 주소: <https://yonsei-mecar.github.io/>
- 구성: 정적 HTML, CSS, JavaScript

## 페이지

| 파일 | 내용 |
|---|---|
| `site/index.html` | 한국어 첫 화면과 각 페이지 안내 |
| `site/about.html` | 팀 소개와 개발 과정, 2027년 계획 |
| `site/vehicles.html` | 전기 Baja와 Formula 차량 |
| `site/team.html` | 다섯 팀의 역할과 신입 부원 참여 방식 |
| `site/results.html` | 대회 출전·수상 기록 |
| `site/gallery.html` | 2026년 대회 현장과 2024년 기록 사진 |
| `site/partners.html` | 협력처와 공식 문의 채널 |
| `site/en.html`, `site/gallery-en.html` | 영문 소개와 갤러리 |

메인 페이지에서 소개, 차량, 팀, 기록, 갤러리, 협력·문의로 바로 갈 수 있습니다.

## 공개 콘텐츠 기준

팀 소개와 영문 문구는 MECar 소개서 초안을 바탕으로 다시 썼습니다. 갤러리에는 2025/26 갤러리 초안에서 선별한 사진과 기존 공개 홈페이지의 대회 사진을 사용합니다.

개인 연락처, 설계 제원, 구매·예산 자료, 내부 일정은 웹사이트에 올리지 않습니다. 소개서의 공개 협력처 목록은 이름만 싣고 후원 규모와 로고는 싣지 않았습니다. 공식 문의는 `mecarteam@gmail.com`으로 받습니다.

워드마크 안에서 M과 E 사이가 지나치게 좁았던 부분을 SVG에서 벌렸습니다. 헤더와 첫 화면 모두 같은 워드마크를 사용합니다.

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

`check-site.py`는 HTML 페이지의 기본 구조, 이미지 속성, 내부 앵커와 로컬 파일 경로를 확인합니다. `build-single.py`는 한국어 메인 페이지의 CSS·JavaScript를 포함한 보조 HTML을 `dist/`에 만듭니다. 사진은 별도 파일로 남습니다.

## 배포

`.github/workflows/pages.yml`이 위 검사를 통과하면 `site/`를 GitHub Pages에 배포합니다. 사진 자산의 출처와 추가 기준은 [이미지 안내](site/assets/img/README.md)를 참고하세요.
