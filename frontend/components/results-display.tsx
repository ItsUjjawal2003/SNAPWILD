"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download } from "lucide-react"
import type { RecognitionResult } from "./main-app"
import { capitalizeFirstLetter } from "@/lib/utils"

interface ResultsDisplayProps {
  result: RecognitionResult
  onReset: () => void
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const [filteredImage, setFilteredImage] = useState<string | null>(null)

  useEffect(() => {
    if (result.filter) {
      applyFilter(result.imageData, result.animal)
    } else {
      setFilteredImage(result.imageData)
    }
  }, [result])

  const applyFilter = async (imageData: string, animal: string) => {
    // In a real app, this would apply the actual filter
    // For now, we'll just simulate it with a delay
    setTimeout(() => {
      setFilteredImage(imageData)
    }, 500)
  }

  const downloadImage = () => {
    if (!filteredImage) return

    const link = document.createElement("a")
    link.href = filteredImage
    link.download = `snapwild-${result.animal}-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{capitalizeFirstLetter(result.animal)}</CardTitle>
            {result.filter && <CardDescription>Filter: {result.filter.name}</CardDescription>}
          </div>
          <Badge variant="outline" className="text-xs">
            Recognized
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="filter-preview aspect-[4/3] mb-4 overflow-hidden bg-black rounded-md">
          {filteredImage ? (
            <img
              src={filteredImage || "/placeholder.svg"}
              alt={`Recognized ${result.animal}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse">Applying filter...</div>
            </div>
          )}
        </div>

        {result.filter && (
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>{result.filter.description}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Take Another
        </Button>

        <Button onClick={downloadImage} disabled={!filteredImage}>
          <Download className="mr-2 h-4 w-4" />
          Save Image
        </Button>
      </CardFooter>
    </Card>
  )
}

