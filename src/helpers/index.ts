// eslint-disable-next-line import/prefer-default-export
export function round(num: number, decimalPlaces = 0) {
  const p = 10 ** decimalPlaces;
  const n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}
