import { Digit, Digits } from "./types"

const charToDigit = (ch: string): Digit => {
  const n = Number(ch)
  if (Number.isInteger(n) && n >= 1 && n <= 9) return n as Digit
  return 0
}

const stringToDigitArray = (s: string): Digit[] =>
  Array.from(s).map(charToDigit)

export const stringsToDigits = (ss: string[]): Digits =>
  ss.flatMap(stringToDigitArray) as Digits

export const getInitialValueIndices = (digits: Digits) =>
  digits.flatMap((digit, index) => digit === 0 ? [] : [index])
