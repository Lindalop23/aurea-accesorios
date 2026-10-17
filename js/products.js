/**
 * ==========================================================================
 * ÁUREA ACCESORIOS - Base de Datos Real de Inventario (Excel)
 * ==========================================================================
 * 
 * Estructura de cada producto:
 * - id: Código SKU único (ej: "PRODZ01", "PRODA06")
 * - nombre: Nombre comercial de la pieza
 * - precio: Precio de venta (soporta enteros como "7" y decimales con coma como "3,5")
 * - categoria: Categoría a la que pertenece (Zarcillos, Anillos, Collares Chicle, etc.)
 * - coleccion: Etiqueta de colección especial (ej: "Día de la Madre", "Amor y Amistad", "Diciembre", etc.)
 * - imagen: Ruta relativa a la fotografía del producto en assets
 */

const productos = [
  { id: "PRODZ01", nombre: "[NOMBRE AQUÍ]", precio: "7", categoria: "Zarcillos", coleccion: "", imagen: "./assets/images/catalogo/PRODZ01.jpg" },
  { id: "PRODZ02", nombre: "[NOMBRE AQUÍ]", precio: "3,5", categoria: "Zarcillos", coleccion: "", imagen: "./assets/images/catalogo/PRODZ02.jpg" },
  { id: "PRODZ03", nombre: "[NOMBRE AQUÍ]", precio: "6", categoria: "Zarcillos", coleccion: "", imagen: "./assets/images/catalogo/PRODZ03.jpg" },
  { id: "PRODZ04", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Zarcillos", coleccion: "", imagen: "./assets/images/catalogo/PRODZ04.jpg" },
  { id: "PRODZ05", nombre: "[NOMBRE AQUÍ]", precio: "6", categoria: "Zarcillos", coleccion: "", imagen: "./assets/images/catalogo/PRODZ05.jpg" },
  { id: "PRODA06", nombre: "[NOMBRE AQUÍ]", precio: "6", categoria: "Anillos", coleccion: "", imagen: "./assets/images/catalogo/PRODA06.jpg" },
  { id: "PRODA06_B", nombre: "[NOMBRE AQUÍ]", precio: "5", categoria: "Anillos", coleccion: "", imagen: "./assets/images/catalogo/PRODA06_B.jpg" },
  { id: "PRODPa06", nombre: "[NOMBRE AQUÍ]", precio: "6", categoria: "Pañoletas", coleccion: "", imagen: "./assets/images/catalogo/PRODPa06.jpg" },
  { id: "PRODPul07", nombre: "[NOMBRE AQUÍ]", precio: "7", categoria: "Pulseras", coleccion: "", imagen: "./assets/images/catalogo/PRODPul07.jpg" },
  { id: "PRODCH07", nombre: "[NOMBRE AQUÍ]", precio: "7", categoria: "Collares Chicle", coleccion: "", imagen: "./assets/images/catalogo/PRODCH07.jpg" },
  { id: "PRODPa07", nombre: "[NOMBRE AQUÍ]", precio: "7", categoria: "Pañoletas", coleccion: "", imagen: "./assets/images/catalogo/PRODPa07.jpg" },
  { id: "PRODBr08", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Brazaletes", coleccion: "", imagen: "./assets/images/catalogo/PRODBr08.jpg" },
  { id: "PRODPul08", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Pulseras", coleccion: "", imagen: "./assets/images/catalogo/PRODPul08.jpg" },
  { id: "PRODCH08", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Collares Chicle", coleccion: "", imagen: "./assets/images/catalogo/PRODCH08.jpg" },
  { id: "PRODLen08", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Lentes", coleccion: "", imagen: "./assets/images/catalogo/PRODLen08.jpg" },
  { id: "PRODJueg09", nombre: "[NOMBRE AQUÍ]", precio: "12", categoria: "Juegos", coleccion: "", imagen: "./assets/images/catalogo/PRODJueg09.jpg" },
  { id: "PRODBr09", nombre: "[NOMBRE AQUÍ]", precio: "12", categoria: "Brazaletes", coleccion: "", imagen: "./assets/images/catalogo/PRODBr09.jpg" },
  { id: "PRODPul10", nombre: "[NOMBRE AQUÍ]", precio: "4,5", categoria: "Pulseras", coleccion: "", imagen: "./assets/images/catalogo/PRODPul10.jpg" },
  { id: "PRODCad11", nombre: "[NOMBRE AQUÍ]", precio: "7", categoria: "Cadenas", coleccion: "", imagen: "./assets/images/catalogo/PRODCad11.jpg" },
  { id: "PRODCad12", nombre: "[NOMBRE AQUÍ]", precio: "8,5", categoria: "Cadenas", coleccion: "", imagen: "./assets/images/catalogo/PRODCad12.jpg" },
  { id: "PRODRel13", nombre: "[NOMBRE AQUÍ]", precio: "10", categoria: "Relojes", coleccion: "", imagen: "./assets/images/catalogo/PRODRel13.jpg" },
  { id: "PRODLen14", nombre: "[NOMBRE AQUÍ]", precio: "18,5", categoria: "Lentes", coleccion: "", imagen: "./assets/images/catalogo/PRODLen14.jpg" },
  { id: "PRODPe15", nombre: "[NOMBRE AQUÍ]", precio: "4,5", categoria: "Peinetas", coleccion: "", imagen: "./assets/images/catalogo/PRODPe15.jpg" },
  { id: "PRODVint16", nombre: "[NOMBRE AQUÍ]", precio: "15", categoria: "Vintage", coleccion: "", imagen: "./assets/images/catalogo/PRODVint16.jpg" },
  { id: "PRODMon17", nombre: "[NOMBRE AQUÍ]", precio: "", categoria: "Monederos", coleccion: "", imagen: "./assets/images/catalogo/PRODMon17.jpg" },
  { id: "PRODPinz18", nombre: "[NOMBRE AQUÍ]", precio: "1", categoria: "Pinzas", coleccion: "", imagen: "./assets/images/catalogo/PRODPinz18.jpg" },
  { id: "PRODPinz19", nombre: "[NOMBRE AQUÍ]", precio: "1", categoria: "Pinzas", coleccion: "", imagen: "./assets/images/catalogo/PRODPinz19.jpg" }
];

// Metadatos decorativos y de presentación para cada categoría detectada en el inventario
const CATEGORIAS_METADATA = {
  "Zarcillos": {
    descripcion: "Destellos sutiles y elegantes para tu rostro",
    imagenFallback: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
  },
  "Anillos": {
    descripcion: "Sellos de elegancia, pureza y armonía",
    imagenFallback: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
  },
  "Pañoletas": {
    descripcion: "Sedas y texturas de alta distinción",
    imagenFallback: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop"
  },
  "Pulseras": {
    descripcion: "Detalles que armonizan tu energía diaria",
    imagenFallback: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"
  },
  "Collares Chicle": {
    descripcion: "Tendencia de volumen radiante y moderno",
    imagenFallback: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
  },
  "Brazaletes": {
    descripcion: "Presencia distinguida y resplandor en cada muñeca",
    imagenFallback: "https://images.unsplash.com/photo-1611591475152-473523dd66c8?q=80&w=800&auto=format&fit=crop"
  },
  "Lentes": {
    descripcion: "Mirada audaz con protección y detalles dorados",
    imagenFallback: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"
  },
  "Juegos": {
    descripcion: "Sets coordinados para celebraciones memorables",
    imagenFallback: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
  },
  "Cadenas": {
    descripcion: "Eslabones de brillo infinito y sofisticación",
    imagenFallback: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
  },
  "Relojes": {
    descripcion: "Precisión y porte que marcan tus mejores momentos",
    imagenFallback: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"
  },
  "Peinetas": {
    descripcion: "Adornos sublimes para peinados inolvidables",
    imagenFallback: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
  },
  "Vintage": {
    descripcion: "Piezas con alma clásica que trascienden el tiempo",
    imagenFallback: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"
  },
  "Monederos": {
    descripcion: "Practicidad y lujo para llevar contigo",
    imagenFallback: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"
  },
  "Pinzas": {
    descripcion: "Sujeción impecable con toques de brillo",
    imagenFallback: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800&auto=format&fit=crop"
  }
};

// Colecciones predeterminadas de la marca
const COLECCIONES_DATA = [
  {
    tag: "dia-de-las-madres",
    nombre: "Día de las Madres",
    subtitulo: "Amor eterno y gratitud celestial",
    imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    descripcion: "Detalles escogidos para homenajear a la mujer más valiosa de nuestras vidas."
  },
  {
    tag: "amor-y-amistad",
    nombre: "Amor & Amistad",
    subtitulo: "Vínculos áureos e inquebrantables",
    imagen: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
    descripcion: "Accesorios ideales para compartir complicidad, cariño y momentos compartidos."
  },
  {
    tag: "diciembre",
    nombre: "Colección Diciembre",
    subtitulo: "Brillo de prosperidad y año nuevo",
    imagen: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    descripcion: "Destellos intensos y dorados para recibir la abundancia de un nuevo ciclo."
  },
  {
    tag: "favoritos",
    nombre: "Favoritos Áurea",
    subtitulo: "Piezas más aclamadas",
    imagen: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    descripcion: "Los diseños esenciales que marcan el sello de elegancia de nuestra comunidad."
  }
];

// Helper: Extraer lista única de categorías desde el inventario real
function obtenerCategoriasUnicas() {
  const cats = [];
  productos.forEach(p => {
    if (p.categoria && !cats.includes(p.categoria)) {
      cats.push(p.categoria);
    }
  });
  return cats;
}

// Helper: Convertir precio de string a número (ej: "3,5" -> 3.5, "" -> 0)
function parsePrecio(precioStr) {
  if (precioStr === null || precioStr === undefined || precioStr === '') return 0;
  if (typeof precioStr === 'number') return precioStr;
  const limpio = String(precioStr).replace(',', '.').trim();
  const num = parseFloat(limpio);
  return isNaN(num) ? 0 : num;
}

// Helper: Formato de precio visual para catálogo y carrito
function formatearPrecio(precioStr) {
  const num = parsePrecio(precioStr);
  if (num === 0) {
    return 'Consultar';
  }
  return `$${num.toFixed(2)}`;
}
