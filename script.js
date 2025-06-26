// script.js
document.addEventListener('DOMContentLoaded', () => {

  // --- 1) 텍스트 슬라이드 (optional) ---
  const txtList = document.getElementById('animatedText');
  if (txtList) {
    let isAnimating = false;
    function updateActive() {
      const lis = txtList.querySelectorAll('li');
      lis.forEach(li => li.classList.remove('active'));
      if (lis[0]) lis[0].classList.add('active');
    }
    function slideUp() {
      if (isAnimating) return;
      isAnimating = true;
      const itemH = txtList.querySelector('li').getBoundingClientRect().height;
      txtList.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      txtList.style.transform = `translateY(-${itemH}px)`;
      txtList.addEventListener('transitionend', function handler() {
        txtList.removeEventListener('transitionend', handler);
        txtList.style.transition = 'none';
        txtList.appendChild(txtList.firstElementChild);
        txtList.style.transform = 'translateY(0)';
        txtList.offsetHeight;
        txtList.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        updateActive();
        isAnimating = false;
      }, { once: true });
    }
    updateActive();
    setInterval(slideUp, 2000);
  }

  // --- 2) 로그인 폼 핸들러 (optional) ---
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      /* 기존 로그인 로직 그대로 */
    });
  }

  // --- 3) 협력사 캐러셀 (optional) ---
  const partnerList = document.querySelector('.partner-list');
  if (partnerList) {
    const viewport = document.querySelector('.partner-viewport');
    const items    = Array.from(partnerList.children);
    const prevBtn  = document.querySelector('.partner-header .partner-btn.prev');
    const nextBtn  = document.querySelector('.partner-header .partner-btn.next');
    let index = 0;
    function getVis() { return window.matchMedia('(max-width:600px)').matches ? 3 : 6; }
    function updateBtns() {
      const maxIdx = items.length - getVis();
      if (prevBtn) prevBtn.classList.toggle('disabled', index <= 0);
      if (nextBtn) nextBtn.classList.toggle('disabled', index >= maxIdx);
    }
    function slide() {
      const itemW = items[0].getBoundingClientRect().width;
      const gap   = parseFloat(getComputedStyle(partnerList).gap) || 0;
      partnerList.style.transform = `translateX(-${index*(itemW+gap)}px)`;
    }
    if (prevBtn) prevBtn.addEventListener('click', ()=>{ if(index>0){ index--; slide(); updateBtns(); } });
    if (nextBtn) nextBtn.addEventListener('click', ()=>{ const maxIdx=items.length-getVis(); if(index<maxIdx){ index++; slide(); updateBtns(); } });
    window.addEventListener('resize', ()=>{ index = Math.min(index, items.length-getVis()); slide(); updateBtns(); });
    slide(); updateBtns();
  }

  // --- 4) 이벤트 캐러셀 (optional) ---
  const eventList = document.querySelector('.event-list');
  const btnPrev   = document.querySelector('.event-btn.prev');
  const btnNext   = document.querySelector('.event-btn.next');
  if (eventList && btnPrev && btnNext) {
    let cur = 0;
    function visCount() {
      const w = window.innerWidth;
      return w <= 480 ? 1 : w <= 768 ? 2 : 3;
    }
    function updateEventBtns() {
      const max = eventList.children.length - visCount();
      btnPrev.classList.toggle('disabled', cur <= 0);
      btnNext.classList.toggle('disabled', cur >= max);
    }
    function updateEventSlide() {
      const max = eventList.children.length - visCount();
      cur = Math.min(Math.max(cur, 0), max);
      const w = eventList.children[0].offsetWidth + 16;
      eventList.style.transform = `translateX(-${cur*w}px)`;
      updateEventBtns();
    }
    btnPrev.addEventListener('click', ()=>{ cur--; updateEventSlide(); });
    btnNext.addEventListener('click', ()=>{ cur++; updateEventSlide(); });
    window.addEventListener('resize', updateEventSlide);
    updateEventSlide();
  }

  // --- 5) 햄버거 메뉴 토글 & “보유주수 확인” 클릭 시 닫기 ---
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
      if (menu.classList.contains('show')) {
        toggle.innerHTML = '<span class="close-icon">&times;</span>';
        toggle.setAttribute('aria-label', '메뉴 닫기');
      } else {
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-label', '메뉴 열기');
      }
    });

    const sharesLink = document.querySelector('a[href="index.html#login"]');
    if (sharesLink) {
      sharesLink.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
          menu.classList.remove('show');
          toggle.innerHTML = '&#9776;';
          toggle.setAttribute('aria-label', '메뉴 열기');
        }
      });
    }
  }

});
