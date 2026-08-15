import { products, categories } from './data.js';

// Formatage prix FCFA
function formatFCFA(amount) {
  return new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(amount);
}

// Éléments DOM communs (présents sur toutes les pages)
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const btnOpenCart = document.getElementById('btnOpenCart');
const btnCloseCart = document.getElementById('btnCloseCart');
const toastEl = document.getElementById('toast');
const btnCheckout = document.getElementById('btnCheckout');
const productModalOverlay = document.getElementById('productModalOverlay');
const productModalBody = document.getElementById('productModalBody');
const btnCloseModal = document.getElementById('btnCloseModal');
const floatingCartBtn = document.getElementById('floatingCartBtn');
const floatingCartCountEl = document.getElementById('floatingCartCount');

// Éléments DOM pour le modal devis
const devisModalOverlay = document.getElementById('devisModalOverlay');
const btnOpenDevis = document.getElementById('btnOpenDevis');
const btnCloseDevis = document.getElementById('btnCloseDevis');
const devisForm = document.getElementById('devisForm');
const devisNeedSelect = document.getElementById('devisNeed');
const devisAutreGroup = document.getElementById('devisAutreGroup');

// Éléments DOM pour le carousel d'avis
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialsPrev = document.getElementById('testimonialsPrev');
const testimonialsNext = document.getElementById('testimonialsNext');
const testimonialsDots = document.getElementById('testimonialsDots');

// Élément DOM pour le bouton commande WhatsApp
const btnCheckoutWhatsApp = document.getElementById('btnCheckoutWhatsApp');

// Éléments DOM spécifiques à la page catalogue (index.html)
const catalogueEl = document.getElementById('catalogue');
const filtersBar = document.getElementById('filtersBar');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');

// Éléments DOM spécifiques à la page contact
const contactForm = document.getElementById('contactForm');

let currentFilter = 'all';
let searchQuery = '';
let cart = [];

function getFilteredProducts() {
  // Détecter si on est sur la page catalogue.html (catalogue complet) ou index.html (populaires seulement)
  const isCataloguePage = window.location.pathname.includes('catalogue.html');
  
  return products.filter(p => {
    // Sur index.html : filtrer seulement les produits avec tag "Populaire"
    if (!isCataloguePage) {
      const isPopular = p.tag && p.tag.toLowerCase() === 'populaire';
      if (!isPopular) return false;
    }
    
    const matchFilter = currentFilter === 'all' || p.category === currentFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
}

function renderCatalogue() {
  const list = getFilteredProducts();
  catalogueEl.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.images[0]}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;"/>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${getCategoryLabel(p.category)}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="product-price">${formatFCFA(p.price)}</span>
          <span style="font-size:0.8rem;color:#6c757d;">Stock: ${p.stock}</span>
        </div>
        <button class="btn-add-cart" data-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Ajouter</button>
      </div>
    </div>
  `).join('');

  resultsCount.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id, btn);
    });
  });

  // ouvrir la modal au clic sur la carte (mais pas sur le bouton ajouter)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-add-cart')) return; // éviter d'ouvrir quand on clique sur Ajouter
      const id = parseInt(card.getAttribute('data-id'));
      openProductModal(id);
    });
  });
}

function openProductModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  // construire le HTML de la modal
  productModalBody.innerHTML = `
    <div class="modal-gallery">
      <img class="modal-main-img" id="modalMainImg" src="${p.images[0]}" alt="${p.name}">
      <div class="modal-thumbnails" id="modalThumbs">
        ${p.images.map((src, i) => `<img class="modal-thumb ${i===0? 'active':''}" data-src="${src}" src="${src}" alt="thumb-${i}">`).join('')}
      </div>
    </div>
    <div class="modal-details">
      <div class="modal-category">${getCategoryLabel(p.category)}</div>
      <div class="modal-title">${p.name}</div>
      <div class="modal-price">${formatFCFA(p.price)}</div>
      <div class="modal-desc">${p.desc}</div>
      <div class="modal-meta">
        <div class="modal-meta-item"><span>Disponibilité</span><span class="modal-meta-value">${p.stock} en stock</span></div>
        <div class="modal-meta-item"><span>Référence</span><span class="modal-meta-value">#${p.id}</span></div>
      </div>
      <button class="btn-modal-add" data-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Ajouter au panier</button>
    </div>
  `;

  // thumbs
  const modalThumbs = productModalBody.querySelectorAll('.modal-thumb');
  const modalMainImg = productModalBody.querySelector('#modalMainImg');
  modalThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      modalThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      modalMainImg.src = thumb.getAttribute('data-src');
    });
  });

  // add to cart depuis la modal
  const btnModalAdd = productModalBody.querySelector('.btn-modal-add');
  if (btnModalAdd) btnModalAdd.addEventListener('click', () => {
    const id = parseInt(btnModalAdd.getAttribute('data-id'));
    addToCart(id, null);
    btnModalAdd.classList.add('added');
    btnModalAdd.innerHTML = '<i class="fa-solid fa-check"></i> Ajouté !';
    setTimeout(() => { btnModalAdd.classList.remove('added'); btnModalAdd.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Ajouter au panier'; }, 1200);
  });

  // ouvrir overlay
  productModalOverlay.classList.add('open');
}

function closeProductModal() {
  productModalOverlay.classList.remove('open');
  productModalBody.innerHTML = '';
}

function getCategoryLabel(cat) {
  const map = { telephone: 'Téléphone', audio: 'Audio', tablette: 'Tablette', accessoire: 'Accessoire' };
  return map[cat] || cat;
}

function renderFilters() {
  // garde le conteneur existant mais remplace les boutons (la dernière entrée est results-count)
  const elems = [
    ...categories.map(c => `<button class="filter-btn" data-filter="${c.id}"><i class="fa-solid fa-box"></i> ${c.label}</button>`)
  ];
  filtersBar.innerHTML = elems.join('') + `<span class="results-count" id="resultsCount"></span>`;

  // rattacher événements
  filtersBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderCatalogue();
    });
  });
  // set default active
  const first = filtersBar.querySelector('.filter-btn[data-filter="all"]');
  if (first) first.classList.add('active');
}

function addToCart(productId, buttonEl) {
  const product = products.find(p => p.id === productId);
  if (!product || product.stock <= 0) { showToast('Produit indisponible'); return; }
  cart.push({ ...product });
  updateCartUI();
  if (buttonEl) {
    buttonEl.classList.add('added');
    buttonEl.innerHTML = '<i class="fa-solid fa-check"></i> Ajouté !';
    setTimeout(() => {
      buttonEl.classList.remove('added');
      buttonEl.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Ajouter';
    }, 1200);
  }
  showToast(`${product.name} ajouté au panier`);
}

function removeFromCart(index) {
  const removed = cart[index];
  cart.splice(index, 1);
  updateCartUI();
  if (removed) showToast(`${removed.name} retiré`);
}

function updateCartUI() {
  cartCountEl.textContent = cart.length;
  if (floatingCartCountEl) floatingCartCountEl.textContent = cart.length;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
  } else {
    cartItemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${item.images[0]}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"/></div>
        <div class="cart-item-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-price">${formatFCFA(item.price)}</div>
        </div>
        <button class="cart-item-remove" data-index="${index}" title="Retirer"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `).join('');

    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.getAttribute('data-index'))));
    });
  }
  const total = cart.reduce((s, i) => s + i.price, 0);
  cartTotalEl.textContent = formatFCFA(total);
}

function openCart() { cartOverlay.classList.add('open'); cartSidebar.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartOverlay.classList.remove('open'); cartSidebar.classList.remove('open'); document.body.style.overflow = ''; }

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastEl._timeout);
  toastEl._timeout = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// Événements communs (panier, modal, toast)
if (btnOpenCart) btnOpenCart.addEventListener('click', openCart);
if (floatingCartBtn) floatingCartBtn.addEventListener('click', openCart);
if (btnCloseCart) btnCloseCart.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
if (btnCloseModal) btnCloseModal.addEventListener('click', closeProductModal);
if (productModalOverlay) productModalOverlay.addEventListener('click', (e) => { if (e.target === productModalOverlay) closeProductModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); closeProductModal(); } });

if (btnCheckout) btnCheckout.addEventListener('click', () => {
  if (cart.length === 0) { showToast('Panier vide !'); return; }
  const total = cart.reduce((s, i) => s + i.price, 0);
  showToast(`Commande de ${formatFCFA(total)} validée !`);
  cart = [];
  updateCartUI();
  closeCart();
});

// Commande via WhatsApp avec message pré-rempli
if (btnCheckoutWhatsApp) {
  btnCheckoutWhatsApp.addEventListener('click', (e) => {
    if (cart.length === 0) {
      e.preventDefault();
      showToast('Panier vide !');
      return;
    }

    // Construire le message avec tous les produits du panier
    const lines = cart.map((item, i) => `- ${item.name} : ${formatFCFA(item.price)}`);
    const total = cart.reduce((s, item) => s + item.price, 0);
    const message = `Bonjour ElectroShop 👋\n\nJe souhaite passer commande pour les produits suivants :\n\n${lines.join('\n')}\n\nTotal : ${formatFCFA(total)}\n\nMerci de confirmer la disponibilité et les modalités de livraison.`;

    // Numéro WhatsApp (format international sans +)
    const phoneNumber = '221781923146';
    btnCheckoutWhatsApp.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Le lien s'ouvre normalement dans un nouvel onglet (target="_blank")
    showToast('Ouverture de WhatsApp...');
  });
}

// Événements spécifiques à la page catalogue (index.html)
if (btnSearch && searchInput) {
  btnSearch.addEventListener('click', () => { searchQuery = searchInput.value.trim(); renderCatalogue(); });
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { searchQuery = searchInput.value.trim(); renderCatalogue(); } });
  let searchTimeout;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { searchQuery = searchInput.value.trim(); renderCatalogue(); }, 300); });
}

// Événements spécifiques à la page contact
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    console.log('Formulaire contact soumis :', data);
    showToast('Message envoyé ! Nous vous répondrons sous 24h.');
    contactForm.reset();
  });
}

// Menu mobile (présent dans HTML)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
if (navLinks) navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('show')));

// Init - seulement si on est sur la page catalogue
if (catalogueEl && filtersBar) {
  renderFilters();
  renderCatalogue();
}
updateCartUI();

// ========== MODAL DEMANDE DEVIS ==========
function openDevisModal() {
  if (devisModalOverlay) {
    devisModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus sur le premier champ
    setTimeout(() => {
      const firstInput = devisModalOverlay.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeDevisModal() {
  if (devisModalOverlay) {
    devisModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form
    if (devisForm) devisForm.reset();
    if (devisAutreGroup) devisAutreGroup.style.display = 'none';
  }
}

// Gestion du champ "Autre" selon la sélection
if (devisNeedSelect && devisAutreGroup) {
  devisNeedSelect.addEventListener('change', () => {
    if (devisNeedSelect.value === 'autre') {
      devisAutreGroup.style.display = 'block';
      devisAutreGroup.querySelector('input').required = true;
    } else {
      devisAutreGroup.style.display = 'none';
      devisAutreGroup.querySelector('input').required = false;
    }
  });
}

// Soumission du formulaire devis
if (devisForm) {
  devisForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(devisForm);
    const data = Object.fromEntries(formData.entries());
    console.log('Demande de devis soumise :', data);
    showToast('Demande de devis envoyée ! Nous vous recontacterons sous 24h.');
    closeDevisModal();
  });
}

// Événements modal devis
if (btnOpenDevis) btnOpenDevis.addEventListener('click', openDevisModal);
if (btnCloseDevis) btnCloseDevis.addEventListener('click', closeDevisModal);
if (devisModalOverlay) devisModalOverlay.addEventListener('click', (e) => { if (e.target === devisModalOverlay) closeDevisModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDevisModal(); } });

// ========== CAROUSEL AVIS CLIENTS ==========
const testimonialsData = [
  {
    author: "Marie Diop",
    role: "Directrice IT - TechSenegal",
    text: "Service impeccable ! Livraison en 24h, matériel conforme et bien emballé. Notre équipe est ravie des nouveaux MacBook Pro pour le développement.",
    rating: 5,
    initials: "MD"
  },
  {
    author: "Ahmed Ba",
    role: "Freelance Designer",
    text: "Le meilleur rapport qualité/prix pour mon équipement audio. Les AirPods Pro 2 sont arrivés en parfait état, son incroyable. Je recommande à 100%.",
    rating: 5,
    initials: "AB"
  },
  {
    author: "Fatou Sow",
    role: "Étudiante Master Data",
    text: "J'ai commandé un iPad Pro pour mes cours. Prix compétitif, garantie 2 ans, et le SAV a répondu à mes questions en 10 min. Top !",
    rating: 5,
    initials: "FS"
  },
  {
    author: "Ousmane Diallo",
    role: "Gérant - Diallo Informatique",
    text: "Partenaire fiable pour ma boutique. Réapprovisionnement rapide, marges correctes, et l'équipe commerciale est toujours dispo. Relation de confiance depuis 2 ans.",
    rating: 5,
    initials: "OD"
  },
  {
    author: "Aïcha Ndiaye",
    role: "Chef de Projet Marketing",
    text: "Commande groupée pour 15 collaborateurs : iPhone 15 + accessoires. Gestion de projet fluide, facturation claire, livraison groupée. Gain de temps énorme.",
    rating: 5,
    initials: "AN"
  },
  {
    author: "Mamadou Fall",
    role: "Développeur Full Stack",
    text: "Mon Samsung S24 Ultra acheté ici. Écran magnifique, perf au top. Le petit plus : config initiale offerte (comptes, apps, sécurité). Service premium !",
    rating: 5,
    initials: "MF"
  }
];

let currentTestimonialIndex = 0;
let testimonialsPerView = 3;
let autoSlideInterval;

function getTestimonialsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function renderTestimonials() {
  if (!testimonialsTrack) return;
  
  testimonialsPerView = getTestimonialsPerView();
  
  testimonialsTrack.innerHTML = testimonialsData.map((t, i) => `
    <div class="testimonial-card" data-index="${i}">
      <div class="testimonial-stars">
        ${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div class="testimonial-info">
          <h4>${t.author}</h4>
          <p>${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
  
  renderDots();
  updateCarousel();
}

function renderDots() {
  if (!testimonialsDots) return;
  
  const totalSlides = Math.ceil(testimonialsData.length / testimonialsPerView);
  testimonialsDots.innerHTML = Array(totalSlides).fill(0).map((_, i) => 
    `<button class="testimonials-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Aller à l'avis ${i + 1}"></button>`
  ).join('');
  
  testimonialsDots.querySelectorAll('.testimonials-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentTestimonialIndex = parseInt(dot.getAttribute('data-slide')) * testimonialsPerView;
      updateCarousel();
      resetAutoSlide();
    });
  });
}

function updateCarousel() {
  if (!testimonialsTrack) return;
  
  testimonialsPerView = getTestimonialsPerView();
  const cardWidth = 100 / testimonialsPerView;
  const maxIndex = testimonialsData.length - testimonialsPerView;
  const clampedIndex = Math.max(0, Math.min(currentTestimonialIndex, maxIndex));
  
  testimonialsTrack.style.transform = `translateX(-${(clampedIndex / testimonialsData.length) * 100}%)`;
  
  // Update dots
  const currentSlide = Math.floor(clampedIndex / testimonialsPerView);
  testimonialsDots.querySelectorAll('.testimonials-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
  
  // Update nav buttons
  if (testimonialsPrev) testimonialsPrev.style.opacity = clampedIndex === 0 ? '0.5' : '1';
  if (testimonialsNext) testimonialsNext.style.opacity = clampedIndex >= maxIndex ? '0.5' : '1';
}

function nextTestimonial() {
  const maxIndex = testimonialsData.length - testimonialsPerView;
  if (currentTestimonialIndex < maxIndex) {
    currentTestimonialIndex++;
  } else {
    currentTestimonialIndex = 0; // Loop back to start
  }
  updateCarousel();
}

function prevTestimonial() {
  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--;
  } else {
    currentTestimonialIndex = testimonialsData.length - testimonialsPerView; // Loop to end
  }
  updateCarousel();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Event listeners for carousel
if (testimonialsNext) testimonialsNext.addEventListener('click', () => { nextTestimonial(); resetAutoSlide(); });
if (testimonialsPrev) testimonialsPrev.addEventListener('click', () => { prevTestimonial(); resetAutoSlide(); });

// Pause auto-slide on hover
const carousel = document.getElementById('testimonialsCarousel');
if (carousel) {
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('mouseleave', startAutoSlide);
}

// Handle window resize
window.addEventListener('resize', () => {
  const newPerView = getTestimonialsPerView();
  if (newPerView !== testimonialsPerView) {
    testimonialsPerView = newPerView;
    // Adjust current index to stay valid
    const maxIndex = testimonialsData.length - testimonialsPerView;
    if (currentTestimonialIndex > maxIndex) currentTestimonialIndex = maxIndex;
    renderTestimonials();
  }
});

// Initialize testimonials carousel
if (testimonialsTrack) {
  renderTestimonials();
  startAutoSlide();
}
