/**
 * Storage Manager - Gestionare localStorage si sessionStorage
 * ACEST COD VA ESTE FURNIZAT - NU TREBUIE MODIFICAT
 */
const StorageManager = {
    /**
     * Salveaza date in localStorage (persistente)
     */
    setLocal: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Eroare localStorage:', e);
            return false;
        }
    },

    /**
     * Obtine date din localStorage
     */
    getLocal: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return localStorage.getItem(key);
        }
    },

    /**
     * Sterge din localStorage
     */
    removeLocal: function(key) {
        localStorage.removeItem(key);
    },

    /**
     * Salveaza date in sessionStorage (per tab/sesiune)
     */
    setSession: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Eroare sessionStorage:', e);
            return false;
        }
    },

    /**
     * Obtine date din sessionStorage
     */
    getSession: function(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return sessionStorage.getItem(key);
        }
    },

    /**
     * Sterge din sessionStorage
     */
    removeSession: function(key) {
        sessionStorage.removeItem(key);
    },

    /**
     * Goleste tot sessionStorage
     */
    clearSession: function() {
        sessionStorage.clear();
    },

    /**
     * Goleste tot localStorage
     */
    clearLocal: function() {
        localStorage.clear();
    },

    /**
     * Obtine toate datele din localStorage
     */
    getAllLocal: function() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = this.getLocal(key);
        }
        return data;
    },

    /**
     * Obtine toate datele din sessionStorage
     */
    getAllSession: function() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = this.getSession(key);
        }
        return data;
    }
};

// Export pentru utilizare globala
window.StorageManager = StorageManager;
