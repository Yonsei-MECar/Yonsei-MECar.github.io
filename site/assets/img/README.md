# 이미지 자산 안내

## 현재 자산

| 파일 | 용도 | 출처 |
|---|---|---|
| `logo-mark.svg` | 헤더용 M 심벌 | 공식 로고 원본의 벡터 자산 |
| `logo-wordmark.svg` | MECar 워드마크 | 승인 워드마크 원본의 벡터 자산 |
| `hero-baja-2026.jpg` | 히어로·Open Graph | 팀 공유 드라이브의 2026 KSAE Baja 원본 |
| `paddock-baja-2026.jpg` | 패독 정비 장면 | 팀 공유 드라이브의 2026 KSAE Baja 원본 |
| `team-baja-2026.jpg` | 대회 현장 단체사진 | 팀 공유 드라이브의 2026 KSAE Baja 원본 |
| `data-baja-2026.jpg` | 노트북·장비 확인 장면 | 팀 공유 드라이브의 2026 KSAE Baja 원본 |
| `race-baja-2026.jpg` | 다른 차량과 함께 달리는 장면 | 팀 공유 드라이브의 2026 KSAE Baja 원본 |
| `endurance-baja-2026.jpg` | 내구레이스 주행 장면 | 팀 공유 드라이브의 2026 KSAE Baja 원본 |

Notion의 서명된 이미지 URL은 만료되므로 HTML에서 직접 참조하지 않습니다. 공개가 확인된 원본만 이 폴더에 저장합니다.
기존 2024 사진은 기록용으로 남겨 두었으며 현재 페이지에서는 불러오지 않습니다.

## 추가할 때 지킬 것

- 얼굴이 식별되는 사진은 공개 동의를 확인합니다.
- 대회 사진의 촬영·사용 권한을 확인합니다.
- 원본 10~20MB 사진을 그대로 올리지 않습니다.
- 첫 화면 이미지는 가급적 500KB 안팎, 나머지는 800KB 이하를 목표로 합니다.
- 사진 비율에 맞는 `width`와 `height`를 HTML에 적습니다.
- 의미 있는 사진에는 장면을 설명하는 `alt`를 씁니다. 단순 장식이면 `alt=""`로 둡니다.
- 첫 화면 사진을 제외하고 `loading="lazy"`와 `decoding="async"`를 사용합니다.

예시:

```html
<img src="assets/img/race-baja-2026.jpg"
     alt="2026 KSAE Baja에서 다른 차량과 나란히 달리는 MECar 20번 차량"
     width="2048" height="1365"
     loading="lazy" decoding="async">
```

후원사 로고는 현재 후원 관계와 로고 사용 지침을 확인한 뒤 `sponsors/` 하위에 추가합니다.
