/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathArr = path.split('.');

    return function(obj) {
        return iterate(obj, pathArr);
    };

    function iterate(obj, pathArr) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === "object") {
                    return iterate(obj[property], pathArr);
                } else {
                    if (pathArr.includes(property)) {
                        return obj[property];
                    }
                }
            }
        }
    }
}
