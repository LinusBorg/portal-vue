export const inBrowser = typeof window !== 'undefined'

export function stableSort<T>(array: T[], compareFn: Function) {
  return array
    .map((v: T, idx: number) => {
      return [idx, v] as [number, T]
    })
    .sort(function (a, b) {
      return compareFn(a[1], b[1]) || a[0] - b[0]
    })
    .map((c) => c[1])
}
