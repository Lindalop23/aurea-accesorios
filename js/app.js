/**
 * ==========================================================================
 * ÁUREA ACCESORIOS - Single Page Application Core Engine (app.js)
 * ==========================================================================
 * Desarrollado con JavaScript puro (Vanilla JS), LocalStorage y API de WhatsApp.
 * Adaptado dinámicamente al inventario real extraído de Excel.
 */

// ==========================================
// 1. CONFIGURACIÓN GENERAL DE LA TIENDA
// ==========================================
const CONFIG = {
  // Número de WhatsApp para recibir pedidos (código internacional Venezuela 58 + 4220213291)
  WHATSAPP_NUMBER: '584220213291', 
  BRAND_NAME: 'Áurea Accesorios',
  SHIPPING_ORIGIN: 'Mérida, Venezuela',
  CURRENCY_SYMBOL: '$',
  STORAGE_CART_KEY: 'aurea_cart_v2',
  DEFAULT_WHATSAPP_MSG: '¡Hola Áurea Accesorios! ✨ Vengo desde su tienda online y deseo información sobre sus joyas y envíos nacionales desde Mérida.'
};

// ==========================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
const AppState = {
  cart: [],
  activeCategory: 'all',
  activeTag: null,
  searchQuery: '',
  sortBy: 'default' // 'default' | 'price-asc' | 'price-desc'
};

// ==========================================
// 3. INICIALIZACIÓN DE LA APP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorageCart();
  renderCategoriesGrid();
  renderCollectionsGrid();
  renderFilterTabs();
  renderProductsCatalog();
  setupEventListeners();
  updateCartCounters();
  setupFloatingWhatsApp();
  setupSmoothScroll();
});

// ==========================================
// 4. LÓGICA DEL CARRITO (LOCALSTORAGE)
// ==========================================
function initLocalStorageCart() {
  try {
    const saved = localStorage.getItem(CONFIG.STORAGE_CART_KEY);
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error al cargar carrito de LocalStorage:', error);
    AppState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CONFIG.STORAGE_CART_KEY, JSON.stringify(AppState.cart));
  } catch (error) {
    console.error('Error al guardar carrito en LocalStorage:', error);
  }
}

function getProductDisplayName(product) {
  if (product.nombre && product.nombre.trim() !== '' && product.nombre !== '[NOMBRE AQUÍ]') {
    return product.nombre;
  }
  return `${product.categoria} (${product.id})`;
}

function getProductFallbackImage(categoria) {
  if (CATEGORIAS_METADATA && CATEGORIAS_METADATA[categoria] && CATEGORIAS_METADATA[categoria].imagenFallback) {
    return CATEGORIAS_METADATA[categoria].imagenFallback;
  }
  return 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop';
}

function addToCart(productId, quantity = 1) {
  const product = productos.find(p => p.id === productId);
  if (!product) return;

  const displayName = getProductDisplayName(product);
  const numericPrice = parsePrecio(product.precio);
  const fallbackImg = getProductFallbackImage(product.categoria);

  const existingItemIndex = AppState.cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += quantity;
  } else {
    const itemImg = (product.imagen && product.imagen.trim() !== '') 
      ? product.imagen 
      : `./assets/images/catalogo/${product.id}.jpg`;

    AppState.cart.push({
      id: product.id,
      nombre: displayName,
      precio: numericPrice,
      precioOriginal: product.precio,
      categoria: product.categoria,
      imagen: itemImg,
      fallbackImagen: fallbackImg,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartCounters();
  renderCartDrawer();
  showToast(`¡"${displayName}" añadido al carrito! ✨`);
}

function updateCartQuantity(productId, delta) {
  const itemIndex = AppState.cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  AppState.cart[itemIndex].quantity += delta;

  if (AppState.cart[itemIndex].quantity <= 0) {
    AppState.cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartCounters();
  renderCartDrawer();
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartCounters();
  renderCartDrawer();
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartCounters();
  renderCartDrawer();
}

function getCartTotal() {
  return AppState.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
}

function getCartItemsCount() {
  return AppState.cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCounters() {
  const count = getCartItemsCount();
  const badges = document.querySelectorAll('.cart-count-badge');
  
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  });
}

// ==========================================
// 5. RENDERIZADO DEL CARRITO (DRAWER)
// ==========================================
function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footerEl = document.getElementById('cart-footer');
  const totalAmountEl = document.getElementById('cart-total-amount');

  if (!container || !emptyState || !footerEl) return;

  if (AppState.cart.length === 0) {
    emptyState.classList.remove('hidden');
    container.classList.add('hidden');
    footerEl.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  emptyState.classList.add('hidden');
  container.classList.remove('hidden');
  footerEl.classList.remove('hidden');

  let itemsHTML = '';
  AppState.cart.forEach(item => {
    const subtotalText = item.precio > 0 
      ? `${CONFIG.CURRENCY_SYMBOL}${(item.precio * item.quantity).toFixed(2)}`
      : 'Por cotizar';

    const unitPriceText = item.precio > 0
      ? `${CONFIG.CURRENCY_SYMBOL}${item.precio.toFixed(2)} c/u`
      : 'Precio a consultar';

    itemsHTML += `
      <div class="flex items-center gap-3 p-3 bg-white rounded-xl border border-crema/20 shadow-sm transition hover:border-crema-oscuro/40">
        <img 
          src="${item.imagen}" 
          alt="${item.nombre}" 
          class="w-16 h-16 object-cover rounded-lg border border-crema-claro bg-gris"
          onerror="this.onerror=null; this.src='${item.fallbackImagen}'"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono font-bold bg-gris text-negro px-1.5 py-0.5 rounded">${item.id}</span>
            <p class="text-xs uppercase tracking-wider text-crema-oscuro font-medium truncate">${item.categoria}</p>
          </div>
          <h4 class="text-sm font-semibold text-negro truncate mt-0.5">${item.nombre}</h4>
          <p class="text-xs text-negro/70 font-medium">${unitPriceText}</p>
          
          <div class="flex items-center gap-2 mt-2">
            <div class="inline-flex items-center border border-crema/30 rounded-lg bg-gris/50">
              <button 
                onclick="updateCartQuantity('${item.id}', -1)" 
                class="px-2 py-0.5 text-xs text-negro hover:bg-crema-claro rounded-l transition"
                aria-label="Disminuir cantidad"
              >-</button>
              <span class="px-2 text-xs font-semibold text-negro">${item.quantity}</span>
              <button 
                onclick="updateCartQuantity('${item.id}', 1)" 
                class="px-2 py-0.5 text-xs text-negro hover:bg-crema-claro rounded-r transition"
                aria-label="Aumentar cantidad"
              >+</button>
            </div>
            <button 
              onclick="removeFromCart('${item.id}')" 
              class="text-xs text-red-500 hover:text-red-700 ml-auto transition flex items-center gap-1"
              title="Eliminar artículo"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="text-right pl-2">
          <span class="text-sm font-bold text-negro">${subtotalText}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = itemsHTML;
  totalAmountEl.textContent = `${CONFIG.CURRENCY_SYMBOL}${getCartTotal().toFixed(2)}`;
}

// ==========================================
// 6. CHECKOUT Y REDIRECCIÓN A WHATSAPP
// ==========================================
function finalizeOrderToWhatsApp() {
  if (AppState.cart.length === 0) {
    alert('Tu carrito está vacío. Agrega piezas radiantes antes de finalizar.');
    return;
  }

  const clientNameInput = document.getElementById('checkout-client-name');
  const clientCityInput = document.getElementById('checkout-client-city');

  const clientName = clientNameInput ? clientNameInput.value.trim() : '';
  const clientCity = clientCityInput ? clientCityInput.value.trim() : '';

  let message = `✨ *¡HOLA, ÁUREA ACCESORIOS!* ✨\n`;
  message += `Deseo realizar el siguiente pedido desde su tienda online:\n\n`;

  if (clientName) {
    message += `👤 *Cliente:* ${clientName}\n`;
  }
  if (clientCity) {
    message += `📍 *Ciudad / Estado de Envío:* ${clientCity}\n`;
  }
  message += `📦 *Origen del despacho:* ${CONFIG.SHIPPING_ORIGIN}\n\n`;

  message += `🛍️ *DETALLE DE MI PEDIDO:*\n`;
  AppState.cart.forEach((item, index) => {
    const itemTotalStr = item.precio > 0
      ? `${CONFIG.CURRENCY_SYMBOL}${(item.precio * item.quantity).toFixed(2)}`
      : 'Por cotizar';
    message += `${index + 1}. *[${item.id}] ${item.nombre}* (x${item.quantity}) - ${itemTotalStr}\n`;
  });

  const total = getCartTotal();
  if (total > 0) {
    message += `\n💰 *TOTAL ESTIMADO:* ${CONFIG.CURRENCY_SYMBOL}${total.toFixed(2)} USD\n\n`;
  } else {
    message += `\n💰 *TOTAL:* A convenir según cotización\n\n`;
  }
  
  message += `Por favor, confírmenme la disponibilidad y los métodos de pago (Pago Móvil / Zelle / Efectivo / Transferencia) para concretar el despacho nacional. ¡Muchas gracias! ✨`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

// ==========================================
// 7. RENDERIZADO DE CATEGORÍAS (DINÁMICO)
// ==========================================
function renderCategoriesGrid() {
  const container = document.getElementById('categories-grid');
  if (!container) return;

  const categoriasUnicas = obtenerCategoriasUnicas();
  let html = '';

  categoriasUnicas.forEach(catName => {
    const productCount = productos.filter(p => p.categoria === catName).length;
    const catMeta = CATEGORIAS_METADATA[catName] || {
      descripcion: `Piezas selectas de ${catName}`,
      imagenFallback: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop'
    };

    html += `
      <div 
        onclick="filterByCategory('${catName}')"
        class="category-card group cursor-pointer relative overflow-hidden rounded-2xl bg-white border border-crema-claro shadow-sm hover:shadow-luxury transition-all duration-300"
      >
        <div class="relative h-44 overflow-hidden bg-gris">
          <img 
            src="${catMeta.imagenFallback}" 
            alt="${catName}" 
            class="cat-img w-full h-full object-cover transition-transform duration-700"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-negro/75 via-negro/20 to-transparent"></div>
          <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-negro shadow">
            ${productCount} piezas
          </div>
        </div>
        <div class="p-4 text-center bg-white">
          <h3 class="font-serif-luxury text-xl font-bold text-negro group-hover:text-crema-oscuro transition-colors tracking-wide">
            ${catName}
          </h3>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// 8. RENDERIZADO DE COLECCIONES (TAG-BASED)
// ==========================================
function renderCollectionsGrid() {
  const container = document.getElementById('collections-grid');
  if (!container) return;

  let html = '';
  COLECCIONES_DATA.forEach(col => {
    const count = productos.filter(p => p.coleccion && p.coleccion.toLowerCase().includes(col.tag.toLowerCase())).length;
    html += `
      <div 
        onclick="filterByCollection('${col.tag}', '${col.nombre}')"
        class="group cursor-pointer relative overflow-hidden rounded-3xl bg-[#161514] text-white shadow-xl hover:shadow-luxury-hover hover:border-crema-oscuro/60 transition-all duration-500 min-h-[300px] flex flex-col justify-end p-6 border border-crema-oscuro/30"
      >
        <img 
          src="${col.imagen}" 
          alt="${col.nombre}" 
          class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/60 to-transparent"></div>
        
        <div class="relative z-10">
          <span class="inline-block bg-[#ab8b6e] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-2 shadow">
            Colección Especial
          </span>
          <h3 class="font-serif-luxury text-2xl sm:text-3xl font-bold text-white group-hover:text-crema-claro transition-colors">
            ${col.nombre}
          </h3>
          
          <div class="mt-4 flex items-center justify-between pt-3 border-t border-white/20">
            <span class="text-xs text-white/90 font-medium">${count > 0 ? `${count} piezas asociadas` : 'Ver selección'}</span>
            <span class="inline-flex items-center gap-1.5 text-xs text-[#ab8b6e] font-bold group-hover:translate-x-1.5 transition-transform">
              Explorar
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// 9. BARRA DE FILTROS DINÁMICOS POR CATEGORÍA
// ==========================================
function renderFilterTabs() {
  const container = document.getElementById('catalog-filter-tabs');
  if (!container) return;

  const categoriasUnicas = obtenerCategoriasUnicas();
  
  let html = `
    <button 
      onclick="setCategoryFilter('all')"
      class="px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
        AppState.activeCategory === 'all' && !AppState.activeTag
          ? 'bg-negro text-white shadow-md' 
          : 'bg-white text-negro/80 hover:bg-crema-claro border border-crema-claro'
      }"
    >
      Todas (${productos.length})
    </button>
  `;

  categoriasUnicas.forEach(catName => {
    const isActive = AppState.activeCategory === catName && !AppState.activeTag;
    const catCount = productos.filter(p => p.categoria === catName).length;
    html += `
      <button 
        onclick="setCategoryFilter('${catName}')"
        class="px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
          isActive 
            ? 'bg-negro text-white shadow-md' 
            : 'bg-white text-negro/80 hover:bg-crema-claro border border-crema-claro'
        }"
      >
        ${catName} (${catCount})
      </button>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// 10. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
// ==========================================
function renderProductsCatalog() {
  const container = document.getElementById('products-grid');
  const activeFilterNotice = document.getElementById('active-filter-notice');

  if (!container) return;

  // Filtrado de productos según categoría, tag de colección o término de búsqueda
  let filtered = productos.filter(product => {
    // Filtro por colección (tag)
    if (AppState.activeTag) {
      if (!product.coleccion || !product.coleccion.toLowerCase().includes(AppState.activeTag.toLowerCase())) {
        return false;
      }
    } else if (AppState.activeCategory !== 'all') {
      if (product.categoria !== AppState.activeCategory) {
        return false;
      }
    }

    // Filtro por búsqueda de texto
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      const matchName = product.nombre && product.nombre.toLowerCase().includes(q);
      const matchId = product.id && product.id.toLowerCase().includes(q);
      const matchCat = product.categoria && product.categoria.toLowerCase().includes(q);
      const matchCol = product.coleccion && product.coleccion.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchCat && !matchCol) return false;
    }

    return true;
  });

  // Ordenamiento dinámico (Menor a Mayor / Mayor a Menor / Alfabético A-Z por defecto)
  if (AppState.sortBy === 'price-asc') {
    filtered.sort((a, b) => {
      const priceA = parsePrecio(a.precio);
      const priceB = parsePrecio(b.precio);
      if (priceA === 0) return 1; // Productos a cotizar al final
      if (priceB === 0) return -1;
      return priceA - priceB;
    });
  } else if (AppState.sortBy === 'price-desc') {
    filtered.sort((a, b) => {
      const priceA = parsePrecio(a.precio);
      const priceB = parsePrecio(b.precio);
      if (priceA === 0) return 1;
      if (priceB === 0) return -1;
      return priceB - priceA;
    });
  } else {
    // Orden alfabético por defecto (A-Z)
    filtered.sort((a, b) => {
      const nameA = getProductDisplayName(a);
      const nameB = getProductDisplayName(b);
      return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
    });
  }

  // Notificación visual de filtro activo
  if (activeFilterNotice) {
    if (AppState.activeTag) {
      const colObj = COLECCIONES_DATA.find(c => c.tag === AppState.activeTag);
      const colName = colObj ? colObj.nombre : AppState.activeTag;
      activeFilterNotice.classList.remove('hidden');
      activeFilterNotice.innerHTML = `
        <span class="text-xs text-negro/70">Colección activa:</span>
        <span class="text-xs font-bold text-crema-oscuro uppercase tracking-wider bg-crema-claro px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          ${colName}
          <button onclick="resetFilters()" class="hover:text-red-600 transition ml-1" title="Quitar filtro">×</button>
        </span>
      `;
    } else if (AppState.activeCategory !== 'all') {
      activeFilterNotice.classList.remove('hidden');
      activeFilterNotice.innerHTML = `
        <span class="text-xs text-negro/70">Categoría seleccionada:</span>
        <span class="text-xs font-bold text-crema-oscuro uppercase tracking-wider bg-crema-claro px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          ${AppState.activeCategory}
          <button onclick="resetFilters()" class="hover:text-red-600 transition ml-1" title="Quitar filtro">×</button>
        </span>
      `;
    } else {
      activeFilterNotice.classList.add('hidden');
    }
  }

  // Si no hay productos
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white/70 rounded-3xl border border-dashed border-crema-oscuro/40 p-8">
        <div class="w-16 h-16 mx-auto mb-4 bg-crema-claro rounded-full flex items-center justify-center text-crema-oscuro">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="font-serif-luxury text-2xl font-bold text-negro">No se encontraron piezas</h3>
        <p class="text-xs text-negro/60 mt-1 max-w-md mx-auto">
          No tenemos piezas que coincidan con la búsqueda o categoría seleccionada.
        </p>
        <button 
          onclick="resetFilters()" 
          class="mt-5 px-6 py-2.5 bg-negro text-white rounded-full text-xs font-semibold hover:bg-crema-oscuro transition"
        >
          Ver todo el catálogo (${productos.length} piezas)
        </button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(p => {
    const displayName = getProductDisplayName(p);
    const fallbackImg = getProductFallbackImage(p.categoria);
    const numericPrice = parsePrecio(p.precio);
    const formattedPrice = formatearPrecio(p.precio);

    const imageSrc = (p.imagen && p.imagen.trim() !== '') ? p.imagen : `./assets/images/catalogo/${p.id}.jpg`;

    html += `
      <div class="group bg-white rounded-2xl overflow-hidden border border-crema-claro shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
        
        <!-- Contenedor Imagen con Fallback Inteligente -->
        <div class="relative overflow-hidden bg-gris aspect-square">
          <img 
            src="${imageSrc}" 
            alt="${displayName}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onerror="this.onerror=null; this.src='${fallbackImg}'"
          />
          
          <!-- Badges de Código SKU y Colección -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span class="bg-negro/90 backdrop-blur-sm text-crema text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
              ${p.id}
            </span>
            ${p.coleccion ? `
              <span class="bg-[#ab8b6e] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                ${p.coleccion}
              </span>
            ` : ''}
          </div>

          <!-- Botón flotante consulta rápida WhatsApp -->
          <button 
            onclick="quickWhatsAppInquiry('${p.id}')" 
            title="Consultar pieza por WhatsApp"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-green-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow hover:scale-110"
          >
            <i class="fab fa-whatsapp text-lg"></i>
          </button>
        </div>

        <!-- Información de la Pieza -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif-luxury text-lg font-bold text-negro group-hover:text-crema-oscuro transition-colors line-clamp-1">
              ${displayName}
            </h3>
          </div>

          <!-- Precio y Botón Añadir -->
          <div class="mt-4 pt-3 border-t border-crema-claro/60 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-negro/50 uppercase tracking-widest block font-medium">Precio</span>
              <span class="text-lg font-bold text-negro">${formattedPrice}</span>
            </div>
            
            <button 
              onclick="addToCart('${p.id}')"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-negro hover:bg-crema-oscuro text-white text-xs font-semibold rounded-xl shadow transition duration-200 active:scale-95"
              aria-label="Añadir al carrito"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Añadir</span>
            </button>
          </div>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// 11. ACCIONES DE FILTRADO
// ==========================================
function filterByCategory(categoryId) {
  AppState.activeCategory = categoryId;
  AppState.activeTag = null;
  renderFilterTabs();
  renderProductsCatalog();
  scrollToElement('catalogo');
}

function filterByCollection(tag, name) {
  AppState.activeTag = tag;
  AppState.activeCategory = 'all';
  renderFilterTabs();
  renderProductsCatalog();
  scrollToElement('catalogo');
}

function setCategoryFilter(categoryId) {
  AppState.activeCategory = categoryId;
  AppState.activeTag = null;
  renderFilterTabs();
  renderProductsCatalog();
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.activeTag = null;
  AppState.searchQuery = '';
  AppState.sortBy = 'default';
  
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) sortSelect.value = 'default';

  renderFilterTabs();
  renderProductsCatalog();
}

function handleSortChange(event) {
  AppState.sortBy = event.target.value;
  renderProductsCatalog();
}

function handleSearch(event) {
  AppState.searchQuery = event.target.value;
  renderProductsCatalog();
}

// ==========================================
// 12. CONSULTA DIRECTA DE PRODUCTO POR WHATSAPP
// ==========================================
function quickWhatsAppInquiry(productId) {
  const product = productos.find(p => p.id === productId);
  if (!product) return;

  const displayName = getProductDisplayName(product);
  const formattedPrice = formatearPrecio(product.precio);

  const msg = `✨ *¡Hola Áurea Accesorios!* ✨\nMe encantó esta pieza de su inventario online y deseo consultar disponibilidad:\n\n• *Código:* ${product.id}\n• *Pieza:* ${displayName}\n• *Categoría:* ${product.categoria}\n• *Precio:* ${formattedPrice}\n\n¿Tienen envíos disponibles a mi ciudad? (Envíos desde Mérida, Venezuela). ¡Muchas gracias!`;
  const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function notifyGoldWaitlist() {
  const msg = `✨ *¡Hola Áurea Accesorios!* ✨\nDeseo unirme a la *Lista VIP Exclusiva* para el lanzamiento de la colección de *Oro Nacional y 18k*.\nPor favor, agréguenme a sus contactos prioritarios para enterarme de las primeras piezas disponibles. ¡Muchas gracias!`;
  const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ==========================================
// 13. TOAST NOTIFICATION
// ==========================================
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  clearTimeout(toastTimeout);
  toastMessage.textContent = message;

  toast.classList.remove('hidden', 'toast-exit');
  toast.classList.add('toast-show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3200);
}

// ==========================================
// 14. CONTROLADORES DEL DRAWER DEL CARRITO
// ==========================================
function toggleCartDrawer(open = true) {
  const drawer = document.getElementById('cart-drawer');
  const panel = document.getElementById('cart-drawer-panel');
  const overlay = document.getElementById('cart-drawer-overlay');

  if (!drawer || !panel || !overlay) return;

  if (open) {
    drawer.classList.remove('hidden');
    renderCartDrawer();
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      overlay.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
    }, 10);
  } else {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => {
      drawer.classList.add('hidden');
    }, 350);
  }
}

// ==========================================
// 15. MENÚ MÓVIL (HAMBURGUESA)
// ==========================================
function toggleMobileMenu(open) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  if (open === undefined) {
    menu.classList.toggle('hidden');
  } else if (open) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

// ==========================================
// 16. BOTÓN FLOTANTE WHATSAPP (FAB)
// ==========================================
function setupFloatingWhatsApp() {
  const fab = document.getElementById('whatsapp-fab');
  if (!fab) return;

  fab.addEventListener('click', (e) => {
    e.preventDefault();
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.DEFAULT_WHATSAPP_MSG)}`;
    window.open(url, '_blank');
  });
}

// ==========================================
// 17. SCROLL SUAVE Y EVENT LISTENERS
// ==========================================
function scrollToElement(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const navbarHeight = 110;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        toggleMobileMenu(false);
        scrollToElement(targetId);
      }
    });
  });
}

function setupEventListeners() {
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleCartDrawer(false);
      toggleMobileMenu(false);
    }
  });
}
