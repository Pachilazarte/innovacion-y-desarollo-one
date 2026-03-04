/**
 * ONE Innovation & Development Platform
 * Brand Configuration & Asset Management
 * ==========================================
 */

const BRAND_CONFIG = {
    name: 'ONE',
    fullName: 'ONE Innovation & Development',
    tagline: 'Innovación y Desarrollo',

    // ==========================================
    // RUTAS DE ASSETS
    // ==========================================
    assets: {
        basePath: './assets',
        logos: {
            mainColor: './assets/one-logocolor.png',
            mainDark: './assets/one-logonegro.png',
            squareColor: './assets/one-cuadradocolor.png',
        },
        escencial: {
            logoWhite: './assets/escencial-logoblanco.png',
        },
        backgrounds: {
            small: './assets/one-fondochicocolor.jpg',
            large: './assets/one-fondograndecolor.jpg',
        },
        icons: {
            favicon: './assets/favicon.png',
            appColor: './assets/one-iconocolor.png',
            appDark: './assets/one-icononegro.png',
        },
        team: {
            facundo: './assets/adminfacundo.png',
            marcela: './assets/adminmarcela.png',
            milenka: './assets/adminmilenka.png',
            Luciana: './assets/adminluciana.png',
            Santiago: './assets/adminsantiago.png',
            'Área Innovación & Desarrollo': './assets/area-innovacion-y-desarrollo.png',

        }
    },

    // ==========================================
    // PALETA DE COLORES
    // ==========================================
    colors: {
        primary: { main: '#00D4FF', dark: '#00A8CC', light: '#5CE1FF' },
        secondary: { main: '#90EE90', dark: '#5CB85C', light: '#9FE2BF' },
        background: { dark: '#1A1A2E', darker: '#16213E', card: 'rgba(255, 255, 255, 0.05)' },
        text: { primary: '#FFFFFF', secondary: 'rgba(255, 255, 255, 0.7)', muted: 'rgba(255, 255, 255, 0.5)' },
        status: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' }
    },

    // ==========================================
    // CONFIGURACIÓN DE SUPABASE
    // ==========================================
    supabase: {
        url: 'https://tjcsbuhvzcspmousxaor.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY3NidWh2emNzcG1vdXN4YW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzY3MzcsImV4cCI6MjA4ODA1MjczN30.RQXlB6ztyvrXxBFWTupqzMsqeQw3_wh8WTBHBKVpC7Q',
        tables: {
            proyectos: 'proyectos',
            administradores: 'administradores',
            usuarios: 'usuarios'
        }
    },

    // ==========================================
    // BASES/SECCIONES (UI -> DB)
    // ==========================================
    sections: {
        'base 1': { id: 'base 1', dbValue: 'base 1', name: 'Productos', icon: '💼', description: 'Proyectos de Productos' },
        'base 2': { id: 'base 2', dbValue: 'base 2', name: 'Herramientas Digitales', icon: '🧰', description: 'Proyectos de Herramientas Digitales' },
        'base 3': { id: 'base 3', dbValue: 'base 3', name: 'Evaluaciones', icon: '🧾', description: 'Proyectos de Evaluaciones' },
        'base 4': { id: 'base 4', dbValue: 'base 4', name: 'Empresas (personalizado)', icon: '📦', description: 'Proyectos de Empresas (personalizado)' },
        'base 5': { id: 'base 5', dbValue: 'base 5', name: 'Escencial', icon: '📁', description: 'Proyectos de Escencial' },
        'base 6': { id: 'base 6', dbValue: 'base 6', name: 'Consultoria', icon: '🧑‍💼', description: 'Proyectos de Consultoria' }
    },

    // ==========================================
    // EQUIPO
    // ==========================================
    team: [
        { id: 'facundo', name: 'Facundo', role: 'SuperAdmin', avatar: './assets/adminfacundo.png' },
        { id: 'marcela', name: 'Marcela', role: 'Administrador', avatar: './assets/adminmarcela.png' },
        { id: 'milenka', name: 'Milenka', role: 'Administrador', avatar: './assets/adminmilenka.png' },
        { id: 'Luciana', name: 'Luciana', role: 'Administrador', avatar: './assets/adminluciana.png' },
        { id: 'Santiago', name: 'Santiago', role: 'Administrador', avatar: './assets/adminsantiago.png' },
        { id: 'Área Innovación & Desarrollo', name: 'Área Innovación & Desarrollo', role: 'Administrador', avatar: './assets/area-innovacion-y-desarrollo.png' },
    ],

    // ==========================================
    // SUPERADMIN POR DEFECTO
    // ==========================================
    defaultSuperAdmin: {
        username: 'AREAINNOVACIONDESARROLLO2026',
        password: 'AREAINNOVACIONDESARROLLO2026'
    }
};

// Funciones helper para mapeo UI <-> DB
function getDbBase(baseId) {
    if (typeof BRAND_CONFIG === 'undefined') return baseId;
    const section = BRAND_CONFIG.sections[baseId];
    return (section && section.dbValue) ? section.dbValue : baseId;
}

function getUiBaseFromDb(dbValue) {
    if (typeof BRAND_CONFIG === 'undefined') return null;
    const norm = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
    const target = norm(dbValue);
    for (const [uiKey, section] of Object.entries(BRAND_CONFIG.sections)) {
        if (norm(section.dbValue) === target) return uiKey;
    }
    return null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BRAND_CONFIG;
}
