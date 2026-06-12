"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Shuffle, RotateCcw, Sparkles, Eye, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface GameBoardProps {
  imageUrl: string
  currentIndex: number
  totalImages: number
  onReset: () => void
  onNextImage: () => void
  hasNextImage: boolean
}

export function GameBoard({ 
  imageUrl, 
  currentIndex, 
  totalImages, 
  onReset, 
  onNextImage,
  hasNextImage 
}: GameBoardProps) {
  const [revealedTiles, setRevealedTiles] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [lastRevealed, setLastRevealed] = useState<number | null>(null)

  const totalTiles = 16
  const allRevealed = revealedTiles.length === totalTiles

  const revealRandomTile = useCallback(() => {
    if (allRevealed || isAnimating) return

    setIsAnimating(true)
    
    const hiddenTiles = Array.from({ length: totalTiles }, (_, i) => i + 1).filter(
      (tile) => !revealedTiles.includes(tile)
    )
    
    const randomIndex = Math.floor(Math.random() * hiddenTiles.length)
    const tileToReveal = hiddenTiles[randomIndex]
    
    setLastRevealed(tileToReveal)
    
    setTimeout(() => {
      setRevealedTiles((prev) => [...prev, tileToReveal])
      setIsAnimating(false)
    }, 300)
  }, [revealedTiles, allRevealed, isAnimating])

  const revealAll = useCallback(() => {
    if (allRevealed) return
    setRevealedTiles(Array.from({ length: totalTiles }, (_, i) => i + 1))
    setLastRevealed(null)
  }, [allRevealed])

  const resetGame = useCallback(() => {
    setRevealedTiles([])
    setLastRevealed(null)
  }, [])

  const handleNextImage = useCallback(() => {
    resetGame()
    onNextImage()
  }, [resetGame, onNextImage])

  const getTileBackground = (tileNumber: number) => {
    const row = Math.floor((tileNumber - 1) / 4)
    const col = (tileNumber - 1) % 4
    // background-position usa porcentagem: 0%, 33.33%, 66.66%, 100%
    const xPos = col === 0 ? 0 : col === 1 ? 33.333 : col === 2 ? 66.666 : 100
    const yPos = row === 0 ? 0 : row === 1 ? 33.333 : row === 2 ? 66.666 : 100
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "400% 400%",
      backgroundPosition: `${xPos}% ${yPos}%`,
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4">
      {/* Header com progresso */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {revealedTiles.length} / {totalTiles}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            Imagem {currentIndex + 1} de {totalImages}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetGame}
          className="gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </Button>
      </div>

      {/* Grid do jogo */}
      <div className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl bg-card">
        <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
              {Array.from({ length: totalTiles }, (_, i) => i + 1).map((tileNumber) => {
            const isRevealed = revealedTiles.includes(tileNumber)
            const isLastRevealed = lastRevealed === tileNumber
            const tileBackground = getTileBackground(tileNumber)

            return (
              <div
                key={tileNumber}
                className={cn(
                  "relative overflow-hidden transition-all duration-500",
                  isLastRevealed && !isRevealed && "animate-pulse"
                )}
              >
                {/* Imagem de fundo (sempre presente) */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500"
                  )}
                  style={{ 
                    ...tileBackground,
                    opacity: isRevealed ? 1 : 0 
                  }}
                />
                
                {/* Tile cover */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-game-tile transition-all duration-500 transform-gpu",
                    isRevealed
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100",
                    isLastRevealed && !isRevealed && "ring-2 ring-accent ring-inset"
                  )}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="text-2xl md:text-3xl font-bold text-game-tile-foreground drop-shadow-lg">
                    {tileNumber}
                  </span>
                </div>
              </div>
            )
          })}
        </div>


      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={revealRandomTile}
          disabled={isAnimating || allRevealed}
          size="lg"
          className="gap-2 px-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          <Shuffle className={cn("w-5 h-5", isAnimating && "animate-spin")} />
          Revelar Parte
        </Button>
        <Button
          onClick={revealAll}
          disabled={allRevealed}
          variant="secondary"
          size="lg"
          className="gap-2 px-6 py-6 text-base font-semibold"
        >
          <Eye className="w-5 h-5" />
          Solução
        </Button>
        {hasNextImage && (
          <Button
            onClick={handleNextImage}
            variant="outline"
            size="lg"
            className="gap-2 px-6 py-6 text-base font-semibold"
          >
            <SkipForward className="w-5 h-5" />
            Próxima Imagem
          </Button>
        )}
      </div>
    </div>
  )
}
