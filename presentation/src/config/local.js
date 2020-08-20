const local = window.localStorage;

export const getEmail = () => {
    return local.getItem('email');
}

export const setEmail = (email) => {
    local.setItem('email', email);
}

export const removeEmail = () => {
    local.removeItem('email');
}

// Generic version of the above READ
export const getLocalStorageValue = (key) => {
    return local.getItem(key);
}

// Generic version of the above CREATE
export const setLocalStorageValue = (key, value) => {
    local.setItem(key, value);
}