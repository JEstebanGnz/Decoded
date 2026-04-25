# Decoded — Progress Log

## Stack
- Backend: Node.js + Express + TypeScript
- Frontend: Next.js + TypeScript + Tailwind v4
- Auth: Google OAuth con next-auth ✅
- AI: Claude API — Haiku ✅
- DB: PostgreSQL con Prisma 5

## Estado actual del backend
- ✅ Express configurado con CORS y dotenv
- ✅ Arquitectura por capas (routes, controllers, services, repositories)
- ✅ Prisma conectado a PostgreSQL
- ✅ Modelos: User, Partner, CycleEntry (con enum CyclePhase)
- ✅ POST /api/partners — crea partner en DB
- ✅ GET /api/partners/:id — obtiene partner
- ✅ POST /api/cycles — registra ciclo y calcula fase automáticamente
- ✅ GET /api/cycles/:partnerId/status — retorna fase actual + descripción + día
- ✅ GET /api/recommendations/:partnerId — genera 2 recomendaciones con Claude Haiku

## Estado actual del frontend
- ✅ Next.js configurado con TypeScript y Tailwind v4
- ✅ Design system definido (paleta pastel elegante, mobile-first)
- ✅ Dashboard con fase actual y recomendaciones
- ✅ Consumo de Claude API desde el frontend
- ✅ Variables de entorno con NEXT_PUBLIC_API_URL

- ✅ Google OAuth configurado con next-auth
- ✅ JWT guardado en cookie automáticamente
- ✅ Middleware de protección de rutas
- ✅ Página de login
- ✅ Sesión del usuario disponible en el frontend

- ✅ Middleware de autenticación en Express
- ✅ JWT generado en Next.js y verificado en Express
- ✅ req.user disponible en todos los controllers
- ✅ Rutas protegidas con authenticate

- ✅ /partner/new — crear perfil
- ✅ /cycle/new — registrar ciclo
- ✅ Dashboard con fase real y recomendaciones
- ✅ Flujo completo: login → partner → ciclo → recomendaciones

- ✅ Signout — botón para cerrar sesión
- ✅ AppHeader — componente separado con sesión y signout
- ✅ /partner/edit — editar perfil del partner
- ✅ Proteger /partner/new, /partner/edit y /cycle/new en middleware
- ✅ PartnerForm — componente reutilizable (new y edit comparten el mismo form)
- ✅ UI general pulida — jerarquía tipográfica, cards con footer, design system consistente

- ✅ UI general pulida — login, dashboard, partner/new, partner/edit, cycle/new
- ✅ PageHeader — componente reutilizable para páginas internas
- ✅ Design system consistente — inputs, botones, cards, border-radius unificados


## Conceptos aprendidos
- JavaScript: filter, map, some, reduce, destructuring, spread, ?., ??
- JavaScript: clases, herencia, super, prototype
- TypeScript: interfaces, tipos literales, Omit, Pick, Partial, Record
- TypeScript: modificadores de acceso, generics básicos (Promise<T>)
- Node.js: async/await, manejo de errores, closures
- Express: routes, controllers, middleware, CORS
- Prisma: schema, migraciones, queries, enums
- Arquitectura: Clean Architecture por capas
- Git: commits, push, pull
- Anthropic SDK: messages.create, roles (system, user, assistant), tokens, modelos
- TypeScript: type assertions, narrowing, tipos de Prisma
- Prompt engineering: separación system/user, formato de respuesta
- Next.js: App Router, Server vs Client Components, "use client"
- React: useState, hooks, re-rendering, event handlers
- CSS: Mobile-first, breakpoints, jerarquía visual
- Tailwind v4: @theme, tokens personalizados
- Fetch API: peticiones HTTP desde el navegador
- Env vars: NEXT_PUBLIC_ en Next.js
- DB: seeding con Prisma, upsert
- PostgreSQL: instalación con Homebrew, configuración local
- Next.js: middleware con withAuth, matcher de rutas protegidas
- React: extracción de componentes reutilizables, separación de responsabilidades
- Diseño: jerarquía visual, consistencia de design system, mobile-first polish
- next-auth: signOut, status de sesión, callbackUrl
- REST: diferencia semántica entre PATCH y PUT
- Arquitectura: DRY principle aplicado a formularios
- React: extracción de componentes reutilizables (PageHeader, PartnerForm)
- CSS: consistencia visual con constantes de clases (inputClass, labelClass)
- Diseño: sistema de componentes coherente, mismo lenguaje visual en toda la app

## Estructura del proyecto
decoded/
├── frontend/
│   └── src/
│       ├── app/ — page.tsx, login/page.tsx, partner/new/page.tsx, cycle/new/page.tsx
│       ├── app/api/auth/ — [...nextauth]/route.ts, token/route.ts
│       ├── components/ — Providers.tsx, TagInput.tsx
│       ├── lib/ — api.ts
│       ├── middleware.ts
│       └── types/ — next-auth.d.ts
└── backend/
    └── src/
        ├── controllers/ — PartnerController, CycleEntryController, RecommendationController, UserController
        ├── services/ — PartnerService, CycleEntryService, CycleService, RecommendationService
        ├── repositories/ — PartnerRepository, CycleEntryRepository
        ├── routes/ — partnerRoutes, cycleEntryRoutes, recommendationRoutes, userRoutes
        ├── middlewares/ — authenticate.ts
        ├── types/ — express.d.ts
        └── lib/ — prisma.ts


## Próximos pasos
- [ ] Signout — botón para cerrar sesión
- [ ] /partner/edit — editar perfil del partner
- [ ] Proteger /partner/new y /cycle/new en el middleware de Next.js
- [ ] Pulir UI general