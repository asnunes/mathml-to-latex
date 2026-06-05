/**
 * Looks a key up in a lookup table, returning `undefined` for keys that are not
 * own properties (e.g. `constructor`, `toString`, `__proto__`) instead of
 * resolving them through the object's prototype chain. This keeps element text
 * that happens to collide with `Object.prototype` members from leaking
 * unexpected values into the output.
 *
 * @param table - the lookup table.
 * @param key - the key to look up.
 * @returns the mapped value, or `undefined` when the key is not an own property.
 */
export const ownLookup = <T>(table: Record<string, T>, key: string): T | undefined =>
  Object.prototype.hasOwnProperty.call(table, key) ? table[key] : undefined;
