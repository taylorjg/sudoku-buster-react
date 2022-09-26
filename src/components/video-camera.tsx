import React, { useEffect, useRef } from "react"
import { nextAnimationFrame } from "utils"
import { StyledVideoCamera } from "./video-camera.styles"
import { useToast } from "./toast-provider"
import { getImageDataFromVideoElement } from "./imageUtils"

export type VideoCameraProps = {
  onCameraNotAvailable: () => void
  onVideoFrame: (imageData: ImageData) => void
}

export const VideoCamera: React.FC<VideoCameraProps> = ({
  onCameraNotAvailable,
  onVideoFrame
}) => {

  const { showError } = useToast()
  const mediaStreamRef = useRef<MediaStream | undefined>(undefined)
  const stopLoopRef = useRef(false)

  useEffect(() => {
    const cleanup = () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getVideoTracks().forEach(videoTrack => videoTrack.stop())
        mediaStreamRef.current = undefined
        stopLoopRef.current = true
      }
    }
    return cleanup
  }, [])

  const videoRef = async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return
    if (mediaStreamRef.current) return
    try {
      const { width, height } = videoElement.getBoundingClientRect()
      const constraints = {
        video: {
          facingMode: "environment",
          width,
          height
        }
      }
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints)
      if (mediaStreamRef.current) {
        videoElement.srcObject = mediaStreamRef.current
        videoElement.play()
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = width
        offscreenCanvas.height = height
        const context2D = offscreenCanvas.getContext("2d")
        if (context2D) {
          while (!stopLoopRef.current) {
            const imageData = getImageDataFromVideoElement(videoElement, context2D)
            onVideoFrame(imageData)
            await nextAnimationFrame()
          }
        }
      }
    } catch (error) {
      try {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getVideoTracks().forEach(videoTrack => videoTrack.stop())
          mediaStreamRef.current = undefined
          stopLoopRef.current = true
        }
      } finally {
        showError("Camera not available")
        onCameraNotAvailable()
      }
    }
  }

  return (
    <StyledVideoCamera playsInline ref={videoRef} />
  )
}
