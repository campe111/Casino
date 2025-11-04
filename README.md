# 🎰 KING OF COINS CASINO

Aplicación web de casino desarrollada con React y TypeScript, que incluye múltiples juegos: Bingo, Blackjack, y Tragamonedas (Slots STD y Premium).

## 🎮 Juegos Disponibles

- **🎲 Bingo**: Juego de cartón con números aleatorios
- **🃏 Blackjack**: Juego de cartas contra el crupier
- **🎰 Slots STD**: Tragamonedas estándar
- **🎰 Slots Premium**: Tragamonedas premium con premios mejorados

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/campe111/Casino.git

# Navegar al directorio
cd Casino

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 🏗️ Estructura del Proyecto

```
Casino/
├── src/
│   ├── components/          # Componentes React
│   │   ├── juegos/         # Componentes de juegos
│   │   ├── AccesoUsuario.tsx
│   │   ├── GestionBilletera.tsx
│   │   ├── InfoUsuario.tsx
│   │   ├── Instrucciones.tsx
│   │   ├── MenuJuegos.tsx
│   │   ├── MenuPrincipal.tsx
│   │   └── RegistroUsuario.tsx
│   ├── models/             # Modelos de datos (lógica de negocio)
│   │   ├── Billetera.ts
│   │   ├── Bingo.ts
│   │   ├── BlackJack.ts
│   │   ├── Casino.ts
│   │   ├── Juego.ts
│   │   ├── SlotsPrem.ts
│   │   ├── SlotsSTD.ts
│   │   └── Usuario.ts
│   ├── services/           # Servicios (API, etc.)
│   │   └── api.ts
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos globales
│   └── main.tsx            # Punto de entrada
├── .env.example            # Ejemplo de variables de entorno
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
└── package.json
```

## 🎯 Funcionalidades

### Gestión de Usuarios
- Registro de nuevos usuarios
- Acceso con nombre de usuario
- Validación de edad (mínimo 18 años)
- Información del usuario

### Gestión de Billetera
- Carga de saldo inicial
- Actualización de saldo
- Validación de saldo suficiente para apuestas

### Sistema de Juegos
- Apuestas configurables por juego
- Mantenimiento de apuesta entre rondas
- Cálculo automático de ganancias y pérdidas
- Visualización de resultados en tiempo real

## 🔧 Configuración

### Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STORAGE_MODE=localStorage
VITE_APP_NAME=KING OF COINS CASINO
VITE_APP_VERSION=1.0.0
```

### Modos de Almacenamiento

- **localStorage**: Almacenamiento local en el navegador (solo desarrollo)
- **api**: Comunicación con backend API (requiere backend configurado)

## 🧪 Testing

Actualmente el proyecto no incluye tests. Para producción, se recomienda:

```bash
# Instalar dependencias de testing
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Ejecutar tests
npm run test
```

## 📊 Preparación para Producción

### Estado Actual

✅ **Completado:**
- Lógica de juegos funcional
- Interfaz de usuario completa
- Validaciones de formularios
- Sin errores de linter

⚠️ **Pendiente para Producción:**
- Backend API
- Base de datos
- Autenticación
- Persistencia de datos
- Testing

### Pasos para Producción

Ver el archivo `PRODUCTION_CHECKLIST.md` para una lista completa de tareas pendientes.

**Resumen rápido:**
1. Crear backend API (Node.js/Express, Python/FastAPI, etc.)
2. Configurar base de datos (PostgreSQL recomendado)
3. Implementar autenticación
4. Integrar frontend con backend
5. Configurar hosting (Vercel, Railway, Render, etc.)
6. Implementar tests
7. Configurar monitoreo

## 🗄️ Base de Datos

Para información detallada sobre el esquema de base de datos recomendado, consulta `DATABASE_SCHEMA.md`.

**Resumen:**
- PostgreSQL o MySQL recomendados
- Tablas: `usuarios`, `juegos`, `apuestas`, `sesiones`, `transacciones_saldo`
- Esquema Prisma disponible

## 🛠️ Tecnologías Utilizadas

- **React 18**: Librería de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **CSS3**: Estilos con variables CSS y responsive design

## 👥 Autores

- Brian Ocampos
- Thomas Echeverria
- Celeste Ruspil
- Wanda Hernandez
- Marina Briceño

## 📝 Licencia

ISC

## 🐛 Reportar Problemas

Si encuentras algún problema, por favor abre un issue en el repositorio de GitHub.

## 📚 Documentación Adicional

- `DATABASE_SCHEMA.md`: Esquema de base de datos
- `PRODUCTION_CHECKLIST.md`: Checklist completo para producción
- `.env.example`: Variables de entorno disponibles

## 🔐 Seguridad

**Nota importante:** Esta aplicación está diseñada para aprendizaje y desarrollo. Para uso en producción, se deben implementar:

- Autenticación robusta
- Validación de datos en backend
- Protección contra inyecciones SQL
- Rate limiting
- HTTPS obligatorio
- Validación de edad en backend
- Auditoría de transacciones

---

**¡Disfruta jugando! 🎲🎰🃏**

