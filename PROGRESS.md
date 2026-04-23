# Decoded — Progress Log

## Stack
- Backend: Node.js + Express + TypeScript
- Frontend: Next.js (pendiente)
- DB: PostgreSQL con Prisma 5
- Auth: Google OAuth (pendiente)
- AI: Claude API — Haiku (próximo paso)

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

## Estructura del proyecto
decoded/
├── frontend/ (pendiente)
└── backend/
    └── src/
        ├── controllers/ — PartnerController, CycleEntryController
        ├── services/ — PartnerService, CycleEntryService, CycleService
        ├── repositories/ — PartnerRepository, CycleEntryRepository
        ├── routes/ — partnerRoutes, cycleEntryRoutes
        └── lib/ — prisma.ts