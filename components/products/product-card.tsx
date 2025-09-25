"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    category: string
    merchant: string
    installmentOptions: number[]
    isNew?: boolean
    isFeatured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isNew && <Badge className="bg-accent text-accent-foreground">新品</Badge>}
          {product.isFeatured && <Badge className="bg-primary text-primary-foreground">精选</Badge>}
          {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 p-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{product.merchant}</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 font-semibold line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>

        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-primary">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">¥{product.originalPrice}</span>
          )}
        </div>

        <div className="mb-3 text-xs text-muted-foreground">支持分期：{product.installmentOptions.join("/")}期免息</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          立即购买
        </Button>
      </CardFooter>
    </Card>
  )
}
