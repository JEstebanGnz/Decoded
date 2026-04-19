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

## Próximo paso
Integrar Claude API (Haiku) para generar recomendaciones personalizadas basadas en:
- Fase actual del ciclo
- Likes y dislikes de la pareja
- Edad y notas del perfil

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