/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const resultObj = {};
    for(let value of Object.entries(obj)) {
        if(!fields.includes(value[0])) {
            resultObj[value[0]] = value[1];
        }
    }

    return resultObj;
};
