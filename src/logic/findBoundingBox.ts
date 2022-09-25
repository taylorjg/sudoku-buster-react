/// <reference types="emscripten" />

declare var createHelloModule: EmscriptenModuleFactory

let helloModule: EmscriptenModule | undefined = undefined
let processImageWrapper: ((data: Uint8Array, width: number, height: number) => number) | undefined = undefined

export const helloModuleLoaded = new Promise<void>(async resolve => {

  const makeProcessImageWrapper = (helloModule: EmscriptenModule) => {
    const ident = "processImage"
    const returnType: Emscripten.JSType = "number"
    const argTypes: Emscripten.JSType[] = ["array", "number", "number"]
    const processImage = (helloModule as any).cwrap(ident, returnType, argTypes)
    return processImage
  }

  helloModule = await createHelloModule()
  processImageWrapper = makeProcessImageWrapper(helloModule)
  resolve()
})

const imageDataFrom1Channel = (data: Uint8Array, width: number, height: number) => {
  const length = width * height * 4
  const clampedData = new Uint8ClampedArray(length)
  data.forEach((pixelValue, index: number) => {
    const base = index * 4
    clampedData[base] = pixelValue
    clampedData[base + 1] = pixelValue
    clampedData[base + 2] = pixelValue
    clampedData[base + 3] = 255
  })
  const imageData = new ImageData(clampedData, width, height)
  return imageData
}

const imageDataFrom4Channels = (data: Uint8Array, width: number, height: number) => {
  const clampedData = new Uint8ClampedArray(data.buffer)
  const imageData = new ImageData(clampedData, width, height)
  return imageData
}

const unpackImage = ([width, height, channels, ptr]: Int32Array) => {
  const numBytes = width * height * channels
  const data = helloModule!.HEAPU8.slice(ptr, ptr + numBytes)
  return channels === 1
    ? imageDataFrom1Channel(data, width, height)
    : imageDataFrom4Channels(data, width, height)
}

const range = (n: number) => Array.from(Array(n).keys())

const unpackPoints = (data: Int32Array) => {
  const numPoints = data.length / 2
  return range(numPoints).map(index => {
    const x = data[index * 2]
    const y = data[index * 2 + 1]
    return { x, y }
  })
}

const unpackCorners = (data: Int32Array) => {
  return unpackPoints(data)
}

const unpackContour = ([numPoints, ptr]: Int32Array) => {
  const ptr32 = ptr / helloModule!.HEAP32.BYTES_PER_ELEMENT
  const data = helloModule!.HEAP32.slice(ptr32, ptr32 + numPoints * 2)
  return unpackPoints(data)
}

const unpackProcessImageResult = (ptr: number) => {
  const NUM_INT_FIELDS = 22
  const ptr32 = ptr / helloModule!.HEAP32.BYTES_PER_ELEMENT
  const data = helloModule!.HEAP32.slice(ptr32, ptr32 + NUM_INT_FIELDS)
  const boundingBox = data.slice(0, 4)
  const image1 = unpackImage(data.slice(4, 8))
  const image2 = unpackImage(data.slice(8, 12))
  const corners = unpackCorners(data.slice(12, 20))
  const contour = unpackContour(data.slice(20, 22))
  return { boundingBox, image1, image2, corners, contour }
}

export const findBoundingBox = (imageData: ImageData) => {
  const { data, width, height } = imageData
  const unclampedData = new Uint8Array(data.buffer)
  const ptr = processImageWrapper!(unclampedData, width, height)
  if (ptr === 0) return undefined
  const unpackedResult = unpackProcessImageResult(ptr)
  helloModule!._free(ptr)
  return unpackedResult
}
