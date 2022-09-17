export const range = (n: number) =>
  Array.from(Array(n).keys())

export const nextAnimationFrame = () =>
  new Promise(resolve => requestAnimationFrame(resolve))
