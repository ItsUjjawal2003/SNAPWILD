import { MainApp } from "@/components/main-app"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">SnapWild</h1>
        </header>

        <MainApp />
      </div>
    </main>
  )
}

