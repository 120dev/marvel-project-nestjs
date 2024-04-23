/**
 *
 */
export default {
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    path(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    delete(key) {
        localStorage.removeItem(key);
    }
}
