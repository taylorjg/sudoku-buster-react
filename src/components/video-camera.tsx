import React, { useEffect, useRef } from "react"
import { nextAnimationFrame } from "utils"
import { StyledVideoCamera } from "./video-camera.styles"

export type VideoCameraProps = {
  onVideoFrame: (imageData: ImageData) => void
}

export const VideoCamera: React.FC<VideoCameraProps> = ({ onVideoFrame }) => {

  const mediaStreamRef = useRef<MediaStream>()
  const stopLoopRef = useRef(false)

  useEffect(() => {
    const cleanup = () => {
      const mediaStream = mediaStreamRef.current
      if (mediaStream) {
        mediaStream.getVideoTracks().forEach(videoTrack => videoTrack.stop())
        stopLoopRef.current = true
      }
    }
    return cleanup
  }, [])

  const videoRef = async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return
    const videoRect = videoElement.getBoundingClientRect()
    const constraints = {
      video: {
        facingMode: "environment",
        width: videoRect.width,
        height: videoRect.height
      }
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    if (mediaStream) {
      mediaStreamRef.current = mediaStream
      videoElement.srcObject = mediaStream
      videoElement.play()
      const offscreenCanvas = document.createElement("canvas")
      const ctx = offscreenCanvas.getContext("2d")
      if (ctx) {
        const { width, height } = videoRect
        const bounds: [number, number, number, number] = [0, 0, width, height]
        while (!stopLoopRef.current) {
          ctx.drawImage(videoElement, ...bounds)
          const imageData = ctx.getImageData(...bounds)
          onVideoFrame(imageData)
          await nextAnimationFrame()
        }
      }
    }
  }

  return (
    <StyledVideoCamera playsInline ref={videoRef} />
  )
}
