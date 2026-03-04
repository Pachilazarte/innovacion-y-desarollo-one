# ONE Innovation & Development Platform

## Estructura de Archivos

```
one-platform/
├── index.html              ← Página de inicio con catálogo público
├── css/
│   └── styles.css          ← Todos los estilos (compartidos)
├── js/
│   ├── brand-config.js     ← Configuración de marca (NO MODIFICAR)
│   ├── supabase-service.js ← Servicio de Supabase (NO MODIFICAR)
│   └── shared.js           ← Utilidades compartidas
├── pages/
│   ├── login.html          ← Pantalla de login (redirige según rol)
│   ├── superadmin.html     ← Panel SuperAdmin
│   ├── admin.html          ← Panel Administrador
│   └── usuario.html        ← Panel Usuario Demo
└── assets/                 ← Carpeta de imágenes (agregar tus assets)
```

## Instrucciones

1. Copiá tu carpeta `assets/` existente dentro de `one-platform/`
2. Abrí `index.html` en un servidor local (Live Server, etc.)
3. El catálogo carga todos los proyectos de la base de datos
4. El botón "Ingresar" lleva a la pantalla de login
5. Según el rol, se redirige al panel correspondiente

## Archivos NO modificables
- `js/brand-config.js` - Configuración de marca y Supabase
- `js/supabase-service.js` - Servicio de base de datos
