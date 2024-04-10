export const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  name: string,
) => {
  return Math.abs(x - x1) < 10 && Math.abs(y - y1) < 10 ? name : null;
};
