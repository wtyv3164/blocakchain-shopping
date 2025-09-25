"use client"

import { useState } from "react"
import { InstallmentCalculator } from "@/components/payment/installment-calculator"
import { PaymentForm } from "@/components/payment/payment-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentStep, setPaymentStep] = useState<"plan" | "payment" | "success">("plan")

  // 模拟商品数据
  const product = {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 9999,
    image: "/iphone-15-pro-max-black-smartphone.jpg",
  }

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan)
  }

  const handlePaymentSubmit = (paymentData: any) => {
    console.log("[v0] Payment submitted:", paymentData)
    setPaymentStep("success")
  }

  const handleProceedToPayment = () => {
    if (selectedPlan) {
      setPaymentStep("payment")
    }
  }

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">支付成功！</h1>
              <p className="text-gray-600 mb-6">您的订单已成功创建，分期付款计划已生效</p>
              <div className="space-y-2 mb-6">
                <Button onClick={() => router.push("/orders")} className="w-full">
                  查看订单详情
                </Button>
                <Button variant="outline" onClick={() => router.push("/products")} className="w-full">
                  继续购物
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <h1 className="text-2xl font-bold">{paymentStep === "plan" ? "选择分期方案" : "确认支付"}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 商品信息 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>商品信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">¥{product.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主要内容区域 */}
          <div className="lg:col-span-2">
            {paymentStep === "plan" ? (
              <div className="space-y-6">
                <InstallmentCalculator productPrice={product.price} onPlanSelect={handlePlanSelect} />
                {selectedPlan && (
                  <div className="flex justify-end">
                    <Button onClick={handleProceedToPayment} size="lg">
                      确认分期方案，继续支付
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <PaymentForm
                amount={product.price}
                installmentPlan={selectedPlan}
                onPaymentSubmit={handlePaymentSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
