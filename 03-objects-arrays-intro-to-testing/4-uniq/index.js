/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    const uniqArr = [];
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if ( !uniqArr.includes(element) ) {
                uniqArr.push(element);
            }
        }
    }

    return uniqArr;
}
