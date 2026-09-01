# MECar 홈페이지

연세대학교 자작자동차 동아리 MECar의 공식 정적 홈페이지입니다. `main` 브랜치의 `site/` 폴더가 GitHub Pages로 자동 배포됩니다.

- 배포 주소: <https://yonsei-mecar.github.io/>
- 현재 콘텐츠 기준: 2026/27 시즌, 2026-09-01 확인
- 빌드 도구: 없음 — HTML, CSS, JavaScript만 사용

## 현재 홈페이지 내용

- 2026/27 운영진과 5개 팀의 역할·팀장 정보
- Baja M26B 개선과 2027 e-Formula 첫 출전 준비
- 공식 연락처 `mecarteam@gmail.com`과 Instagram `@yonseimecar`
- 2026 KSAE Baja 대회 사진
- 공식 SVG 로고와 워드마크
- 반응형 메뉴, 키보드 탐색, 모션 최소화 설정, 명도 대비 개선
- Open Graph, canonical, Organization 구조화 데이터, `robots.txt`, `sitemap.xml`
- 배포 전 내부 링크·자산·접근성 기본 항목 자동 검사

개인 휴대전화와 개인 이메일은 공개하지 않습니다. 운영진은 이름과 직책만 표시하며 모든 외부 문의는 공식 메일로 받습니다.

## 로컬에서 보기

저장소 루트에서 다음 명령을 실행합니다.

```powershell
python -m http.server 8000 --directory site
```

브라우저에서 <http://localhost:8000>을 엽니다. 파일을 직접 열어도 기본 내용은 보이지만, 로컬 서버가 실제 배포 경로와 더 가깝습니다.

## 배포 전 확인

```powershell
python check-site.py
node --check site/assets/js/main.js
python build-single.py
git diff --check
```

`check-site.py`는 다음 항목을 별도 패키지 없이 검사합니다.

- 중복 ID와 끊어진 내부 앵커
- 존재하지 않는 CSS·JavaScript·이미지 경로
- 이미지 대체 텍스트와 고유 크기
- 새 창 링크의 `rel="noopener"`
- H1 개수와 헤딩 단계
- 임시 문구, 과거 미확인 메일, 인코딩 손상

같은 검사는 GitHub Pages 배포 작업에서도 먼저 실행됩니다.

## 폴더 구조

```text
Yonsei-MECar.github.io/
├─ .github/workflows/pages.yml  # 검사 후 GitHub Pages 배포
├─ check-site.py                # 정적 사이트 사전 검사
├─ build-single.py              # CSS·JS·파비콘을 HTML에 포함하는 보조 도구
└─ site/
   ├─ index.html                # 콘텐츠와 문서 구조
   ├─ robots.txt
   ├─ sitemap.xml
   ├─ favicon.svg
   └─ assets/
      ├─ css/
      │  ├─ tokens.css          # 색상·서체·간격 토큰
      │  └─ style.css           # 레이아웃과 반응형 스타일
      ├─ img/                   # 공식 로고와 홈페이지 공개용 사진
      └─ js/main.js             # 메뉴·스크롤·현재 섹션 표시
```

## 콘텐츠 기준

홈페이지 문구는 팀 노션의 다음 페이지를 기준으로 정리했습니다.

- `MECar` / `About Us!`
- `2026/27 활동`
- 기계 1·2·3팀, 전장팀, 운영기획팀의 26/27 페이지
- `26/27 임원진 명단`
- Formula·Baja 개발일정
- `25/26 KSAE BAJA 대회 기록`
- `갤러리`

세부 개발 일정은 변경 가능성이 커서 공개 홈페이지에는 방향과 핵심 작업만 요약했습니다. 대회 성적과 운영진은 팀 기록을 확인해 반영하고, 제원과 후원사 로고는 공식 확인 전까지 추정해서 넣지 않습니다.

## 사진과 로고

- `logo-mark.svg`, `logo-wordmark.svg`: 승인된 동아리 로고 원본을 벡터화한 자산
- `*-2026.jpg`: 팀 공유 드라이브의 2026 KSAE Baja 홈페이지 공개용 사진
- 사진에는 `width`, `height`, 설명형 `alt`를 지정하고, 첫 화면을 제외한 사진은 지연 로딩합니다.

사진 추가 전 공개 동의와 사용 권한을 확인하세요. 자세한 규칙은 [이미지 안내](site/assets/img/README.md)에 있습니다.

## 배포

`main` 브랜치에 반영되면 `.github/workflows/pages.yml`이 다음 순서로 동작합니다.

1. 정적 사이트 사전 검사
2. JavaScript 문법 및 보조 빌드 확인
3. `site/` 업로드
4. GitHub Pages 배포

커스텀 도메인은 DNS, HTTPS, 메일 수신을 모두 확인한 뒤 canonical·OG URL·sitemap을 함께 변경해야 합니다.
