(function () {
  'use strict';

  var WPP = '5561993236692';

  /* Ano no rodapé */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* Menu mobile */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* Sombra no header ao rolar */
  var header = document.querySelector('.header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Formulário -> WhatsApp */
  var form = document.getElementById('form-orcamento');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var nome = (f.get('nome') || '').toString().trim();
      var equip = (f.get('equipamento') || '').toString();
      var periodo = (f.get('periodo') || '').toString();
      var local = (f.get('local') || '').toString().trim();

      var faltando = [];
      if (!nome) faltando.push('nome');
      if (!equip) faltando.push('equipamento');
      if (!periodo) faltando.push('período');
      if (!local) faltando.push('bairro/cidade');

      if (faltando.length) {
        var alvo = form.querySelector(':invalid') ||
                   form.querySelector('[name="' + (!nome ? 'nome' : !equip ? 'equipamento' : !periodo ? 'periodo' : 'local') + '"]');
        if (alvo) { alvo.focus(); alvo.style.borderColor = '#D93025'; }
        return;
      }

      var msg =
        'Olá, Total Locações! Meu nome é ' + nome + '.\n' +
        'Gostaria de um orçamento:\n' +
        '• Equipamento: ' + equip + '\n' +
        '• Período: ' + periodo + '\n' +
        '• Local da obra: ' + local;

      window.open('https://wa.me/' + WPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });

    form.addEventListener('input', function (e) {
      if (e.target.style) e.target.style.borderColor = '';
    });
  }

  /* Reveal on scroll */
  var alvos = document.querySelectorAll(
    '.card, .step, .review, .dif__text, .dif__list li, .info, .contact__map, .sec__head'
  );
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    alvos.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  }
})();
