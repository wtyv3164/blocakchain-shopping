"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderCreation } from "@/components/blockchain/order-creation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { OrderOnChain } from "@/lib/blockchain"

export default function CreateOrderPage() {
  const [orderCreated, setOrderCreated] = useState(false)

  // 模拟订单数据
  const orderData = {
    orderId: `ORDER_${Date.now()}`,
    userId: "user_123",
    merchantId: "merchant_456",
    productId: "product_789",
    productName: "iPhone 15 Pro Max 256GB 深空黑色",
    totalAmount: 9999,
    installmentPlan: {
      periods: 6,
      monthlyPayment: 1667,
      totalInterest: 0,
    },
  }

  const handleOrderComplete = (orderOnChain: OrderOnChain) => {
    setOrderCreated(true)
    console.log("[v0] Order successfully created on blockchain:", orderOnChain)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              返回商品页面
            </Button>
          </Link>
          <h1 className="text-2xl font-bold mb-2">创建订单</h1>
          <p className="text-muted-foreground">确认订单信息并将其安全存储到区块链</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 订单详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                订单详情
              </CardTitle>
              <CardDescription>请确认您的订单信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="/iphone-15-pro-max-black-smartphone.jpg"
                  alt={orderData.productName}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{orderData.productName}</h3>
                  <p className="text-sm text-muted-foreground">苹果官方旗舰店</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">商品价格</span>
                  <span className="font-medium">¥{orderData.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">分期方案</span>
                  <div className="text-right">
                    <div className="font-medium">{orderData.installmentPlan.periods}期免息</div>
                    <div className="text-sm text-muted-foreground">¥{orderData.installmentPlan.monthlyPayment}/月</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总利息</span>
                  <span className="font-medium text-accent">¥{orderData.installmentPlan.totalInterest}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>订单总额</span>
                  <span>¥{orderData.totalAmount + orderData.installmentPlan.totalInterest}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge className="bg-accent text-accent-foreground">区块链存证</Badge>
                <Badge variant="secondary">智能合约</Badge>
                <Badge variant="outline">免息分期</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 区块链存证 */}
          <OrderCreation orderData={orderData} onComplete={handleOrderComplete} />
        </div>

        {orderCreated && (
          <div className="mt-8 text-center">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">订单创建成功！</h3>
                <p className="text-muted-foreground mb-4">
                  您的订单已成功创建并存储到区块链，您可以在个人中心查看订单详情和还款计划。
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/profile">
                    <Button>查看我的订单</Button>
                  </Link>
                  <Link href="/blockchain">
                    <Button variant="outline" className="bg-transparent">
                      查看区块链记录
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
