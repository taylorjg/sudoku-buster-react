import { Digit, Digits, DigitDetails } from "./types"
import { solve } from "./sudoku-puzzle-solver"

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

class SudokuPuzzleIterator implements Iterator<DigitDetails> {

  private allDigitDetails: DigitDetails[];

  constructor(
    private digits: Digits,
    private initialValueIndices: number[]
  ) {
    this.allDigitDetails = this.digits.map((digit, index) => {
      const row = Math.floor(index / 9)
      const col = index % 9
      const isInitialValue = this.initialValueIndices.includes(index)
      return { row, col, digit, isInitialValue }
    })
  }

  next(): IteratorResult<DigitDetails> {
    const value: DigitDetails | undefined = this.allDigitDetails.shift();
    return value
      ? { done: false, value }
      : { done: true, value }
  }
}

export class SudokuPuzzle {

  constructor(
    private digits: Digits,
    private initialValueIndices: number[]) {
  }

  solve() {
    const numSolutions = 2
    const solutions = solve(this.digits, numSolutions)
    if (solutions.length === 1) {
      this.digits = solutions[0]
      return true
    }
    return false
  }

  [Symbol.iterator](): Iterator<DigitDetails> {
    return new SudokuPuzzleIterator(this.digits, this.initialValueIndices);
  }
}
