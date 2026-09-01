# 이미지 자산 안내

## 현재 자산

| 파일 | 용도 | 출처 |
|---|---|---|
| `logo-mark.svg` | 헤더·장식용 M 심벌 | 승인 로고 원본의 벡터 자산 |
| `logo-wordmark.svg` | MECar 워드마크 | 승인 워드마크 원본의 벡터 자산 |
| `hero-baja-2024.jpg` | 히어로·Open Graph | 팀 노션 갤러리 |
| `team-baja-2024.jpg` | 팀 단체 장면 | 팀 노션 갤러리 |
| `design-review-2024.jpg` | 설계 검토 장면 | 팀 노션 갤러리 |
| `paddock-2024.jpg` | 패독·데이터 점검 장면 | 팀 노션 갤러리 |
| `race-baja-2024.jpg` | 경기 주행 장면 | 팀 노션 갤러리 |
| `celebration-2024.jpg` | 피니시·팀 장면 | 팀 노션 갤러리 |

Notion의 서명된 이미지 URL은 만료되므로 HTML에서 직접 참조하지 않습니다. 공개가 확인된 원본만 이 폴더에 저장합니다.

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
<img src="assets/img/race-baja-2024.jpg"
     alt="흙길 코너를 주행하는 MECar Baja 차량"
     width="2048" height="1365"
     loading="lazy" decoding="async">
```

후원사 로고는 현재 후원 관계와 로고 사용 지침을 확인한 뒤 `sponsors/` 하위에 추가합니다.
