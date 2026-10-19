# ✨ Áurea Accesorios — Tienda Web Oficial (SPA)

Bienvenido al repositorio de la tienda online de **Áurea Accesorios**, marca de joyería y accesorios de alta distinción que evoca armonía, elegancia, y prosperidad material y espiritual.

> **Tienda 100% online con envíos a nivel nacional desde Mérida, Venezuela.**

---

## 🎨 Paleta de Colores de la Marca (Tailwind CSS)

El proyecto cuenta con la paleta de colores personalizada configurada en Tailwind:

| Color | Código Hex | Uso Principal |
| :--- | :--- | :--- |
| **Negro** | `#090909` | Textos principales, contrastes fuertes, botones de acción |
| **Crema Oscuro** | `#ab8b6e` | Acentos dorados, títulos de sección, detalles de orfebrería |
| **Crema** | `#b4a28d` | Bordes suaves, divisores y elementos secundarios |
| **Crema Claro** | `#dfd8cf` | Fondos de secciones destacadas y píldoras |
| **Gris** | `#e8e5e0` | Fondo general de la página y tarjetas |

---

## 📁 Estructura del Proyecto

```plaintext
Áurea/
├── index.html            # Estructura semántica, Hero, Navbar, Secciones y Drawer del Carrito
├── netlify.toml          # Configuración de headers y publicación para Netlify
├── tailwind.config.js    # Configuración de Tailwind CSS con paleta y fuentes
├── css/
│   └── styles.css        # Tipografías de lujo (Cormorant Garamond, Montserrat), efectos de brillo y animaciones
├── js/
│   ├── products.js       # Base de datos simulada (categorías, colecciones y productos con tags)
│   └── app.js            # Lógica del Carrito (LocalStorage), WhatsApp API, filtros dinámicos y eventos
└── README.md             # Guía de instalación, personalización y despliegue
```

---

## 💎 Características Principales

1. **Barra de Navegación (Navbar):**
   - Logo y nombre centrado con tipografía de lujo.
   - Enlaces: Inicio, Categorías, Colecciones, Oro nacional y 18k (con badge visual brillante *"Próximamente"*), Nosotros.
   - Menú hamburguesa responsive para dispositivos móviles.
   - Botón de carrito con indicador dinámico de cantidad.

2. **Hero Section:**
   - Visuales de alta resolución y elegancia.
   - Subtítulo destacado: *"Tienda 100% online. Envíos a nivel nacional desde Mérida, Venezuela"*.
   - Botón Call-to-Action (CTA): *"Ver Catálogo"*.

3. **Compra por Categoría:**
   - Cuadrícula con tarjetas visuales minimalistas para las 14 categorías solicitadas:
     - Anillos
     - Zarcillos
     - Cadenas con dijes
     - Cadenas sin dijes
     - Earcuff
     - Termos
     - Reloj deportivo
     - Reloj vintage
     - Brazaletes
     - Pulseras
     - Pañoletas
     - Collares Chicle
     - Monederos
     - Lentes
   - Al pulsar cualquier categoría, filtra automáticamente el catálogo y realiza un scroll suave hacia él.

4. **Colecciones Especiales (Tag-based):**
   - Espacio para colecciones temporales: *Día de la Madre*, *Amor y Amistad*, *Diciembre*, *Favoritos Áurea*.
   - Los productos poseen una categoría base y etiquetas (`tags`), permitiendo que aparezcan en múltiples colecciones **sin duplicar el inventario** en el código.

5. **Línea "Oro Nacional y 18k" (Próximamente):**
   - Espacio exclusivo que presenta la visión de orfebrería fina con opción para que los clientes se anoten a la lista VIP por WhatsApp.

6. **Acerca de Nosotros:**
   - Filosofía sobre la proporción áurea, armonía, prosperidad espiritual y material, y el origen en Mérida, Venezuela.

7. **Footer Completo:**
   - Horarios de atención al cliente, canales de contacto, redes sociales (Instagram, TikTok) e información de envíos nacionales (MRW, Zoom, Tealca, Domesa).

8. **Carrito de Compras y Pedidos por WhatsApp:**
   - Estado persistente en el navegador mediante **LocalStorage**.
   - Contador en tiempo real, sumatoria automática de precios.
   - Al presionar **"Finalizar Pedido por WhatsApp"**, genera un mensaje preformateado y codificado que se abre en WhatsApp (`wa.me`) con el detalle de los productos, cantidades, total en USD y datos de despacho.
   - **Botón Flotante (FAB)** permanente de WhatsApp en la esquina inferior derecha con efecto pulsante.

---

## ⚙️ Cómo Personalizar

### 1. Cambiar tu número de WhatsApp
Abre el archivo `js/app.js` y localiza las primeras líneas:
```javascript
const CONFIG = {
  // Número oficial de Áurea Accesorios (Venezuela: 584220213291)
  WHATSAPP_NUMBER: '584220213291', 
  BRAND_NAME: 'Áurea Accesorios',
  ...
};
```

### 2. Agregar o editar productos
Abre el archivo `js/products.js` y edita o agrega objetos en el arreglo `PRODUCTS_DATA`:
```javascript
{
  id: 21,
  name: 'Nuevo Anillo Esmeralda Imperial',
  category: 'anillos',
  categoryName: 'Anillos',
  price: 28.00,
  image: 'https://images.unsplash.com/...',
  description: 'Bañado en oro con piedra de refracción verde esperanza.',
  tags: ['dia-de-las-madres', 'bestsellers'], // Colecciones en las que participará
  isFeatured: true,
  isNew: true,
  inStock: true
}
```

---

## 🚀 Despliegue en GitHub y Netlify

### Opción A: Subir a GitHub
1. Inicializa tu repositorio Git en la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Áurea Accesorios SPA"
   ```
2. Crea un repositorio en [GitHub](https://github.com/new).
3. Conecta y sube los cambios:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/aurea-accesorios.git
   git branch -M main
   git push -u origin main
   ```

### Opción B: Despliegue Continuo en Netlify
1. Inicia sesión en [Netlify](https://app.netlify.com).
2. Selecciona **"Add new site" > "Import an existing project"**.
3. Conecta tu cuenta de GitHub y elige el repositorio `aurea-accesorios`.
4. En la configuración de Build:
   - **Build command:** *(dejar en blanco)*
   - **Publish directory:** `.` (o dejar en blanco, `netlify.toml` ya lo define automáticamente)
5. Haz clic en **"Deploy Site"**. En segundos tu tienda estará activa con HTTPS gratuito y CDN mundial.

---

Diseñado con pasión y devoción al detalle para **Áurea Accesorios**. ✨
