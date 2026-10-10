(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animate = (element) => {
    if (window.gsap && !reduceMotion.matches) {
      gsap.killTweensOf(element);
      gsap.fromTo(element, { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'opacity,transform' });
    }
  };
  if (window.lucide) lucide.createIcons({ attrs: { 'aria-hidden': 'true', 'focusable': 'false' } });

  // The mobile disclosure preserves the DOM's natural keyboard navigation.
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const closeMenu = (restoreFocus = false) => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    if (restoreFocus) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => {
    const opening = mobileMenu.hidden;
    mobileMenu.hidden = !opening;
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', mobileMenu).forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu(true);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const careAreas = {
    pintura: { number: '01', title: 'Pintura externa', service: 'Polimento técnico', description: 'O brilho começa com a preparação. Limpeza, descontaminação e polimento são avaliados para cuidar do acabamento sem desconsiderar a integridade da pintura.', note: 'PRECISÃO EM CADA REFLEXO' },
    rodas: { number: '02', title: 'Rodas', service: 'Rodas & pneus', description: 'Faces, raios e recortes recebem atenção individual. A limpeza técnica considera o material e o acabamento de cada roda, incluindo as áreas de difícil acesso.', note: 'CUIDADO QUE ACOMPANHA O MOVIMENTO' },
    farois: { number: '03', title: 'Faróis', service: 'Faróis & transparência', description: 'A transparência também faz parte do conjunto. O estado da superfície orienta a avaliação e o tratamento possível, sem promessas de recuperação para todos os casos.', note: 'CLAREZA EM CADA LINHA' },
    interior: { number: '04', title: 'Bancos e interior', service: 'Interior & couro', description: 'Couro, tecidos e painéis pedem abordagens diferentes. A higienização é planejada para respeitar texturas, costuras e acabamentos do ambiente interno.', note: 'RESPEITO POR CADA TEXTURA' },
    acabamentos: { number: '05', title: 'Acabamentos', service: 'Acabamentos', description: 'Frisos, plásticos e detalhes de acabamento completam a leitura do veículo. Cada material recebe um cuidado compatível com suas características e condições.', note: 'ATENÇÃO AO QUE QUASE PASSA DESPERCEBIDO' },
    protecao: { number: '06', title: 'Proteção de superfícies', service: 'Proteção de superfícies', description: 'A preparação vem antes da proteção. Os cuidados são definidos conforme o material e o uso do veículo, com orientações para manter a conservação no dia a dia.', note: 'PRESERVAR TAMBÉM É CUIDAR' }
  };
  const areaButtons = $$('[data-area]');
  function selectArea(id) {
    const area = careAreas[id];
    if (!area) return;
    areaButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.area === id)));
    $('#map-count').textContent = `${area.number} / 06`;
    $('#map-title').textContent = area.title;
    $('#map-description').textContent = area.description;
    $('#map-note').textContent = area.note;
    $('#map-cta').dataset.service = id;
    animate($('#map-panel'));
  }
  areaButtons.forEach(button => button.addEventListener('click', () => selectArea(button.dataset.area)));
  // On small screens the synchronized full-size list is the interaction surface.
  const smallScreen = window.matchMedia('(max-width: 560px)');
  const updateHotspots = () => $$('.hotspot').forEach(button => {
    button.tabIndex = smallScreen.matches ? -1 : 0;
    button.setAttribute('aria-hidden', String(smallScreen.matches));
  });
  smallScreen.addEventListener('change', updateHotspots);
  updateHotspots();
  $('.area-list').addEventListener('keydown', event => {
    const buttons = $$('button', event.currentTarget);
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    buttons[next].focus();
    selectArea(buttons[next].dataset.area);
  });

  const compareRange = $('#compare-range');
  compareRange.addEventListener('input', () => {
    const value = Math.max(0, Math.min(100, Number(compareRange.value)));
    $('#comparison').style.setProperty('--split', `${value}%`);
    $('#compare-value').textContent = `${value}%`;
    compareRange.setAttribute('aria-valuetext', `${value}% antes, ${100 - value}% depois`);
  });

  // Native dialog gives modal focus containment and Escape support.
  const galleryItems = $$('.gallery-item');
  const lightbox = $('#lightbox');
  let galleryIndex = 0;
  let galleryOpener = null;
  const visibleItems = () => galleryItems.filter(item => !item.hidden);
  function renderLightbox() {
    const items = visibleItems();
    galleryIndex = (galleryIndex + items.length) % items.length;
    const item = items[galleryIndex];
    $('#lightbox-image').src = item.dataset.image;
    $('#lightbox-image').alt = $('img', item).alt;
    $('#lightbox-caption').textContent = item.dataset.caption;
    $('#lightbox-count').textContent = `${galleryIndex + 1} / ${items.length}`;
    $('#lightbox-prev').disabled = items.length === 1;
    $('#lightbox-next').disabled = items.length === 1;
  }
  galleryItems.forEach(item => item.addEventListener('click', () => {
    galleryOpener = item;
    galleryIndex = visibleItems().indexOf(item);
    renderLightbox();
    lightbox.showModal();
    document.body.classList.add('modal-open');
  }));
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    $$('[data-filter]').forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    galleryItems.forEach(item => { item.hidden = category !== 'all' && category !== item.dataset.category; });
    $('.gallery-grid').classList.toggle('is-filtered', category !== 'all');
    const count = visibleItems().length;
    $('#gallery-status').textContent = `${count} ${count === 1 ? 'fotografia exibida' : 'fotografias exibidas'}`;
  }));
  $('#lightbox-prev').addEventListener('click', () => { galleryIndex--; renderLightbox(); });
  $('#lightbox-next').addEventListener('click', () => { galleryIndex++; renderLightbox(); });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      galleryIndex += event.key === 'ArrowLeft' ? -1 : 1;
      renderLightbox();
    }
  });
  lightbox.addEventListener('close', () => galleryOpener?.focus());
  $$('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  $('#privacy-button').addEventListener('click', () => {
    $('#privacy-dialog').showModal();
    document.body.classList.add('modal-open');
  });

  const form = $('#quote-form');
  const result = $('#quote-result');
  const error = $('#services-error');
  let planText = '';
  const vehicles = { compacto: 'Compacto — hatch e pequenos', medio: 'Médio — sedã e crossover', grande: 'Grande — SUV e picape' };
  const conditions = { manutencao: 'Intenção: manter o cuidado em dia.', marcas: 'Intenção: avaliar marcas e desgaste.', avaliacao: 'Intenção: realizar uma avaliação completa.' };
  const serviceInputs = $$('input[name="services"]', form);
  function invalidatePlan() {
    result.hidden = true;
    planText = '';
    $('#whatsapp-link').hidden = true;
  }
  form.addEventListener('change', () => {
    invalidatePlan();
    if (serviceInputs.some(input => input.checked)) {
      error.hidden = true;
      serviceInputs.forEach(input => input.removeAttribute('aria-invalid'));
    }
  });
  // Delegation keeps the contextual Precision Map CTA synchronized.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-service]');
    if (!link) return;
    const input = serviceInputs.find(item => item.value === link.dataset.service);
    if (!input) return;
    input.checked = true;
    invalidatePlan();
    error.hidden = true;
    serviceInputs.forEach(item => item.removeAttribute('aria-invalid'));
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selected = serviceInputs.filter(input => input.checked).map(input => input.value).filter(id => Object.hasOwn(careAreas, id));
    if (!selected.length) {
      error.hidden = false;
      serviceInputs.forEach(input => input.setAttribute('aria-invalid', 'true'));
      serviceInputs[0].focus();
      return;
    }
    error.hidden = true;
    const vehicle = vehicles[$('input[name="vehicle"]:checked', form)?.value] || vehicles.compacto;
    const condition = conditions[$('#condition').value] || conditions.avaliacao;
    $('#result-vehicle').textContent = `Veículo: ${vehicle}`;
    $('#result-condition').textContent = condition;
    const serviceList = $('#result-services');
    serviceList.replaceChildren(...selected.map(id => {
      const li = document.createElement('li');
      li.textContent = careAreas[id].service;
      return li;
    }));
    planText = ['NOX DETAIL — PLANO DEMONSTRATIVO', 'Projeto fictício para portfólio. Não é uma oferta comercial.', '', `Veículo: ${vehicle}`, condition, '', 'Cuidados selecionados:', ...selected.map(id => `- ${careAreas[id].service}`), '', 'Investimento: a definir em avaliação.', 'Prazo: a definir após avaliação.', 'Nenhum dado foi enviado. Nenhum horário foi reservado.', 'Não há preços comerciais definidos neste projeto.'].join('\n');
    const whatsapp = window.NOX_CONFIG?.whatsapp;
    const whatsappLink = $('#whatsapp-link');
    const enabled = whatsapp?.enabled === true && /^[1-9]\d{9,14}$/.test(whatsapp.number);
    whatsappLink.hidden = !enabled;
    if (enabled) whatsappLink.href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(planText)}`;
    result.hidden = false;
    animate(result);
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'center' });
  });
  form.addEventListener('reset', () => {
    invalidatePlan();
    error.hidden = true;
    serviceInputs.forEach(input => input.removeAttribute('aria-invalid'));
    $('input[name="vehicle"]', form).focus({ preventScroll: true });
    form.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });
  $('#download-plan').addEventListener('click', () => {
    if (!planText) return;
    const url = URL.createObjectURL(new Blob(['\uFEFF', planText], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NOX-DETAIL-meu-plano-demonstrativo.txt';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // Progressive enhancement: content is visible if libraries or JS fail.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      $$('.reveal').forEach(element => {
        gsap.from(element, {
          y: 22, opacity: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          clearProps: 'opacity,transform'
        });
      });
      return () => {};
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
