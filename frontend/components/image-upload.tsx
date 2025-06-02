"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Loader2 } from "lucide-react"

interface ImageUploadProps {
  onUpload: (imageData: string) => void
  isProcessing: boolean
}

export function ImageUpload({ onUpload, isProcessing }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    if (preview) {
      onUpload(preview)
    }
  }

  const handleReset = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-[4/3] mb-4 bg-muted rounded-md overflow-hidden">
          {preview ? (
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">Upload an image to recognize the animal</p>
            </div>
          )}
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        <div className="flex justify-center gap-4">
          {preview ? (
            <>
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                Reset
              </Button>
              <Button onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Recognize Animal"
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleUploadClick} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Select Image
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

