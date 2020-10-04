/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const resultObj = {};
    for(let value of Object.entries(obj)) {
        if(fields.includes(value[0])) {
            resultObj[value[0]] = value[1];
        }
    }

    return resultObj;
};
