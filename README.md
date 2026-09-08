# Control de Programación y Seguimiento Administrativo (`Administracion-Control-CRM`)

Micro-frontend de **control administrativo, seguimiento de órdenes de trabajo, facturación y estados de despacho** para el CRM de **Geofal**, construido sobre **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS v4**.

---

## 🎯 1. Propósito y Funcionalidad

`Administracion-Control-CRM` proporciona a la gerencia administrativa y personal de facturación una vista consolidada en tiempo real de los servicios y ensayos geomecánicos en curso:

- **Monitoreo Administrativo de Servicios**: Supervisión de fechas de entrega, autorizaciones de salida, estados de pago y emisión de comprobantes fiscales.
- **Grilla Interactiva Virtualizada**: Implementada con `@tanstack/react-virtual` y `@tanstack/react-table`, permitiendo navegación fluida sobre miles de registros históricos sin pérdida de rendimiento.
- **Modal de Comentarios "Ghost-Row"**: Sistema de notas rápidas y observaciones operativas por fila para coordinación interna entre administración y laboratorio.
- **Paginación Robusta**: Implementa un bucle de consultas paginadas que supera la restricción estándar de 1000 filas de PostgREST.
- **Puerto Dedicado (`8475`)**: Configurado de forma aislada para operar en paralelo con otros micro-frontends del ecosistema sin conflictos de puertos.

---

## 💻 2. Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| **Framework** | Next.js 16.1.6 (App Router) | Servidor optimizado con Turbopack |
| **Biblioteca UI** | React 19.2.3 | Componentes reactivos de última generación |
| **Virtualización** | TanStack React Virtual v3 | Renderizado eficiente de celdas y filas |
| **Manejo de Tablas** | TanStack Table v8 | Paginación, ordenamiento y edición masiva |
| **Cache & Estado** | TanStack React Query v5 | Mutaciones asíncronas con revalidación en segundo plano |
| **Estilizado** | Tailwind CSS v4 | Diseño moderno con paletas de grises corporativos |
| **Base de Datos & Auth** | Supabase Client v2 | Comunicación directa con PostgreSQL |
| **Notificaciones** | Sonner | Avisos de estado de sincronización y errores |

---

## 📁 3. Estructura del Proyecto

```
Administracion-Control-CRM/
├── src/
│   ├── app/                            # App Router de Next.js
│   │   ├── layout.tsx                  # Layout con QueryClient y Toaster
│   │   ├── page.tsx                    # Página principal con DatagridEditor
│   │   └── globals.css                 # Estilos globales y tokens Tailwind v4
│   ├── components/
│   │   ├── DatagridEditor.tsx          # Grilla de administración interactiva
│   │   ├── fixed-programacion-editor.tsx # Editor alternativo de programación fija
│   │   ├── datagrid/                   # Celdas editables, toolbars y filtros
│   │   ├── login-button.tsx            # Autenticación con Supabase
│   │   └── providers.tsx               # Context Providers globales
│   ├── hooks/                          # Hooks de fetching y mutaciones
│   ├── lib/                            # Conexión a Supabase y helpers
│   ├── services/                       # Servicios de consulta a base de datos
│   └── types/                          # Interfaces y tipos TypeScript
├── Dockerfile                          # Build multi-stage para producción
├── package.json                        # Scripts configurados con --port 8475
└── tsconfig.json                       # Configuración de compilación TypeScript
```

---

## ⚙️ 4. Instalación y Ejecución Local

### Prerrequisitos
- Node.js v20 o v22 instalado
- npm v10 o superior

### Pasos
```bash
# 1. Ingresar al directorio
cd Administracion-Control-CRM

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo en puerto 8475
npm run dev
```
La grilla de administración estará accesible en: `http://localhost:8475`.

### Variables de Entorno (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://db.geofal.com.pe
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

---

## 🐳 5. Despliegue en Producción (Docker / Coolify)

```bash
# Construir imagen Docker
docker build -t administracion-control-crm \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://db.geofal.com.pe \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key \
  .

# Ejecutar contenedor
docker run -d -p 8475:8475 --name administracion-control-crm administracion-control-crm
```
En **Coolify**, el servicio se encuentra mapeado hacia `https://admin.geofal.com.pe` con balanceo y certificados SSL administrados por Traefik.
