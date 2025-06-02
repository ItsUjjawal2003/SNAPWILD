"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraCapture } from "@/components/camera-capture"
import { ImageUpload } from "@/components/image-upload"
import { ResultsDisplay } from "@/components/results-display"
import { Camera, Upload } from "lucide-react"

export type RecognitionResult = {
  animal: string
  filter?: {
    name: string
    description: string
  }
  imageData: string
}

export function MainApp() {
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageCapture = async (imageData: string) => {
    setIsProcessing(true)
    try {
      const result = await processImage(imageData)
      setResult(result)
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetResults = () => {
    setResult(null)
  }

  return (
    <div className="flex flex-col gap-4">
      {!result ? (
        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera size={16} />
              <span>Camera</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload size={16} />
              <span>Upload</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="camera" className="mt-4">
            <CameraCapture onCapture={handleImageCapture} isProcessing={isProcessing} />
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <ImageUpload onUpload={handleImageCapture} isProcessing={isProcessing} />
          </TabsContent>
        </Tabs>
      ) : (
        <ResultsDisplay result={result} onReset={resetResults} />
      )}
    </div>
  )
}

// Function to process the image and get recognition results
async function processImage(imageData: string): Promise<RecognitionResult> {
  // Convert base64 to blob
  const base64Response = await fetch(imageData)
  const blob = await base64Response.blob()

  // Create form data
  const formData = new FormData()
  formData.append("file", blob, "image.jpg")

  // Send to backend
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to process image")
  }

  const data = await response.json()

  // Get filter information for the recognized animal
  const filter = await getFilterForAnimal(data.animal)

  return {
    animal: data.animal,
    filter,
    imageData,
  }
}

// Function to get filter information for a recognized animal
async function getFilterForAnimal(animal: string) {
  try {
    const response = await fetch("/api/filters?animal=" + animal)
    if (!response.ok) {
      throw new Error("Failed to fetch filter data")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching filter:", error)
    return null
  }
}

