export function toPrisma<T>(data: Record<string, unknown>): T {
  return data as T;
}
