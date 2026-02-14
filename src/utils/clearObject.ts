export function clearObject<T extends Record<string, unknown>>(obj: T): T {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
