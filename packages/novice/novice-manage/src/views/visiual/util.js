/**
 * Deep clone an object.
 * @param {*} obj - The object to clone.
 * @returns {*} - The cloned object.
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}

export function deepMerge(target, merged) {
    for (let key in merged) {
        if (merged.hasOwnProperty(key)) {
            if (typeof merged[key] === 'object' && merged[key] !== null) {
                if (typeof target[key] === 'object' && target[key] !== null) {
                    // Recursively merge objects
                    target[key] = deepMerge(target[key], merged[key]);
                } else {
                    // Deep clone and assign the object
                    target[key] = deepClone(merged[key]);
                }
            } else {
                // Assign non-object values directly
                target[key] = merged[key];
            }
        }
    }

    return target;
}
