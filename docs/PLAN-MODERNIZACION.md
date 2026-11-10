# Plan de modernización — Frontend Microlearning LSEC

> Estado inicial congelado en el tag `v-tesis` y la rama `master-legacy` (v3.1.4, noviembre de 2022).
>
> La API ya está modernizada en [`v3.0.0`](https://github.com/JonnathanE/api-microlearning-LSEC/releases/tag/v3.0.0). Los cambios de contrato están en su `CHANGELOG.md`. Las mejoras posteriores (refresh token, gamificación, etc.) están en `docs/PLAN-EVOLUCION.md` de la API y **quedan fuera de este plan**.

## Objetivos

1. Usar pnpm en lugar de npm.
2. Migrar de Create React App a Vite.
3. Configurar Docker para el proyecto.
4. Adaptar la aplicación al contrato de la API 3.0.
5. Actualizar las librerías.
6. Instalar TypeScript y migrar a este lenguaje.

## Punto de partida

- **Código:** 97 archivos JS/JSX (unas 6.500 líneas), con React 17 y Create React App, que está deprecado.
- **Tests:** 30 archivos de Jest con Testing Library (844 líneas), sobre todo de renderizado, sin simular la API. Además hay 6 specs de Cypress 9 que necesitan la API real.
- **Estilos:** Tailwind 3 con `twin.macro` en 30 archivos (36 usos) y 11 archivos CSS.
- **Hoy no funciona contra la API 3.0** (ver fase 4).

## Flujo de ramas

Igual que en la API: `develop` tiene el contenido de `master`. Cada fase se trabaja en una rama `feature/*` desde `develop`, con Conventional Commits. Al terminar se crea `release/4.0.0` y se publica el tag `v4.0.0`.

## Orden de las fases

El orden cambia un poco respecto a la lista de objetivos, porque cada fase necesita a la anterior:

| Fase | Contenido | Por qué en este orden |
|---|---|---|
| 0 | Línea base | Hay que saber qué tests pasan hoy para detectar regresiones. |
| 1 | pnpm y limpieza | No vale la pena migrar dependencias y páginas que no se usan. |
| 2 | Vite y Vitest | Create React App es lo que más bloquea. Vite define los comandos y variables que usa Docker. |
| 3 | Docker | Se configura una sola vez, ya sobre Vite. |
| 4 | Adaptación a la API 3.0 | Con la app funcionando de punta a punta, Cypress sirve de red de seguridad para lo que sigue. |
| 5 | Actualizar librerías | Es la fase más grande y riesgosa: requiere esa red de seguridad. |
| 6 | TypeScript | Es más fácil tipar sobre las APIs definitivas de las librerías. |
| 7 | Calidad y release | Cierre: Biome, CI y publicación. |

---

## Fase 0 — Línea base

- [x] Crear la rama `feature/pnpm` desde `develop`.
- [x] Ejecutar los 30 archivos de tests con Node 24 y anotar qué pasa y qué falla.
- [x] Comprobar que el build de Create React App funciona.
- [x] Levantar la API `v3.0.0` y anotar qué pantallas fallan.

### Resultado (noviembre de 2026, Node 24.22.1)

**Instalación:** `npm ci` falla porque `package-lock.json` no está sincronizado con `package.json` (npm 11 exige `@testing-library/dom` y otras dependencias que el lock no tiene). La línea base se tomó con `pnpm import`, que conserva las versiones resueltas del lock.

**Tests (Jest):** 17 de 30 suites pasan; 33 de 52 tests pasan. Los fallos ya existían y no dependen de la API:

| Causa | Suites |
|---|---|
| `lottie-web` usa `canvas`, que jsdom no implementa, y la suite no llega a ejecutarse | `LoginUser`, `SignUp` |
| `sweetalert2-react-content` falla en jsdom (`querySelector` de `null`) al abrir la alerta de error de la carga inicial, porque los tests no simulan la API, y el formulario no llega a renderizarse | `AddModules`, `AddLesson`, `AddMicrolearning`, `AddCard`, `UpdateModule`, `UpdateLesson`, `UpdateMicrolearning`, `UpdateCard`, `UpdateIcon` |
| El test espera textos o datos que no se renderizan sin la API | `LoginAdmin`, `Home` |

**Build:** `react-scripts build` compila con 13 advertencias de `react-hooks/exhaustive-deps`. Con `CI=true` falla, porque CRA convierte las advertencias en errores.

**API `v3.0.0`:** se repitieron con curl las peticiones del front, con los mismos datos. Todos los endpoints que usa responden según el contrato 3.0. Los fallos están en cómo el front maneja las respuestas:

| Pantalla | Qué falla |
|---|---|
| Todas las de administración y las de estudiante con sesión | Tras iniciar sesión, `userRequest` envía `Bearer undefined` hasta recargar la página, porque `requestMethods.js` lee el token al cargar el módulo. La API responde 401. |
| `SignUp` | Lee `data.message`, así que no muestra el error de la API. El mínimo de la contraseña ahora es 8. |
| `AddModules` y `UpdateModule` | Un duplicado ahora es 409: se muestra el mensaje genérico en lugar del de duplicado. |
| `ShowModules` y `ShowLessons` | Borrar con contenido responde 409 y se muestra un mensaje genérico. |
| `ShowLessons`, `ViewLesson`, `UpdateIcon` y `Section` | El ícono por `/lesson/icon/:id` sigue funcionando gracias a la redirección 302, pero hay que pasar a `icon_url`. |
| Cypress | `signup` con `roles` crea un estudiante, así que los specs de administración no pueden iniciar sesión como admin (403). |

## Fase 1 — pnpm y limpieza

### pnpm
- [x] `pnpm import`, borrar `package-lock.json` y fijar `packageManager`.
- [x] Declarar en `allowBuilds` los paquetes con scripts de instalación: `cypress` sí, `core-js` y `core-js-pure` no (solo muestran un mensaje).

### Código sin uso
- [x] Páginas sin ruta: `pages/LearningCapsule`, `pages/Practice` y `pages/UpdateUser`. Las rutas usan `LearningCapsuleAll` y `PracticeAll`. Conservar el historial en `v-tesis`.
- [x] `getLearnContent` y `getCards` paginados de `apiCallsUser.js`, si dejan de usarse junto con esas páginas.
- [x] `src/i18n/`, `reportWebVitals.js` y componentes sin referencias. Comprobar cada uno antes de borrarlo. Se calculó qué archivos no son alcanzables desde `src/index.js` y se borraron además `components/Navigation`, `components/NavigationAdmin` (con sus tests), `components/card/KnowledgeCard.jsx` (importaba un CSS que no existe), 5 CSS, 3 animaciones y 3 SVG sin uso.

### Dependencias a eliminar
| Paquete | Motivo |
|---|---|
| `@material-ui/core` | No se importa. Convive con `@mui/material`. |
| `css-what`, `dotenv` | No se importan. |
| `web-vitals` | Solo lo usa `reportWebVitals.js`. |
| `reactstrap` | Solo lo usa `pages/Practice`, que no tiene ruta. |

`chart.js` no se importa directamente, pero **no se elimina**: es requerido por `react-chartjs-2`.

- [x] Dependencias eliminadas. Tras la fase 1, tests y build quedan igual que en la línea base (sin las 2 suites borradas: 15 de 28 pasan).

## Fase 2 — Vite y Vitest

Node 26 en `engines` y `.nvmrc`, igual que la API.

- [ ] Instalar `vite` y `@vitejs/plugin-react`, y crear `vite.config.ts`.
- [ ] Mover `public/index.html` a la raíz y quitar `%PUBLIC_URL%`.
- [ ] Renombrar a `.jsx` todos los `.js` que contengan JSX. Vite no los procesa de otra forma.
- [ ] `REACT_APP_API_URL` → `VITE_API_URL` y `process.env` → `import.meta.env`. Solo se usa en `src/config.js`. Crear `.env.example`.
- [ ] Mantener el puerto 3000, que es el que esperan Cypress y `CORS_ORIGINS` de la API.
- [ ] `build/` → `dist/` en `.gitignore`.
- [ ] Mantener `twin.macro` temporalmente con `babel-plugin-macros` en el plugin de React, hasta eliminarlo en la fase 5.
- [ ] Migrar los tests a **Vitest** con `jsdom`: `jest.*` → `vi.*`, `setupTests.js` y `@testing-library/jest-dom/vitest`.
- [ ] Quitar `react-scripts` y `eslintConfig`.
- [ ] Metadatos heredados de la plantilla: `manifest.json` ("Create React App Sample") y la descripción de `index.html`.

**Criterio de cierre:** `pnpm dev` y `pnpm build` funcionan, y los tests pasan igual que en la línea base.

## Fase 3 — Docker

- [ ] `Dockerfile` multi-stage:
  - `dev`: Vite con todas las dependencias.
  - `build`: compila con `VITE_API_URL` como `ARG`, porque Vite lo incrusta al compilar.
  - `prod`: `nginx` sin privilegios sirviendo `dist/`, con fallback a `index.html` para las rutas del cliente, compresión y caché de los assets.
- [ ] `docker-compose.yml` con el servicio `web`, hot reload y `host: true` en Vite. La API se levanta desde su propio repositorio y se accede en `localhost:5000`.
- [ ] `.dockerignore`.
- [ ] Probar la imagen de producción: recargar una ruta interna como `/learn/progress` no debe dar 404.

**Nota:** con la imagen de producción, cambiar la URL de la API requiere recompilar.

## Fase 4 — Adaptación a la API 3.0

### Contrato

Local: `VITE_API_URL=http://localhost:5000/api` y `CORS_ORIGINS=http://localhost:3000` en la API.

| Dónde | Cambio |
|---|---|
| `SignUp` | Leer `data.error` en lugar de `data.message`. |
| `AddModules` y `UpdateModule` | Un duplicado ahora es 409, no 400. Mostrar el mensaje de la API. |
| `SignUp` y formularios de contraseña | Mínimo de 8 caracteres. |
| `ShowModules` y `ShowLessons` | Mostrar `data.error` cuando el borrado responde 409 por tener contenido. |
| `AddLesson` y similares | Quitar las comprobaciones de `data.error` en respuestas correctas: axios ya lanza una excepción ante un error. |
| Formularios con archivos | Solo PNG, JPEG, GIF y WEBP. Ícono: 1 MB. Resto: 10 MB. Mostrar el error 413. |
| `ShowLessons`, `ViewLesson`, `UpdateIcon` y `Section` | Usar `lesson.icon_url?.url` en lugar de `/lesson/icon/:id` y unificar `url_buffer` y `url` en `ShowImage`. |
| `LoginAdmin` | Mostrar el mensaje de la API. Un usuario sin rol de admin ahora responde 403. |
| Lecciones sin contenido | Comprobar el estado vacío. Con paginación, la API responde 404. |

### Autenticación centralizada
Hoy `requestMethods.js` lee el token una sola vez, al cargar el módulo, así que tras iniciar sesión puede quedar desactualizado hasta recargar. Además, cuatro pantallas pasan `auth.user.token` a mano y repiten el manejo del 401.

- [ ] Un solo cliente HTTP con un interceptor que lee el token en cada petición.
- [ ] Un interceptor que, ante un 401, cierra la sesión y redirige, reemplazando el código repetido.
- [ ] Quitar el parámetro `token` de `getCompleteLearn` y `addCompleteLearn`.
- [ ] Un único módulo de sesión para leer y guardar el token. Cuando llegue el refresh token (plan de evolución), solo cambiará este módulo.
- [ ] Sigue en `localStorage` durante este plan. La cookie llega con el plan de evolución.

### Respuestas aleatorias
Hoy `PracticeAll` siempre muestra la respuesta correcta primero.

- [ ] Mezclar las respuestas con Fisher-Yates, una vez por tarjeta (`useMemo`), para que no cambien de lugar al seleccionar.
- [ ] Es la solución inmediata. La corrección en el servidor está en el plan de evolución.

### Cypress como red de seguridad
- [ ] Actualizar a la última versión: `cypress.json` → `cypress.config.ts` e `integration/*.spec.js` → `e2e/*.cy.js`.
- [ ] `baseUrl` y `Cypress.env` en lugar de `localhost` escrito en cada spec.
- [ ] Contraseñas de 8 caracteres o más.
- [ ] **Requiere un cambio en la API:** los specs crean admins con `signup` y `roles`, que ya no funciona. Agregar a `/api/testing`, solo con `NODE_ENV=test`, un endpoint para crear admins.
- [ ] Cloudinary: decidir entre credenciales de prueba o simular la subida en el entorno de test de la API.

**Criterio de cierre:** los flujos de estudiante y administrador funcionan contra la API 3.0, y los 6 specs pasan.

## Fase 5 — Actualizar librerías

Una librería por commit, con tests y Cypress en verde entre cada una. Las versiones son las últimas disponibles en noviembre de 2026; hay que revisar su guía de migración al implementar.

| Paquete | Actual | Destino | Impacto |
|---|---|---|---|
| `react`, `react-dom` | 17 | 19 | `ReactDOM.render` → `createRoot`. `StrictMode` ejecuta efectos dos veces en desarrollo. |
| `react-router-dom` | 5 | `react-router` 8 | **68 archivos.** `Switch` → `Routes`, `Redirect` → `Navigate`, `useHistory` → `useNavigate` y guardas de ruta como componentes contenedores. |
| `react-query` | 3 | `@tanstack/react-query` 5 | **17 archivos, 57 usos.** Sintaxis de objeto, y `keepPreviousData` → `placeholderData`. |
| `tailwindcss` | 3 | 4 | `@tailwindcss/vite`, y configuración en CSS o con `@config`. Revisar el modo oscuro por clase, `@tailwindcss/forms` y los colores `bookmark-*`. |
| `twin.macro` | 2 | **Eliminar** | **30 archivos.** Reemplazar por clases de Tailwind. Quita un paso de Babel. |
| `@mui/material`, `@emotion/*` | 5 | **Eliminar** | Solo se usan `Backdrop`, `CircularProgress`, `ClickAwayListener` y `LinearProgress`, que son fáciles de reemplazar con Tailwind. |
| `yup` | 0.32 | **`zod` 4** | **15 formularios.** Igual que en la API. |
| `react-hook-form`, `@hookform/resolvers` | 7, 2 | últimas | Revisar los resolvers para zod 4. |
| `chart.js`, `react-chartjs-2` | 3, 3 | 4, 5 | Requiere registrar los componentes de forma explícita (`Chart.register`). |
| `axios` | 0.21 | última | Tiene vulnerabilidades conocidas en versiones antiguas. |
| `sweetalert2`, `sweetalert2-react-content` | 11, 4 | últimas | **25 archivos.** Conviene centralizarlo en un helper de avisos. |
| `react-icons`, `lottie-react` | 4, 2 | últimas | Bajo impacto. |
| Testing Library | 11, 12 | últimas | Bajo impacto. |

Orden sugerido: quitar `twin.macro` → Tailwind 4 → quitar MUI → React 19 → React Router → TanStack Query → zod → el resto.

## Fase 6 — TypeScript

En el frontend se puede migrar por partes, con `allowJs` activo durante la transición.

- [ ] `tsconfig.json` con `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` y `jsx: react-jsx`.
- [ ] Tipos del contrato de la API en `src/types/api.ts`: `User`, `Module`, `Lesson`, `Microlearning`, `Card`, `Asset`, `Paginated<T>` y `ApiError`.
- [ ] Migrar de abajo hacia arriba: `config` → `api` → `auth` → `hook` → `components` → `pages` → `routes`.
- [ ] Inferir los tipos de los formularios desde zod (`z.infer`).
- [ ] Migrar los tests y los specs de Cypress.
- [ ] Al terminar, `allowJs: false`: no debe quedar ningún `.js` ni `.jsx` en `src/`.

## Fase 7 — Calidad y release

- [ ] Biome con la misma configuración que la API (`pnpm lint`, `pnpm format`).
- [ ] CI en GitHub Actions: lint, `typecheck`, build y tests. Cypress necesita la API y MongoDB; evaluar si corre en cada PR o solo en `develop`.
- [ ] Carga diferida de las rutas de administración con `React.lazy`, para reducir el bundle inicial.
- [ ] Quitar los `console.log` que quedan (5 archivos).
- [ ] Corregir nombres con errores: `UpsateLesson.test.js`, `UserDropsown.jsx`, etc.
- [ ] README: requisitos, Docker, pnpm y variables. Sección "About this version" con enlaces a `master-legacy` y `v-tesis`. **Quitar el enlace a la demo**, igual que en la API.
- [ ] `release/4.0.0`, tag `v4.0.0` y GitHub Releases para `v4.0.0` y `v-tesis`.

## Decisiones a confirmar

| Tema | Recomendación | Alternativa |
|---|---|---|
| E2E | Mantener Cypress, porque ya hay 6 specs | Migrar a Playwright |
| Avisos (`sweetalert2`) | Mantenerlo y centralizarlo | Reemplazarlo por un sistema propio de toasts |
| Estructura | Mantener `pages` y `components` en este plan | Organizar por funcionalidad, cuando la API pase a módulos |

## Criterios de terminado

- `docker compose up` levanta el frontend sin pasos manuales, salvo crear el `.env`.
- `pnpm test`, `pnpm typecheck`, `pnpm lint` y `pnpm build` pasan en local y en CI.
- Los specs de Cypress pasan contra la API `v3.0.0` (más el endpoint de testing).
- No hay vulnerabilidades altas en `pnpm audit`.
- El README está actualizado y sin el enlace a la demo.
