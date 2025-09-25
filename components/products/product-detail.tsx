"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw } from "lucide-react"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedInstallment, setSelectedInstallment] = useState(3)

  // 模拟商品详情数据
  const product = {
    id: productId,
    name: "iPhone 15 Pro Max 256GB 深空黑色",
    price: 9999,
    originalPrice: 10999,
    images: [
      "/iphone-15-pro-max-black-front-view.jpg",
      "/iphone-15-pro-max-black-back-view.jpg",
      "/iphone-15-pro-max-black-side-view.jpg",
      "/iphone-15-pro-max-black-accessories.jpg",
    ],
    rating: 4.8,
    reviews: 1234,
    category: "手机数码",
    merchant: "苹果官方旗舰店",
    installmentOptions: [
      { periods: 3, monthlyPayment: 3333, totalInterest: 0 },
      { periods: 6, monthlyPayment: 1667, totalInterest: 0 },
      { periods: 12, monthlyPayment: 833, totalInterest: 0 },
      { periods: 24, monthlyPayment: 417, totalInterest: 200 },
    ],
    specifications: {
      屏幕尺寸: "6.7英寸",
      存储容量: "256GB",
      处理器: "A17 Pro芯片",
      摄像头: "4800万像素主摄",
      电池: "4441mAh",
      颜色: "深空黑色",
    },
    description:
      "iPhone 15 Pro Max 采用钛金属设计，搭载强大的A17 Pro芯片，配备专业级摄像头系统，支持5G网络，为您带来卓越的使用体验。",
    features: [
      "钛金属坚固轻盈设计",
      "A17 Pro芯片，性能强劲",
      "4800万像素主摄像头",
      "支持5G网络连接",
      "Face ID面容识别",
      "无线充电支持",
    ],
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge className="bg-accent text-accent-foreground">官方正品</Badge>
              <Badge variant="destructive">-{discount}%</Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews}条评价)
              </span>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">¥{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">¥{product.originalPrice}</span>
            </div>
            <p className="text-sm text-muted-foreground">商户：{product.merchant}</p>
          </div>

          {/* Installment Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">分期付款选项</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.installmentOptions.map((option) => (
                <div
                  key={option.periods}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInstallment === option.periods
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedInstallment(option.periods)}
                >
                  <div>
                    <span className="font-medium">{option.periods}期</span>
                    {option.totalInterest === 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        免息
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">¥{option.monthlyPayment}/月</div>
                    {option.totalInterest > 0 && (
                      <div className="text-xs text-muted-foreground">含利息¥{option.totalInterest}</div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button className="flex-1 gap-2" size="lg">
                <ShoppingCart className="h-4 w-4" />
                立即购买
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">正品保障</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">免费配送</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">7天退换</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">商品规格</TabsTrigger>
            <TabsTrigger value="features">产品特色</TabsTrigger>
            <TabsTrigger value="reviews">用户评价</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">用户评价功能开发中...</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
