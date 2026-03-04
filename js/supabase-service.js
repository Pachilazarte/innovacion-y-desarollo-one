/**
 * ONE Innovation & Development Platform
 * Supabase Database Service
 * ==========================================
 * Manejo de operaciones CRUD para: proyectos, administradores, usuarios
 */

class SupabaseService {
    constructor(config) {
        this.url = config.url;
        this.key = config.key;
        this.tables = config.tables || { proyectos: 'proyectos', administradores: 'administradores', usuarios: 'usuarios' };
        this.client = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        try {
            if (typeof window.supabase === 'undefined') {
                throw new Error('Supabase SDK no está cargado');
            }
            this.client = window.supabase.createClient(this.url, this.key);
            this.initialized = true;
            console.log('✅ Supabase inicializado');
        } catch (error) {
            console.error('❌ Error inicializando Supabase:', error);
            throw error;
        }
    }

    normalize(value) {
        return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    // ==========================================
    // PROYECTOS
    // ==========================================

    async getProjects(base) {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .select('*')
                .order('fecha', { ascending: false });

            if (error) throw error;

            const target = this.normalize(base);
            const filtered = (data || []).filter(p => this.normalize(p.base) === target);

            return filtered.map(p => ({
                ...p,
                queEs: p.que_es,
                enfocadoA: p.enfocado_a
            }));
        } catch (error) {
            console.error(`❌ Error cargando proyectos:`, error);
            throw error;
        }
    }

    async getAllProjects() {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .select('*')
                .order('fecha', { ascending: false });

            if (error) throw error;
            return (data || []).map(p => ({
                ...p,
                queEs: p.que_es,
                enfocadoA: p.enfocado_a
            }));
        } catch (error) {
            console.error('❌ Error cargando proyectos:', error);
            throw error;
        }
    }

    async getProjectsWithFinal() {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .select('*')
                .not('final', 'is', null)
                .neq('final', '')
                .order('proyecto');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('❌ Error cargando proyectos con final:', error);
            throw error;
        }
    }

    async createProject(projectData) {
        await this.init();
        const payload = {
            base: projectData.base,
            proyecto: projectData.proyecto,
            encargado: projectData.encargado,
            que_es: projectData.queEs || projectData.que_es || '',
            enfocado_a: projectData.enfocadoA || projectData.enfocado_a || '',
            manual: projectData.manual || '',
            maquetas: projectData.maquetas || '',
            beta: projectData.beta || '',
            final: projectData.final || '',
            fecha: new Date().toISOString()
        };

        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .insert([payload])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error creando proyecto:', error);
            throw error;
        }
    }

    async updateProject(id, projectData) {
        await this.init();
        const payload = {
            base: projectData.base,
            proyecto: projectData.proyecto,
            encargado: projectData.encargado,
            que_es: projectData.queEs || projectData.que_es || '',
            enfocado_a: projectData.enfocadoA || projectData.enfocado_a || '',
            manual: projectData.manual || '',
            maquetas: projectData.maquetas || '',
            beta: projectData.beta || '',
            final: projectData.final || ''
        };

        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .update(payload)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error actualizando proyecto:', error);
            throw error;
        }
    }

    async deleteProject(id) {
        await this.init();
        try {
            const { error } = await this.client
                .from(this.tables.proyectos)
                .delete()
                .eq('id', id);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('❌ Error eliminando proyecto:', error);
            throw error;
        }
    }

    async getStats() {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.proyectos)
                .select('base, id');
            if (error) throw error;

            const stats = { total: (data || []).length, byBase: {} };
            (data || []).forEach(p => {
                const b = p.base || 'sin_base';
                stats.byBase[b] = (stats.byBase[b] || 0) + 1;
            });
            return stats;
        } catch (error) {
            console.error('❌ Error obteniendo estadísticas:', error);
            throw error;
        }
    }

    // ==========================================
    // ADMINISTRADORES
    // ==========================================

    async loginAdmin(username, password) {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.administradores)
                .select('*')
                .eq('admin_username', username)
                .eq('admin_password', password)
                .single();

            if (error || !data) return null;
            return data;
        } catch (error) {
            console.error('❌ Error login admin:', error);
            return null;
        }
    }

    async getAdmins() {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.administradores)
                .select('*');
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('❌ Error cargando admins:', error);
            throw error;
        }
    }

    async createAdmin(adminData) {
        await this.init();
        try {
            const payload = {
                admin_username: adminData.admin_username ?? '',
                admin_password: adminData.admin_password ?? '',
                admin_email: adminData.admin_email ?? '',
                rol: adminData.rol ?? '',
                creado_por: adminData.creado_por ?? '',
                user_superadmin: adminData.user_superadmin ?? '',
                email_superadmin: adminData.email_superadmin ?? '',
                fecha: adminData.fecha ?? new Date().toISOString()
            };
            const { data, error } = await this.client
                .from(this.tables.administradores)
                .insert([payload])
                .select('*')
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error creando admin:', error);
            throw error;
        }
    }

    async updateAdmin(id, adminData) {
        await this.init();
        try {
            const payload = {
                admin_username: adminData.admin_username ?? '',
                admin_password: adminData.admin_password ?? '',
                admin_email: adminData.admin_email ?? '',
                rol: adminData.rol ?? '',
                creado_por: adminData.creado_por ?? '',
                user_superadmin: adminData.user_superadmin ?? '',
                email_superadmin: adminData.email_superadmin ?? ''
            };
            const { data, error } = await this.client
                .from(this.tables.administradores)
                .update(payload)
                .eq('id', id)
                .select('*')
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error actualizando admin:', error);
            throw error;
        }
    }

    async deleteAdmin(id) {
        await this.init();
        try {
            const { error } = await this.client
                .from(this.tables.administradores)
                .delete()
                .eq('id', id);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('❌ Error eliminando admin:', error);
            throw error;
        }
    }

    // ==========================================
    // USUARIOS DEMO
    // ==========================================

    async loginUsuario(username, password) {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.usuarios)
                .select('*')
                .eq('usuariodemo_user', username)
                .eq('usuariodemo_pass', password)
                .single();
            if (error || !data) return null;
            return data;
        } catch (error) {
            console.error('❌ Error login usuario:', error);
            return null;
        }
    }

    async getUsuarios(adminUsername = null) {
        await this.init();
        try {
            let query = this.client
                .from(this.tables.usuarios)
                .select('*')
                .order('fecha', { ascending: false });
            if (adminUsername) {
                query = query.eq('admin_main', adminUsername);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('❌ Error cargando usuarios:', error);
            throw error;
        }
    }

    async createUsuario(userData) {
        await this.init();
        const payload = {
            usuariodemo_user: userData.username,
            usuariodemo_pass: userData.password,
            usuariodemo_correo: userData.email || '',
            admin_main: userData.adminMain || '',
            base_nombre: userData.baseName || '',
            proyecto_id: userData.projectName || '',
            intentos_restantes: userData.intentos || 5,
            limite_usos: userData.intentos || 5,
            final: userData.finalUrl || '',
            fecha: new Date().toISOString()
        };
        try {
            const { data, error } = await this.client
                .from(this.tables.usuarios)
                .insert([payload])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error creando usuario:', error);
            throw error;
        }
    }

    async createUsuarioPacked(userData) {
        await this.init();
        const payload = {
            usuariodemo_user: userData.username,
            usuariodemo_pass: userData.password,
            usuariodemo_correo: userData.email || '',
            admin_main: userData.adminMain || '',
            base_nombre: userData.base_nombre || '',
            proyecto_id: userData.proyecto_id || '',
            intentos_restantes: userData.intentos_restantes || '',
            limite_usos: userData.limite_usos || '',
            final: userData.final || '',
            fecha: new Date().toISOString()
        };
        const { data, error } = await this.client
            .from(this.tables.usuarios)
            .insert([payload])
            .select('*')
            .single();
        if (error) throw error;
        return data;
    }

    async updateUsuarioPacked(id, patch) {
        await this.init();
        const { data, error } = await this.client
            .from(this.tables.usuarios)
            .update(patch)
            .eq('id', id)
            .select('*')
            .single();
        if (error) throw error;
        return data;
    }

    async createUsuariosBulk(rows) {
        await this.init();
        const payload = (rows || []).map((r) => ({
            usuariodemo_user: r.username,
            usuariodemo_pass: r.password,
            usuariodemo_correo: r.email || '',
            admin_main: r.adminMain || '',
            base_nombre: r.baseName || '',
            proyecto_id: r.projectName || '',
            intentos_restantes: r.intentos || 5,
            limite_usos: r.intentos || 5,
            final: r.finalUrl || '',
            fecha: new Date().toISOString()
        }));
        if (payload.length === 0) return [];
        const { data, error } = await this.client
            .from(this.tables.usuarios)
            .insert(payload)
            .select('*');
        if (error) throw error;
        return data || [];
    }

    async updateUsuarioIntentos(id, newLimit) {
        await this.init();
        try {
            const { data, error } = await this.client
                .from(this.tables.usuarios)
                .update({ limite_usos: newLimit })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('❌ Error actualizando intentos:', error);
            throw error;
        }
    }

    async deleteUsuario(id) {
        await this.init();
        try {
            const { error } = await this.client
                .from(this.tables.usuarios)
                .delete()
                .eq('id', id);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('❌ Error eliminando usuario:', error);
            throw error;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseService;
}
