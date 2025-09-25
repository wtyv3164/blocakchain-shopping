"use client"

import { ProductCard } from "./product-card"

// 模拟商品数据
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB 深空黑色",
    price: 9999,
    originalPrice: 10999,
    image: "/iphone-15-pro-max-black-smartphone.jpg",
    rating: 4.8,
    reviews: 1234,
    category: "手机数码",
    merchant: "苹果官方旗舰店",
    installmentOptions: [3, 6, 12],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "MacBook Air M3 13英寸 午夜色 8GB+256GB",
    price: 8999,
    originalPrice: 9999,
    image: "/macbook-air-m3-midnight-laptop.jpg",
    rating: 4.9,
    reviews: 856,
    category: "电脑办公",
    merchant: "苹果官方旗舰店",
    installmentOptions: [3, 6, 12, 24],
    isFeatured: true,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 无线降噪耳机 黑色",
    price: 2399,
    originalPrice: 2899,
    image: "/sony-wh-1000xm5-black-headphones.jpg",
    rating: 4.7,
    reviews: 2341,
    category: "影音娱乐",
    merchant: "索尼官方旗舰店",
    installmentOptions: [3, 6],
    isNew: true,
  },
  {
    id: "4",
    name: "Nike Air Jordan 1 Mid 篮球鞋 黑红配色",
    price: 899,
    originalPrice: 1299,
    image: "/nike-air-jordan-1-mid-black-red-sneakers.jpg",
    rating: 4.6,
    reviews: 3456,
    category: "运动户外",
    merchant: "Nike官方旗舰店",
    installmentOptions: [3, 6],
  },
  {
    id: "5",
    name: "戴森V15 Detect无绳吸尘器 金色",
    price: 4990,
    originalPrice: 5490,
    image: "/dyson-v15-detect-gold-vacuum-cleaner.jpg",
    rating: 4.8,
    reviews: 1876,
    category: "家用电器",
    merchant: "戴森官方旗舰店",
    installmentOptions: [3, 6, 12],
    isFeatured: true,
  },
  {
    id: "6",
    name: "小米14 Ultra 16GB+512GB 黑色 徕卡影像",
    price: 6499,
    originalPrice: 6999,
    image: "/xiaomi-14-ultra-black-smartphone-leica-camera.jpg",
    rating: 4.7,
    reviews: 2134,
    category: "手机数码",
    merchant: "小米官方旗舰店",
    installmentOptions: [3, 6, 12],
    isNew: true,
  },
]

export function ProductGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
