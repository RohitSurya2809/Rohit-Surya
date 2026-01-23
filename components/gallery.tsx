"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["all", "projects", "events", "mockups"]

  const galleryItems = [
    {
      id: 1,
      title: "YUGI - GNN Content Recommendation",
      category: "projects",
      description: "Graph Neural Network-based content recommendation system",
      size: "large",
    }
  ]

  const filteredItems = selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1))
    setSelectedImage(filteredItems[currentImageIndex === 0 ? filteredItems.length - 1 : currentImageIndex - 1])
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1))
    setSelectedImage(filteredItems[currentImageIndex === filteredItems.length - 1 ? 0 : currentImageIndex + 1])
  }

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Project showcases, hackathon achievements, and design mockups
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentImageIndex(0)
                  setSelectedImage(null)
                }}
                className={cn(
                  "capitalize px-6 py-2 transition-all",
                  selectedCategory === category
                    ? "bg-secondary text-white hover:bg-secondary/90"
                    : "bg-muted text-foreground hover:bg-muted/80",
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid - Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max mb-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedImage(item)
                  setCurrentImageIndex(filteredItems.indexOf(item))
                }}
                className={cn(
                  "bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                  item.size === "large" ? "md:col-span-2 md:row-span-2" : "",
                  item.size === "medium" ? "md:col-span-1" : "",
                )}
              >
                <div className="aspect-square md:aspect-auto relative overflow-hidden bg-muted flex items-center justify-center h-48 md:h-64 lg:h-80">
                  {/* Placeholder content */}
                  <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center group-hover:bg-secondary/10 transition-all">
                    <div className="text-3xl font-bold text-secondary mb-2 opacity-20 group-hover:opacity-40 transition-opacity">
                      {item.id}
                    </div>
                    <h3 className="font-bold text-foreground text-sm group-hover:text-secondary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Image Area */}
                <div className="relative bg-muted flex items-center justify-center aspect-video overflow-hidden">
                  <div className="text-6xl font-bold text-secondary/20 absolute">{selectedImage.id}</div>
                  <div className="text-center p-8 w-full z-10">
                    <div className="text-4xl font-bold text-secondary mb-4 opacity-40">{selectedImage.id}</div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrevImage()
                    }}
                    className="absolute left-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-20"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNextImage()
                    }}
                    className="absolute right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-20"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Image Info */}
                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h3>
                    <p className="text-muted-foreground">{selectedImage.description}</p>
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium capitalize">
                        {selectedImage.category}
                      </span>
                    </div>
                  </div>

                  {/* Counter */}
                  <div className="text-sm text-muted-foreground border-t pt-4">
                    {currentImageIndex + 1} of {filteredItems.length}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-30"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
