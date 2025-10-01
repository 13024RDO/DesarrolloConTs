# Formotex - Backend (Inventario de Equipos) - TypeScript

## Requisitos
- Node.js >= 16
- MongoDB (Atlas o local)
- npm

## Instalación
1. Clona el repo
2. `npm install`
3. Crear archivo `.env` basado en `.env.example`
4. Ejecutar seed para crear admin inicial:
   - `npm run seed`
5. En desarrollo:
   - `npm run dev`

## Variables de entorno
- PORT
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- ADMIN_EMAIL
- ADMIN_PASSWORD

## Endpoints
### Auth
- `POST /api/auth/login` -> body `{ email, password }` → devuelve `{ token }`
- `POST /api/auth/register` -> protegido (admin) -> crea usuarios

### Equipment (protegidos)
- `GET /api/equipment` -> admin: todos; user: solo asignados
- `POST /api/equipment` -> admin crea equipo
- `GET /api/equipment/:id`
- `PUT /api/equipment/:id` -> admin o responsable (según tu política)
- `DELETE /api/equipment/:id` -> admin

## Justificación técnica
- **Relaciones**: `Equipment.assignedTo` referencia a `User` (1:N entre User y Equipment).
- **Organización**: routers -> controllers -> services -> models para separar responsabilidades.
- **Validaciones**: express-validator para validar inputs y evitar datos sucios.
- **JWT**: tokens con `id` y `role` para autorización basada en roles.
- **Unicidad**: indices únicos en `email`, `serialNumber`, `assetTag` (sparse).
- **Errores**: middleware global captura errores y responde consistentemente.
