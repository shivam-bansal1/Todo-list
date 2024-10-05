export function addToStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromStorage(key) {
    return localStorage.getItem(key);
}
