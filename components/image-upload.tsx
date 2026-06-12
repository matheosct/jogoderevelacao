"use client"

import { useCallback, useState } from "react"
import { Upload, ImageIcon, X, Images } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onImagesSelect: (images: string[]) => void
  currentImages: string[]
}

export function ImageUpload({ onImagesSelect, currentImages }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList) => {
      const validFiles = Array.from(files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/jpg"
      )

      if (validFiles.length === 0) {
        alert("Por favor, envie apenas arquivos .jpg")
        return
      }

      const readers = validFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(readers).then((newImages) => {
        onImagesSelect([...currentImages, ...newImages])
      })
    },
    [onImagesSelect, currentImages]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles]
  )

  const removeImage = useCallback(
    (index: number) => {
      const newImages = currentImages.filter((_, i) => i !== index)
      onImagesSelect(newImages)
    },
    [currentImages, onImagesSelect]
  )

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      {/* Área de upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input
          type="file"
          accept=".jpg,.jpeg"
          multiple
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Images className="w-7 h-7 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground mb-1">
            Arraste imagens aqui
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            ou clique para selecionar
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            <Upload className="w-3.5 h-3.5" />
            Apenas .jpg (múltiplas imagens)
          </span>
        </div>
      </div>

      {/* Preview das imagens */}
      {currentImages.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              {currentImages.length} {currentImages.length === 1 ? "imagem selecionada" : "imagens selecionadas"}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onImagesSelect([])}
              className="text-muted-foreground hover:text-destructive"
            >
              Limpar tudo
            </Button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-background" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-foreground/60 text-background text-xs text-center py-0.5">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
