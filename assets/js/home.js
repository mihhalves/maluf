const formRodrigo = document.getElementById('formRodrigo');
if (formRodrigo && !document.querySelector('script[src*="empreendimento.js"]')) {
  formRodrigo.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = this.nome.value;
    const celular = this.celular.value;
    const email = this.email.value;

    const numeroWhatsApp = "5511941020630";

    const mensagem = `Oi, vim do site Maluf Imóveis!\nNome: ${nome}\nTelefone: ${celular}\nE-mail: ${email}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    const novaJanela = window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    if (novaJanela) novaJanela.opener = null;
  });
}

const empreendimentos = [
  { nome: 'Marka Perdizes', url: 'https://www.markaperdizes.com.br/' },
  { nome: 'Gaya Vila Romana', url: 'https://www.gayavilaromana.com.br/' },
  { nome: 'Natal Spot', url: 'https://natalspot.com.br/' },
  { nome: 'Caraguá Spot', url: 'https://caraguaspot.com.br/' },
  { nome: 'Itacaré Spot', url: 'https://itacarespot.com.br/' }
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  searchInput.addEventListener('focus', function() {
    searchResults.innerHTML = empreendimentos.map(emp => 
      `<a href="${emp.url}" class="search-result-item" target="_blank" rel="noopener noreferrer">${emp.nome}</a>`
    ).join('');
    searchResults.style.display = 'block';
  });

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm.length === 0) {
      searchResults.innerHTML = empreendimentos.map(emp => 
        `<a href="${emp.url}" class="search-result-item" target="_blank" rel="noopener noreferrer">${emp.nome}</a>`
      ).join('');
      searchResults.style.display = 'block';
      return;
    }

    const filtered = empreendimentos.filter(emp => 
      emp.nome.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item" style="color: var(--ink-muted);">Nenhum empreendimento encontrado</div>';
      searchResults.style.display = 'block';
      return;
    }

    searchResults.innerHTML = filtered.map(emp => 
      `<a href="${emp.url}" class="search-result-item" target="_blank" rel="noopener noreferrer">${emp.nome}</a>`
    ).join('');
    
    searchResults.style.display = 'block';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box') && !e.target.closest('.mobile-search-box')) {
      searchResults.style.display = 'none';
      const mobileSearchResults = document.getElementById('mobileSearchResults');
      if (mobileSearchResults) mobileSearchResults.style.display = 'none';
    }
  });
}

const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileSearchResults = document.getElementById('mobileSearchResults');

function renderSearchResults(term, container) {
  const filtered = term.length === 0
    ? empreendimentos
    : empreendimentos.filter(emp => emp.nome.toLowerCase().includes(term));

  if (filtered.length === 0) {
    container.innerHTML = '<div class="search-result-item" style="color: var(--ink-muted);">Nenhum empreendimento encontrado</div>';
  } else {
    container.innerHTML = filtered.map(emp =>
      `<a href="${emp.url}" class="search-result-item" target="_blank" rel="noopener noreferrer">${emp.nome}</a>`
    ).join('');
  }
  container.style.display = 'block';
}

if (mobileSearchInput && mobileSearchResults) {
  mobileSearchInput.addEventListener('focus', function() {
    renderSearchResults('', mobileSearchResults);
  });

  mobileSearchInput.addEventListener('input', function(e) {
    renderSearchResults(e.target.value.toLowerCase().trim(), mobileSearchResults);
  });
}

(function () {
  const numeroWhatsApp = '5511941020630';

  function getBotaoTitulo(el) {
    if (!el) return 'Atendimento';
    const title = (el.getAttribute('data-whatsapp-title') || el.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    return title || 'Atendimento';
  }

  function abrirWhatsAppComTitulo(titulo) {
    const mensagem = `Olá! Tenho interesse em: ${titulo}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    const novaJanela = window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    if (novaJanela) novaJanela.opener = null;
  }

  document.addEventListener('click', function (e) {
    const botao = e.target.closest('a.btn, button.btn, button.btn-enviar, button[type="submit"]');
    if (!botao) return;

    if (
      botao.matches('.menu-toggle, .search-btn, .carousel-btn, .planta-tab, .carousel-indicator') ||
      botao.closest('.mobile-nav')
    ) {
      return;
    }

    if (botao.tagName === 'A') {
      const href = botao.getAttribute('href') || '';
      const isPaginaInterna = href && !href.startsWith('#') && !href.startsWith('https://wa.me') && !href.startsWith('javascript:');
      if (isPaginaInterna) return;
    }

    if (botao.closest('form')) {
      return;
    }

    const titulo = getBotaoTitulo(botao);
    e.preventDefault();
    e.stopPropagation();
    abrirWhatsAppComTitulo(titulo);
  }, true);
})();