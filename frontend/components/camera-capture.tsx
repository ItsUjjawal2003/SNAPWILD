"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, FlipHorizontal, Loader2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  isProcessing: boolean
}

export function CameraCapture({ onCapture, isProcessing }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [cameraError, setCameraError] = useState<string | null>(null)
  const isMobile = useMobile()

  useEffect(() => {
    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode])

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(newStream)

      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }

      setCameraError(null)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Could not access camera. Please ensure you have granted camera permissions.")
    }
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get the image data as base64
    const imageData = canvas.toDataURL("image/jpeg")
    onCapture(imageData)
  }

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="camera-container aspect-[4/3] mb-4">
          {cameraError ? (
            <div className="flex items-center justify-center h-full bg-muted text-center p-4">
              <p>{cameraError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={facingMode === "user" ? "transform scale-x-[-1]" : ""}
              />
              <canvas ref={canvasRef} className="hidden" />
            </>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" size="icon" onClick={toggleCamera} disabled={isProcessing}>
            <FlipHorizontal size={20} />
          </Button>
          <Button
            onClick={captureImage}
            disabled={isProcessing || !!cameraError}
            className="rounded-full h-14 w-14 p-0"
          >
            {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
          </Button>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </CardContent>
    </Card>
  )
}

