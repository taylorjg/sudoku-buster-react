import { Digits, DigitDetails } from "./types"
import { solve } from "./sudoku-puzzle-solver"

export const stringsToDigits = (ss: string[]): Digits => {
  const digits = []
  for (const s of ss) {
    digits.push(...Array.from(s))
  }
  return digits as Digits
}

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
