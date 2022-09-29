import * as tf from "@tensorflow/tfjs"
import { FindBoundingBoxResult } from "logic/types"
import { findBoundingBox } from "logic/findBoundingBox"
import { predictDigits } from "logic/cnn"
import { SudokuPuzzle } from "logic/sudoku-puzzle"
import { getInitialValueIndices } from "logic/sudoku-puzzle-utils"
import { imageDataToImageTensor, cropGridSquares, inset } from "components/imageUtils"

export type ProcessImageResult = {
  findBoundingBoxResult: FindBoundingBoxResult
  solvedSudokuPuzzle?: SudokuPuzzle
}

const perfWrapper = <T>(name: string, fn: () => T): T => {
  performance.mark(`${name}-start`)
  const result = fn()
  performance.measure(name, `${name}-start`)
  return result
}

export const useProcessImage = () => {

  const processImage = (imageData: ImageData): ProcessImageResult | undefined => {
    let result: ProcessImageResult | undefined

    const fn = (): void => {
      const findBoundingBoxResult = perfWrapper("findBoundingBox", () => findBoundingBox(imageData))

      if (findBoundingBoxResult) {
        const imageData = findBoundingBoxResult.image2
        const imageTensor = imageDataToImageTensor(imageData)
        const insetImageBoundingBox = inset([0, 0, imageData.width, imageData.height], 2, 2)
        const gridSquareImageTensors = cropGridSquares(imageTensor, insetImageBoundingBox)

        const digits = perfWrapper("predictDigits", () => predictDigits(gridSquareImageTensors))

        const initialValueIndices = getInitialValueIndices(digits)
        const sudokuPuzzle = new SudokuPuzzle(digits, initialValueIndices)

        if (perfWrapper("solve", () => sudokuPuzzle.solve())) {
          result = { findBoundingBoxResult, solvedSudokuPuzzle: sudokuPuzzle }
        } else {
          result = { findBoundingBoxResult }
        }
      }
    }

    tf.tidy(() => perfWrapper("processImage", fn))
    return result
  }

  return {
    processImage
  }
}
