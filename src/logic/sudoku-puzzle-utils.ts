import { Digits } from "./types"

export const getInitialValueIndices = (digits: Digits) =>
  digits.flatMap((digit, index) => digit === 0 ? [] : [index])
