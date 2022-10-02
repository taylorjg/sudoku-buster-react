import * as tf from "@tensorflow/tfjs"
import { FindBoundingBoxResult, SolvedSudokuPuzzle, UnsolvedSudokuPuzzle } from "logic/types"
import { findBoundingBox } from "logic/findBoundingBox"
import { predictDigits } from "logic/cnn"
import { solve } from "logic/sudoku-puzzle-solver"
import { imageDataToImageTensor, cropGridSquares, inset } from "components/imageUtils"

export type ProcessImageResult = {
  findBoundingBoxResult: FindBoundingBoxResult
  solvedSudokuPuzzle?: SolvedSudokuPuzzle
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

        const predictions = perfWrapper("predictDigits", () => predictDigits(gridSquareImageTensors))
        const unsolvedSudokuPuzzle = predictions.map(prediction => {
          if (prediction >= 1 && prediction <= 9) return { digit: prediction, isInitialValue: true }
          return undefined
        }) as UnsolvedSudokuPuzzle

        const solvedSudokuPuzzle = perfWrapper("solve", () => solve(unsolvedSudokuPuzzle))
        result = { findBoundingBoxResult, solvedSudokuPuzzle }
      }
    }

    tf.tidy(() => perfWrapper("processImage", fn))
    return result
  }

  return {
    processImage
  }
}
