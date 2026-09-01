"""Dependency-free preflight checks for the static MECar website."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "site"
INDEX = SITE / "index.html"


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.duplicate_ids: set[str] = set()
        self.fragments: list[str] = []
        self.local_refs: list[str] = []
        self.errors: list[str] = []
        self.heading_levels: list[int] = []
        self.h1_count = 0
        self.image_count = 0

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = {key: value or "" for key, value in attrs_list}

        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.add(element_id)
            self.ids.add(element_id)

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            level = int(tag[1])
            if self.heading_levels and level > self.heading_levels[-1] + 1:
                self.errors.append(
                    f"Heading level jumps from h{self.heading_levels[-1]} to h{level}."
                )
            self.heading_levels.append(level)
            if tag == "h1":
                self.h1_count += 1

        if tag == "a":
            href = attrs.get("href", "")
            if href.startswith("#") and len(href) > 1:
                self.fragments.append(unquote(href[1:]))
            if attrs.get("target") == "_blank":
                rel = set(attrs.get("rel", "").split())
                if "noopener" not in rel:
                    self.errors.append(f'External link is missing rel="noopener": {href}')

        if tag == "img":
            self.image_count += 1
            if "alt" not in attrs:
                self.errors.append(f"Image is missing alt: {attrs.get('src', '<unknown>')}")
            if not attrs.get("width") or not attrs.get("height"):
                self.errors.append(
                    f"Image is missing intrinsic dimensions: {attrs.get('src', '<unknown>')}"
                )

        for attribute in ("href", "src"):
            value = attrs.get(attribute, "")
            if not value or value.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
                continue
            parsed = urlsplit(value)
            if parsed.scheme or parsed.netloc:
                continue
            self.local_refs.append(unquote(parsed.path))


def main() -> int:
    errors: list[str] = []
    if not INDEX.is_file():
        print(f"ERROR: missing {INDEX}", file=sys.stderr)
        return 1

    html = INDEX.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(html)
    parser.close()

    errors.extend(parser.errors)
    errors.extend(f"Duplicate id: {element_id}" for element_id in sorted(parser.duplicate_ids))
    errors.extend(
        f"Missing internal anchor target: #{fragment}"
        for fragment in sorted(set(parser.fragments) - parser.ids)
    )

    for reference in sorted(set(parser.local_refs)):
        target = SITE / reference
        if not target.is_file():
            errors.append(f"Missing local asset: {reference}")

    if parser.h1_count != 1:
        errors.append(f"Expected exactly one h1, found {parser.h1_count}.")

    forbidden = {
        "contact@yonseimecar.com": "unverified legacy email",
        "DRAFT REV": "draft marker",
        "여기에 사진": "Notion placeholder",
        "�": "replacement character / encoding damage",
    }
    for needle, label in forbidden.items():
        if needle in html:
            errors.append(f"Found {label}: {needle!r}")

    if errors:
        print("Site preflight failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"Site preflight passed: {len(parser.ids)} ids, "
        f"{parser.image_count} images, {len(set(parser.local_refs))} local assets."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
