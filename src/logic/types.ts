export type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | " "

type Tuple81<T> = [
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T
]

export type Digits = Tuple81<Digit>

export type DigitDetails = {
  row: number
  col: number
  digit: Digit
  isInitialValue: boolean
}
