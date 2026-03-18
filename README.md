# Silverline - Frontend

> Aplicación web de comercio electrónico para venta de MacBooks reacondicionados.

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-cyan.svg)](https://tailwindcss.com/)

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Arquitectura](#arquitectura)
- [Páginas y Componentes](#páginas-y-componentes)
- [Servicios y Utilidades](#servicios-y-utilidades)
- [Autenticación](#autenticación)
- [Estilos](#estilos)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribución](#contribución)

---

## Descripción

**Silverline Frontend** es la aplicación web del proyecto de e-commerce Silverline, especializada en la venta de MacBooks reacondicionados. Proporciona una interfaz de usuario moderna y responsiva para:

- Navegación y búsqueda de productos
- Carrito de compras
- Proceso de checkout
- Gestión de cuenta de usuario
- Historial de pedidos

---

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.x | Biblioteca de interfaz de usuario |
| Vite | 7.x | Build tool y servidor de desarrollo |
| React Router | 7.x | Enrutamiento de páginas |
| Tailwind CSS | 4.x | Framework de estilos |

---

## Estructura del Proyecto

```
FrontEnd/
├── public/                    # Recursos estáticos públicos
├── src/
│   ├── components/
│   │   ├── cart/             # Componentes del carrito
│   │   │   └── CartDropdown.jsx
│   │   ├── home/             # Componentes de la página home
│   │   │   ├── HeroSection.jsx
│   │   │   ├── SiteHeader.jsx
│   │   │   ├── SiteFooter.jsx
│   │   │   ├── TrendingProductsSection.jsx
│   │   │   └── WhySilverLineSection.jsx
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── SiteHeader.jsx
│   │   │   └── SiteFooter.jsx
│   │   ├── product/         # Componentes de productos
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductGrid.jsx
│   │   └── ui/              # Componentes UI reutilizables
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── BrandMark.jsx
│   │       ├── FeedBackMessage.jsx
│   │       └── FieldLabel.jsx
│   ├── lib/                  # Utilidades y servicios
│   │   ├── api.js            # Cliente HTTP
│   │   ├── auth.js           # Gestión de autenticación
│   │   └── media.js          # Utilidades de medios
│   ├── pages/                # Páginas de la aplicación
│   │   ├── Home.jsx          # Página principal
│   │   ├── Catalogo.jsx      # Catálogo de productos
│   │   ├── Detalle.jsx       # Detalle de producto
│   │   ├── Carrito.jsx       # Carrito de compras
│   │   ├── Login.jsx         # Inicio de sesión
│   │   ├── Registro.jsx      # Registro de usuario
│   │   └── Checkout.jsx      # Proceso de compra
│   ├── App.jsx               # Componente raíz con rutas
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── index.html                 # HTML principal
├── vite.config.js            # Configuración de Vite
├── tailwind.config.js        # Configuración de Tailwind
├── eslint.config.js           # Configuración de ESLint
└── package.json              # Dependencias y scripts
```

---

## Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- Backend API ejecutándose en puerto 3000

---

## Instalación

```bash
cd FrontEnd
npm install
```

---

## Configuración

### Variables de Entorno

Crear archivo `.env` en `FrontEnd/`:

```env
# URL de la API backend
VITE_API_URL=http://localhost:3000/api
```

### Configuración de Vite

El archivo `vite.config.js` contiene la configuración del servidor de desarrollo:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})
```

---

## Ejecución

### Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en: `http://localhost:5173`

### Producción

```bash
# Build
npm run build

# Preview del build
npm run preview
```

---

## Arquitectura

### Patrón de Componentes

La aplicación sigue una arquitectura de componentes con React:

```
App.jsx
  ├── Routes
  │     ├── Home
  │     ├── Catalogo
  │     ├── Detalle
  │     ├── Carrito
  │     ├── Login
  │     ├── Registro
  │     └── Checkout
  │
  └── Components (reutilizables)
        ├── home/
        ├── cart/
        ├── product/
        ├── layout/
        └── ui/
```

### Flujo de Datos

```
Usuario → Página → apiFetch (lib/api.js) → API Backend
                ↓
         auth.js (localStorage)
                ↓
         Manejo de estado React
```

---

## Páginas y Componentes

### Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Home | `/` | Página principal con productos destacados |
| Catálogo | `/catalogo` | Listado de todos los productos con filtros |
| Detalle | `/detalle/:id` | Información detallada de un producto |
| Carrito | `/carrito` | Carrito de compras |
| Login | `/login` | Formulario de inicio de sesión |
| Registro | `/registro` | Formulario de registro |
| Checkout | `/checkout` | Proceso de compra |

### Componentes UI

| Componente | Descripción |
|------------|-------------|
| `Button` | Botón reutilizable con variantes |
| `Card` | Contenedor con estilo de tarjeta |
| `BrandMark` | Logo de la marca |
| `FeedBackMessage` | Mensajes de feedback al usuario |
| `FieldLabel` | Etiquetas para formularios |

### Componentes de Producto

| Componente | Descripción |
|------------|-------------|
| `ProductCard` | Tarjeta individual de producto |
| `ProductGrid` | Grid de productos |

### Componentes de Carrito

| Componente | Descripción |
|------------|-------------|
| `CartDropdown` | Dropdown con contenido del carrito |

---

## Servicios y Utilidades

### API Client (`lib/api.js`)

Cliente HTTP basado en fetch con soporte para autenticación.

**Funciones:**

```javascript
import { apiFetch } from './lib/api';

// Petición GET simple
const productos = await apiFetch('/api/productos');

// Petición con autenticación
const carrito = await apiFetch('/api/carrito', { auth: true });

// Petición POST con body
await apiFetch('/api/carrito/items', {
  method: 'POST',
  body: { productoId: 'xxx', cantidad: 2 },
  auth: true
});
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `ruta` | string | Ruta de la API |
| `informacion.method` | string | Método HTTP (GET, POST, PUT, DELETE) |
| `informacion.body` | object | Body de la petición |
| `informacion.auth` | boolean | Añadir token de autenticación |
| `informacion.token` | string | Token manual |
| `informacion.headers` | object | Headers adicionales |

---

### Autenticación (`lib/auth.js`)

Utilidades para gestionar autenticación con localStorage.

**Funciones:**

```javascript
import {
  getAuthToken,     // Obtener token
  getAuthUser,      // Obtener usuario
  setAuthToken,     // Guardar token
  setAuthUser,      // Guardar usuario
  clearAuth         // Cerrar sesión
} from './lib/auth';

// Obtener token
const token = getAuthToken();

// Iniciar sesión
setAuthToken(nuevoToken);
setAuthUser(usuario);

// Cerrar sesión
clearAuth();
```

**Claves de localStorage:**

| Clave | Descripción |
|-------|-------------|
| `authTok` | Token de acceso JWT |
| `authUser` | Objeto del usuario |

---

### Media (`lib/media.js`)

Utilidades para gestionar imágenes y medios.

```javascript
import { getProductoImageUrl } from './lib/media';

const url = getProductoImageUrl(producto);
```

---

## Autenticación

### Flujo de Login

```
1. Usuario introduce email y contraseña
2. POST /api/usuarios/login
3. Backend retorna { token, refreshToken, user }
4. Frontend guarda en localStorage:
   - token → 'authTok'
   - user → 'authUser'
5. Redireccionar a página principal
```

### Rutas Protegidas

El frontend controla el acceso a rutas según el estado de autenticación:

- **Públicas**: Home, Catálogo, Detalle, Login, Registro
- **Requiere auth**: Carrito, Checkout, Mis Pedidos

### Manejo de Token Expirado

Cuando el token expira:

1. API retorna error 401
2. Frontend puede usar refresh token
3. O redireccionar a login

---

## Estilos

### Tailwind CSS

La aplicación usa Tailwind CSS v4 para estilos:

```jsx
// Ejemplo de uso de clases Tailwind
<div className="min-h-screen bg-white text-slate-900">
  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>
```

### Estilos Globales

El archivo `index.css` contiene:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Personalizaciones adicionales */
```

---

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API | http://localhost:3000/api |

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run preview` | Preview del build |

---

## Contribución

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/Nombre`
3. Commit: `git commit -m 'Add: Descripción'`
4. Push: `git push origin feature/Nombre`
5. Pull Request

### Convenciones de Commits

```
Add:    Nueva funcionalidad
Fix:    Corrección de bug
Update: Actualización de código existente
Refactor: Refactorización sin cambios funcionales
Docs:   Cambios en documentación
Style:  Cambios de formato/estilo
```

---

## Troubleshooting

### Error: "Connection refused" al API

**Causa**: Backend no está ejecutándose.

**Solución**: Iniciar el servidor backend en puerto 3000.

### Error: CORS

**Causa**: Backend no permite solicitudes desde el puerto del frontend.

**Solución**: Verificar `CORS_ORIGIN` en backend/.env.

### Error: "Token expired"

**Causa**: El token de acceso ha expirado.

**Solución**: Iniciar sesión de nuevo.

---

## Integración con Backend

El frontend se comunica con el backend a través de la API REST. Asegúrate de que:

1. Backend está ejecutándose en puerto 3000
2. La variable `VITE_API_URL` apunta a la URL correcta
3. MongoDB está ejecutándose y la base de datos tiene datos

### Endpoints Utilizados

| Método | Endpoint | Propósito |
|--------|----------|-----------|
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Detalle producto |
| POST | `/api/usuarios/login` | Iniciar sesión |
| POST | `/api/usuarios/registrar` | Registrar usuario |
| GET | `/api/carrito` | Obtener carrito |
| POST | `/api/carrito/items` | Añadir al carrito |
| DELETE | `/api/carrito/items/:id` | Quitar del carrito |
| POST | `/api/pedidos/checkout` | Finalizar compra |
| GET | `/api/pedidos/mis-pedidos` | Historial pedidos |

---

## Licencia

Este proyecto está bajo la licencia MIT.

---

*Última actualización: Marzo 2026*
