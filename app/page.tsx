"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"
import { GameBoard } from "@/components/game-board"
import { Play, Puzzle, ArrowLeft, Image as ImageIcon, Images } from "lucide-react"

type GameState = "home" | "playing"

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("home")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleStartGame = () => {
    if (selectedImages.length > 0) {
      setCurrentImageIndex(0)
      setGameState("playing")
    }
  }

  const handleReset = () => {
    setGameState("home")
    setSelectedImages([])
    setCurrentImageIndex(0)
  }

  const handleBackToHome = () => {
    setGameState("home")
  }

  const handleNextImage = () => {
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {gameState === "home" ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-lg">
              <Puzzle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
              Jogo de Revelacao
            </h1>
            <p className="text-lg text-muted-foreground max-w-md text-pretty">
              Envie imagens e descubra-as peca por peca. Cada clique revela uma parte aleatoria!
            </p>
          </div>

          {/* Upload Section */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <ImageUpload
              onImagesSelect={setSelectedImages}
              currentImages={selectedImages}
            />

            <Button
              onClick={handleStartGame}
              disabled={selectedImages.length === 0}
              size="lg"
              className="w-full max-w-xs gap-2 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              Iniciar Jogo {selectedImages.length > 0 && `(${selectedImages.length} ${selectedImages.length === 1 ? "imagem" : "imagens"})`}
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Images className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">1. Envie</h3>
              <p className="text-sm text-muted-foreground">
                Selecione uma ou mais imagens .jpg do seu dispositivo
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Puzzle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">2. Jogue</h3>
              <p className="text-sm text-muted-foreground">
                Cada imagem sera dividida em 16 partes numeradas
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">3. Descubra</h3>
              <p className="text-sm text-muted-foreground">
                Revele partes ou veja a solucao completa a qualquer momento
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-8">
          {/* Header */}
          <header className="flex items-center justify-between max-w-2xl mx-auto px-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Jogo de Revelacao
              </span>
            </div>
          </header>

          {/* Game */}
          <GameBoard 
            imageUrl={selectedImages[currentImageIndex]} 
            currentIndex={currentImageIndex}
            totalImages={selectedImages.length}
            onReset={handleReset}
            onNextImage={handleNextImage}
            hasNextImage={currentImageIndex < selectedImages.length - 1}
          />
        </div>
      )}
    </main>
  )
}
