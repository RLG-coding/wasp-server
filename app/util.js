"use strict";

/**
 * Class containing a few useful functions.
 */
class Util {
    /**
    * Translates a string Map into a new Object.
    * @param {Map} strMap string Map to translate
    * @return {Object} Object containing the same data as the original Map
    */
    static strMapToObj(strMap) {
        const obj = Object.create(null);
        for (const [k, v] of strMap) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            obj[k] = v;
        }

        return obj;
    }

    /**
     * Translates an Object into a new string Map.
     * @param {Object} obj Object to translate
     * @return {Map} Map containing the same data as the original Object
     */
    static objToStrMap(obj) {
        const strMap = new Map();
        for (const k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }

        return strMap;
    }

    /**
     * Stringifies a string Map into a new JSON Object.
     * @param {Map} strMap Map to stringify
     * @return {JSON} JSON Object containing the same data as the original Object
     */
    static strMapToJson(strMap) {
        return JSON.stringify(Util.strMapToObj(strMap));
    }

    /**
     * Parses a JSON Object into a new string Map.
     * @param {JSON} jsonStr JSON Object to parse
     * @return {Map} Map containing the same data as the original Object
     */
    static jsonToStrMap(jsonStr) {
        return Util.objToStrMap(JSON.parse(jsonStr));
    }
}

module.exports = Util;
