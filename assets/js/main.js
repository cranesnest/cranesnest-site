(() => {
  'use strict';
  const header = document.querySelector('.header');
  if (header) {
    const sizeHeader = () => document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    sizeHeader();
    if (typeof ResizeObserver === 'function') new ResizeObserver(sizeHeader).observe(header);
    else window.addEventListener('resize', sizeHeader, {passive:true});
  }
  const nav = document.querySelector('#navmenu');
  const toggle = nav?.querySelector('.menu-toggle');
  const links = nav?.querySelector('#nav-links');
  if (toggle && links) {
    nav.dataset.enhanced = 'true';
    toggle.hidden = false;
    const close = (restore = false) => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      if (restore) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close menu' : 'Menu';
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
    });
    document.addEventListener('click', event => { if (!nav.contains(event.target)) close(); });
    nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) close(); });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
    matchMedia('(min-width:1200px)').addEventListener('change', () => close());
  }
  const scrollTop = document.querySelector('#scroll-top');
  const onScroll = () => {
    const scrolled = window.scrollY > 100;
    document.body.classList.toggle('scrolled', scrolled);
    scrollTop?.classList.toggle('active', scrolled);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  scrollTop?.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({top:0, behavior:'instant'});
    document.querySelector('.skip-link')?.focus({preventScroll:true});
  });
  if (typeof GLightbox === 'function') {
    let opener;
    document.querySelectorAll('.glightbox').forEach(link => {
      link.addEventListener('click', () => { opener = link; });
    });
    GLightbox({
      selector:'.glightbox', openEffect:'none', closeEffect:'none', slideEffect:'none',
      onOpen: () => {
        const dialog = document.querySelector('.glightbox-container');
        dialog?.setAttribute('aria-label', 'Clinic photographs');
        dialog?.querySelector('.gclose')?.focus();
      },
      onClose: () => { opener?.focus(); }
    });
  }
})();
