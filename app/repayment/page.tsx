"use client"

import { RepaymentSchedule } from "@/components/payment/repayment-schedule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RepaymentPage() {
  const router = useRouter()

  // 模拟订单数据
  const orderData = {
    orderId: "ORD-2024-001234",
    productName: "iPhone 15 Pro Max",
    totalAmount: 10599,
    monthlyAmount: 1766.5,
    periods: 6,
    startDate: "2024-01-15",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <div>
              <h1 className="text-2xl font-bold">还款管理</h1>
              <p className="text-gray-600">管理您的分期付款计划</p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出账单
          </Button>
        </div>

        {/* 订单信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>订单信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">商品名称</div>
                <div className="font-medium">{orderData.productName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">订单号</div>
                <div className="font-medium">{orderData.orderId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">分期总额</div>
                <div className="font-medium text-blue-600">¥{orderData.totalAmount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">每期金额</div>
                <div className="font-medium text-green-600">¥{orderData.monthlyAmount}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 还款计划 */}
        <RepaymentSchedule
          orderId={orderData.orderId}
          totalAmount={orderData.totalAmount}
          monthlyAmount={orderData.monthlyAmount}
          periods={orderData.periods}
          startDate={orderData.startDate}
        />
      </div>
    </div>
  )
}
