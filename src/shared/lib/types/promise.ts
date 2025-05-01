export type PromiseResolvedReturnType<T> = T extends (...args: any[]) => Promise<infer R> ? R : never
