"""
site/ 를 파일 하나로 합칩니다.

왜 필요한가:
  후원사에 메일로 보내거나, 파일 하나만 올릴 수 있는 곳에 붙일 때
  CSS·JS가 따로 있으면 깨집니다. 이 스크립트가 전부 index.html 안으로 넣어줍니다.

쓰는 법:
  python build-single.py
  → dist/mecar-onefile.html 생성

주의: 이건 배포용 보조 수단입니다.
      평소 수정은 site/ 쪽에서 하고, 필요할 때만 이걸 다시 돌리세요.
"""

import re
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SITE = ROOT / "site"
DIST = ROOT / "dist"


def read(rel: str) -> str:
    return (SITE / rel).read_text(encoding="utf-8")


def main() -> int:
    if not (SITE / "index.html").exists():
        print("site/index.html 을 찾을 수 없습니다.", file=sys.stderr)
        return 1

    html = read("index.html")

    # 1) <link rel="stylesheet" href="assets/css/..."> → <style>...</style>
    def inline_css(m: re.Match) -> str:
        href = m.group(1)
        if href.startswith("http"):          # 구글 폰트는 그대로 둡니다
            return m.group(0)
        css = read(href)
        return f"<style>\n/* ---- {href} ---- */\n{css}\n</style>"

    html = re.sub(
        r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>',
        inline_css,
        html,
    )

    # 2) <script src="assets/js/..."> → <script>...</script>
    def inline_js(m: re.Match) -> str:
        src = m.group(1)
        if src.startswith("http"):
            return m.group(0)
        return f"<script>\n/* ---- {src} ---- */\n{read(src)}\n</script>"

    html = re.sub(r'<script[^>]+src="([^"]+)"[^>]*>\s*</script>', inline_js, html)

    # 3) favicon 을 data URI 로
    favicon = (SITE / "favicon.svg").read_text(encoding="utf-8")
    import base64
    b64 = base64.b64encode(favicon.encode("utf-8")).decode("ascii")
    html = html.replace(
        '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
        f'<link rel="icon" href="data:image/svg+xml;base64,{b64}">',
    )

    DIST.mkdir(exist_ok=True)
    out = DIST / "mecar-onefile.html"
    out.write_text(html, encoding="utf-8")

    left = re.findall(r'(?:href|src)="(assets/[^"]+)"', html)
    print(f"생성: {out.relative_to(ROOT)}  ({len(html.encode('utf-8')) / 1024:.0f} KB)")
    if left:
        print("주의 - 아직 외부 파일을 참조합니다:", ", ".join(sorted(set(left))))
        print("      (사진을 넣었다면 정상입니다. 사진은 따로 보내세요.)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
