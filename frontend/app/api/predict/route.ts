import { type NextRequest, NextResponse } from "next/server"

// This is a mock API endpoint that would normally call the Python backend
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // In a real app, we would send this to the Python backend
    // For now, we'll simulate a response with a random animal

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer()

    // Simulate sending to backend
    // In a real app, this would be:
    // const response = await fetch('http://localhost:5000/predict', {
    //   method: 'POST',
    //   body: formData,
    // })
    // const data = await response.json()

    // For demo purposes, return a random animal
    const animals = [
      "cat",
      "dog",
      "elephant",
      "tiger",
      "lion",
      "bear",
      "fox",
      "wolf",
      "deer",
      "rabbit",
      "squirrel",
      "owl",
      "eagle",
      "penguin",
      "dolphin",
    ]
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({ animal: randomAnimal })
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

