/**
 * ÁUREA ACCESORIOS - Catálogo de Productos y Colecciones
 * 
 * Este archivo simula una base de datos o JSON dinámico.
 * Puedes agregar, editar o retirar productos aquí sin tocar la interfaz visual.
 * 
 * Atributos de cada producto:
 * - id: Identificador único (número o texto)
 * - name: Nombre del producto
 * - category: Slug de la categoría principal (ej: 'anillos', 'zarcillos', etc.)
 * - categoryName: Nombre legible de la categoría
 * - price: Precio en USD
 * - image: URL de la imagen principal
 * - description: Breve descripción de la joya / accesorio
 * - tags: Etiquetas de colecciones especiales (ej: 'dia-de-las-madres', 'amor-y-amistad', 'diciembre')
 * - isFeatured: Destacado en catálogo principal (boolean)
 * - isNew: Novedad / recién llegado (boolean)
 * - inStock: Disponibilidad (boolean)
 */

const CATEGORIES_DATA = [
  {
    id: 'anillos',
    name: 'Anillos',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Sellos de elegancia y armonía'
  },
  {
    id: 'zarcillos',
    name: 'Zarcillos',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    description: 'Destellos sutiles para tu rostro'
  },
  {
    id: 'cadenas-con-dijes',
    name: 'Cadenas con Dijes',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Símbolos de significado y poder'
  },
  {
    id: 'cadenas-sin-dijes',
    name: 'Cadenas sin Dijes',
    image: 'https://images.unsplash.com/photo-1611591475152-473523dd66c8?q=80&w=800&auto=format&fit=crop',
    description: 'Minimalismo y pureza en eslabones'
  },
  {
    id: 'earcuff',
    name: 'Earcuff',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Estilo audaz sin perforaciones'
  },
  {
    id: 'termos',
    name: 'Termos',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    description: 'Hidratación con estilo y brillo'
  },
  {
    id: 'reloj-deportivo',
    name: 'Reloj Deportivo',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    description: 'Dinamismo, resistencia y elegancia'
  },
  {
    id: 'reloj-vintage',
    name: 'Reloj Vintage',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    description: 'Piezas clásicas que trascienden el tiempo'
  },
  {
    id: 'brazaletes',
    name: 'Brazaletes',
    image: 'https://images.unsplash.com/photo-1611591475152-473523dd66c8?q=80&w=800&auto=format&fit=crop',
    description: 'Presencia radiante en cada muñeca'
  },
  {
    id: 'pulseras',
    name: 'Pulseras',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop',
    description: 'Detalles que armonizan tu energía'
  },
  {
    id: 'panoletas',
    name: 'Pañoletas',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop',
    description: 'Sedas y texturas de alta distinción'
  },
  {
    id: 'collares-chicle',
    name: 'Collares Chicle',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    description: 'Volumen fresco y tendencia moderna'
  },
  {
    id: 'monederos',
    name: 'Monederos',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    description: 'Practicidad envuelta en lujo'
  },
  {
    id: 'lentes',
    name: 'Lentes',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
    description: 'Mirada audaz con protección radiante'
  }
];

const COLLECTIONS_DATA = [
  {
    tag: 'dia-de-las-madres',
    name: 'Día de las Madres',
    subtitle: 'Amor eterno y gratitud celestial',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    description: 'Piezas delicadas diseñadas para honrar el pilar más radiante de nuestras vidas.'
  },
  {
    tag: 'amor-y-amistad',
    name: 'Amor & Amistad',
    subtitle: 'Conexiones áureas para siempre',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop',
    description: 'Accesorios gemelos y detalles cargados de afecto y complicidad mutua.'
  },
  {
    tag: 'diciembre',
    name: 'Colección Diciembre',
    subtitle: 'Brillo y prosperidad de año nuevo',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Destellos intensos y dorados para celebrar los logros y atraer abundancia.'
  },
  {
    tag: 'bestsellers',
    name: 'Favoritos Áurea',
    subtitle: 'Las piezas más amadas',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Nuestros íconos de elegancia y armonía preferidos por nuestra comunidad.'
  }
];

const PRODUCTS_DATA = [
  // --- ANILLOS ---
  {
    id: 1,
    name: 'Anillo Radiance Solis',
    category: 'anillos',
    categoryName: 'Anillos',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Diseño ajustable bañado en oro con circonio central que evoca el resplandor solar.',
    tags: ['bestsellers', 'dia-de-las-madres'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 2,
    name: 'Anillo Dual Harmony',
    category: 'anillos',
    categoryName: 'Anillos',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop',
    description: 'Banda entrelazada que simboliza la prosperidad material y el equilibrio espiritual.',
    tags: ['amor-y-amistad'],
    isFeatured: false,
    isNew: true,
    inStock: true
  },

  // --- ZARCILLOS ---
  {
    id: 3,
    name: 'Zarcillos Gota Celestia',
    category: 'zarcillos',
    categoryName: 'Zarcillos',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    description: 'Elegantes aretes colgantes en gota esculpida, acabado pulido de máxima pureza.',
    tags: ['dia-de-las-madres', 'diciembre'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 4,
    name: 'Argollas Pure Gold Minimal',
    category: 'zarcillos',
    categoryName: 'Zarcillos',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop',
    description: 'Argollas clásicas de perfil grueso ultraligeras para uso diario impecable.',
    tags: ['bestsellers'],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- CADENAS CON DIJES ---
  {
    id: 5,
    name: 'Collar Áurea Flor de Loto',
    category: 'cadenas-con-dijes',
    categoryName: 'Cadenas con Dijes',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Dije de flor sagrada que canaliza renovación y abundancia continua.',
    tags: ['dia-de-las-madres', 'amor-y-amistad'],
    isFeatured: true,
    isNew: true,
    inStock: true
  },
  {
    id: 6,
    name: 'Gargantilla Astro Celestial',
    category: 'cadenas-con-dijes',
    categoryName: 'Cadenas con Dijes',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    description: 'Medalla lunar y estrella engastada con microcirconias de alta refracción.',
    tags: ['diciembre'],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- CADENAS SIN DIJES ---
  {
    id: 7,
    name: 'Cadena Eslabón Snake Flat',
    category: 'cadenas-sin-dijes',
    categoryName: 'Cadenas sin Dijes',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1611591475152-473523dd66c8?q=80&w=800&auto=format&fit=crop',
    description: 'Tejido serpiente plano que se adapta al cuello como un hilo de oro líquido.',
    tags: ['bestsellers'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 8,
    name: 'Cadena Fígaro Esculpida',
    category: 'cadenas-sin-dijes',
    categoryName: 'Cadenas sin Dijes',
    price: 19.50,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop',
    description: 'Secuencia clásica 3x1 en acabado brillante resistente al agua.',
    tags: [],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- EARCUFF ---
  {
    id: 9,
    name: 'Earcuff Triple Constelación',
    category: 'earcuff',
    categoryName: 'Earcuff',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Ajuste suave sin perforación para dar un toque vanguardista a tu peinado.',
    tags: ['diciembre', 'bestsellers'],
    isFeatured: true,
    isNew: true,
    inStock: true
  },
  {
    id: 10,
    name: 'Earcuff Twisted Gold',
    category: 'earcuff',
    categoryName: 'Earcuff',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800&auto=format&fit=crop',
    description: 'Doble vuelta trenzada dorada con brillo texturizado.',
    tags: ['amor-y-amistad'],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- TERMOS ---
  {
    id: 11,
    name: 'Termo Áurea Thermal Rose Gold (750ml)',
    category: 'termos',
    categoryName: 'Termos',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    description: 'Acero inoxidable doble pared, mantiene tus bebidas frías 24h con acabado champagne.',
    tags: ['dia-de-las-madres'],
    isFeatured: false,
    isNew: true,
    inStock: true
  },
  {
    id: 12,
    name: 'Termo Minimal Cream & Gold (500ml)',
    category: 'termos',
    categoryName: 'Termos',
    price: 21.00,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop',
    description: 'Diseño estilizado con tapa dorada a rosca hermética para oficina y viaje.',
    tags: [],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- RELOJ DEPORTIVO ---
  {
    id: 13,
    name: 'Reloj Chrono Sport Matte Gold',
    category: 'reloj-deportivo',
    categoryName: 'Reloj Deportivo',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    description: 'Resistente a salpicaduras, correa de silicona premium y bisel en oro champán.',
    tags: ['diciembre'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },

  // --- RELOJ VINTAGE ---
  {
    id: 14,
    name: 'Reloj Heritage Vintage Square',
    category: 'reloj-vintage',
    categoryName: 'Reloj Vintage',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    description: 'Caja rectangular clásica inspirada en la relojería europea de los años 60.',
    tags: ['bestsellers', 'dia-de-las-madres'],
    isFeatured: true,
    isNew: true,
    inStock: true
  },

  // --- BRAZALETES ---
  {
    id: 15,
    name: 'Brazalete Rígido Infinity Line',
    category: 'brazaletes',
    categoryName: 'Brazaletes',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1611591475152-473523dd66c8?q=80&w=800&auto=format&fit=crop',
    description: 'Brazalete abierto con terminales en esferas pulidas, fácil colocación y gran porte.',
    tags: ['diciembre'],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- PULSERAS ---
  {
    id: 16,
    name: 'Pulsera Áurea Perlas de Río & Oro',
    category: 'pulseras',
    categoryName: 'Pulseras',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop',
    description: 'Auténticas perlas cultivadas con separadores de baño dorado. Símbolo de pureza y prosperidad.',
    tags: ['dia-de-las-madres', 'amor-y-amistad'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },

  // --- PAÑOLETAS ---
  {
    id: 17,
    name: 'Pañoleta Silk Feeling Mérida Sunrise',
    category: 'panoletas',
    categoryName: 'Pañoletas',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop',
    description: 'Textura satinada de seda sintética con patrones botánicos y tonos tierra cálidos.',
    tags: ['dia-de-las-madres'],
    isFeatured: false,
    isNew: true,
    inStock: true
  },

  // --- COLLARES CHICLE ---
  {
    id: 18,
    name: 'Collar Bubble Glam Dorado',
    category: 'collares-chicle',
    categoryName: 'Collares Chicle',
    price: 23.50,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    description: 'Esferas graduadas de alto impacto visual que realzan cualquier blusa o escote.',
    tags: ['diciembre'],
    isFeatured: true,
    isNew: false,
    inStock: true
  },

  // --- MONEDEROS ---
  {
    id: 19,
    name: 'Monedero Petite Luxe Crema',
    category: 'monederos',
    categoryName: 'Monederos',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    description: 'Cuero vegano texturizado con broche dorado y compartimentos para tarjetas.',
    tags: ['amor-y-amistad'],
    isFeatured: false,
    isNew: false,
    inStock: true
  },

  // --- LENTES ---
  {
    id: 20,
    name: 'Lentes Cat Eye Amber Gold UV400',
    category: 'lentes',
    categoryName: 'Lentes',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
    description: 'Montura geométrica con detalles metálicos dorados y micas degradadas con filtro UV.',
    tags: ['bestsellers'],
    isFeatured: true,
    isNew: true,
    inStock: true
  }
];
