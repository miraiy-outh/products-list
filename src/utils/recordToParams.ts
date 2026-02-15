export const recordToParams = (data: Record<string, any>) => {
  return Object.entries(data)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((val) => `${key}=${encodeURIComponent(val)}`);
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
};
