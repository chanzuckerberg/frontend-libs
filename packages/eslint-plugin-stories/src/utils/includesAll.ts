export default function includesAll<T>(list: T[], requireds: T[]): boolean {
  return requireds.every((required) => list.includes(required));
}
