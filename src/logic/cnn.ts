import * as tf from "@tensorflow/tfjs"

let model: tf.LayersModel | undefined = undefined

export const loadModel = async () => {
  model = await tf.loadLayersModel(`/sudoku-buster-react/model.json`)
}

export const predictDigits = (gridSquareImageTensors: tf.Tensor4D): number[] => {
  const [batchSize] = gridSquareImageTensors.shape
  const resultsTensor = model!.predict(gridSquareImageTensors, { batchSize }) as tf.Tensor2D
  const predictionsTensor = resultsTensor.argMax(1) as tf.Tensor1D
  const predictions = predictionsTensor.arraySync()
  return predictions
}
