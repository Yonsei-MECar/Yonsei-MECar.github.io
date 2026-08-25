/* ==========================================================================
   main.js — MECAR 홈페이지
   하는 일은 두 가지뿐입니다.
     1) 모바일 햄버거 메뉴 열고 닫기
     2) 스크롤해서 화면에 들어온 요소에 .on 을 붙여 서서히 나타나게 하기
   외부 라이브러리는 쓰지 않습니다.
   ========================================================================== */

(function () {
  'use strict';

  /* ----- 1. 모바일 메뉴 ----- */

  var hdr    = document.getElementById('hdr');
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('nav');

  if (hdr && burger && nav) {
    burger.addEventListener('click', function () {
      var open = hdr.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });

    // 메뉴 항목을 누르면 닫습니다
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    // Esc 로도 닫힙니다
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hdr.classList.contains('open')) {
        closeNav();
        burger.focus();
      }
    });
  }

  function closeNav() {
    hdr.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', '메뉴 열기');
  }

  /* ----- 2. 스크롤 등장 ----- */

  var items = document.querySelectorAll('.rv');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 움직임 최소화 설정이 켜져 있거나 구형 브라우저면 그냥 다 보여줍니다
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('on'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('on');
      io.unobserve(entry.target);   // 한 번 나타나면 더 볼 필요 없음
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
