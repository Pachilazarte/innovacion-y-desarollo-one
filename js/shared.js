/**
 * ONE Innovation & Development Platform
 * Shared Utilities
 * ==========================================
 */

// ==========================================
// GLOBAL DB INSTANCE
// ==========================================
const db = new SupabaseService(BRAND_CONFIG.supabase);

const BASES = {
    'base 1': { name: 'Productos', icon: '💼' },
    'base 2': { name: 'Herramientas Digitales', icon: '🧰' },
    'base 3': { name: 'Evaluaciones', icon: '🧾' },
    'base 4': { name: 'Empresas (personalizado)', icon: '📦' },
    'base 5': { name: 'Escencial', icon: '📁' },
    'base 6': { name: 'Consultoria', icon: '🧑‍💼' }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function splitSemi(value) {
    if (!value) return [];
    return String(value).split(';').map(s => s.trim()).filter(Boolean);
}

function joinSemi(arr) {
    return (arr || []).map(v => String(v).trim()).join('; ');
}

function toIntSafe(v, def = 0) {
    const n = parseInt(String(v).trim(), 10);
    return Number.isFinite(n) ? n : def;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(msg, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================
// MODAL HELPERS
// ==========================================
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function setupModalClose() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });
}
