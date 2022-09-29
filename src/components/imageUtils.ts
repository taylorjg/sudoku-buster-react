import * as tf from "@tensorflow/tfjs"
import { range } from "../utils"
import * as C from "./constants"

export const getImageDataFromVideoElement = (
  videoElement: HTMLVideoElement,
  context2D: CanvasRenderingContext2D
): ImageData => {
  const { width, height } = context2D.canvas
  const bounds: [number, number, number, number] = [0, 0, width, height]
  context2D.drawImage(videoElement, ...bounds)
  return context2D.getImageData(...bounds)
}

export const imageDataToImageTensor = (imageData: ImageData) => {
  const numChannels = 1
  return tf.browser.fromPixels(imageData, numChannels)
}

type FourNumbers = [number, number, number, number]

export const inset = ([x, y, w, h]: FourNumbers, dx: number, dy: number): FourNumbers =>
  [x + dx, y + dy, w - 2 * dx, h - 2 * dy]

export const calculateGridSquaresBoundingBoxes = (boundingBox: FourNumbers): FourNumbers[] => {
  const [bbx, bby, bbw, bbh] = boundingBox
  const w = bbw / 9
  const h = bbh / 9
  const dx = 2
  const dy = 2
  const rows = range(9)
  const cols = range(9)
  return rows.flatMap(row =>
    cols.map(col => {
      const x = bbx + col * w
      const y = bby + row * h
      return inset([x, y, w, h], dx, dy)
    }))
}

const normaliseForCropping = (imageWidth: number, imageHeight: number) =>
  ([x, y, w, h]: FourNumbers): FourNumbers => {
    const normaliseX = (value: number) => value / (imageWidth - 1)
    const normaliseY = (value: number) => value / (imageHeight - 1)
    return [
      normaliseY(y),
      normaliseX(x),
      normaliseY(y + h),
      normaliseX(x + w)
    ]
  }

export const cropGridSquares = (imageTensor: tf.Tensor3D, boundingBox: FourNumbers): tf.Tensor4D =>
  tf.tidy(() => {
    // imageTensor is assumed to have HWC shape/order (height, width, channels)
    const gridSquareBoundingBoxes = calculateGridSquaresBoundingBoxes(boundingBox)
    const [imageHeight, imageWidth] = imageTensor.shape
    const normalisedGridSquareBoundingBoxes = gridSquareBoundingBoxes.map(normaliseForCropping(imageWidth, imageHeight))
    const cropSize: [number, number] = [C.WASM_DIGIT_IMAGE_SIZE, C.WASM_DIGIT_IMAGE_SIZE]
    // We have to normalise the pixels values from 0-255 => 0.0-1.0
    // Also, cropAndResize expects multiple images - we only have one so we need to add another dimension
    const imageTensor4D: tf.Tensor4D = imageTensor.div(255).expandDims()
    // All grid squares are to be cropped from the first (only) image i.e. the image at index 0
    const imageIndices = Array(81).fill(0)
    return tf.image.cropAndResize(imageTensor4D, normalisedGridSquareBoundingBoxes, imageIndices, cropSize)
  })
