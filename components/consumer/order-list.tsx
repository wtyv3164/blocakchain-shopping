"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Package, Truck, CheckCircle, Clock, CreditCard, MessageCircle } from "lucide-react"

// 模拟订单数据
const orders = [
  {
    id: "ORD-2024-001",
    product: "iPhone 15 Pro Max",
    image: "/iphone-15-pro-max.png",
    amount: 9999,
    status: "shipped",
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-18",
    installment: {
      periods: 12,
      monthlyPayment: 833,
      nextPaymentDate: "2024-01-25",
    },
    trackingNumber: "SF1234567890",
  },
  {
    id: "ORD-2024-002",
    product: "MacBook Pro 14英寸",
    image: "/macbook-pro-14-inch.png",
    amount: 15999,
    status: "paid",
    orderDate: "2024-01-14",
    expectedDelivery: "2024-01-20",
    installment: {
      periods: 24,
      monthlyPayment: 666,
      nextPaymentDate: "2024-01-28",
    },
  },
  {
    id: "ORD-2024-003",
    product: "Nike Air Jordan 1",
    image: "/nike-air-jordan-1-sneakers.jpg",
    amount: 1299,
    status: "delivered",
    orderDate: "2024-01-10",
    deliveredDate: "2024-01-13",
    installment: {
      periods: 6,
      monthlyPayment: 216,
      nextPaymentDate: "2024-01-20",
    },
  },
  {
    id: "ORD-2024-004",
    product: "戴森V15吸尘器",
    image: "/dyson-v15-vacuum-cleaner.jpg",
    amount: 3999,
    status: "pending",
    orderDate: "2024-01-16",
    installment: {
      periods: 12,
      monthlyPayment: 333,
      firstPaymentDate: "2024-01-20",
    },
  },
]

export function OrderList() {
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            待付款
          </Badge>
        )
      case "paid":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <CreditCard className="w-3 h-3 mr-1" />
            已付款
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            <Truck className="w-3 h-3 mr-1" />
            已发货
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <Package className="w-3 h-3 mr-1" />
            已送达
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            已完成
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const handleAction = (order: any, action: string) => {
    toast({
      title: `${action}操作`,
      description: `正在处理订单 ${order.id} 的${action}请求`,
    })
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Product Image */}
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>

              {/* Order Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{order.product}</h3>
                    <p className="text-sm text-muted-foreground">订单号: {order.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">¥{order.amount.toLocaleString()}</div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Installment Info */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">分期信息:</span>
                    <span className="font-medium">
                      {order.installment.periods}期 × ¥{order.installment.monthlyPayment}/月
                    </span>
                  </div>
                  {order.installment.nextPaymentDate && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">下次还款:</span>
                      <span className="font-medium">{order.installment.nextPaymentDate}</span>
                    </div>
                  )}
                  {order.installment.firstPaymentDate && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">首次还款:</span>
                      <span className="font-medium">{order.installment.firstPaymentDate}</span>
                    </div>
                  )}
                </div>

                {/* Order Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">下单时间: {order.orderDate}</span>
                  {order.expectedDelivery && (
                    <span className="text-muted-foreground">预计送达: {order.expectedDelivery}</span>
                  )}
                  {order.deliveredDate && <span className="text-green-600">送达时间: {order.deliveredDate}</span>}
                </div>

                {/* Tracking Number */}
                {order.trackingNumber && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">物流单号: </span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{order.trackingNumber}</code>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      className="blockchain-gradient text-white border-0"
                      onClick={() => handleAction(order, "付款")}
                    >
                      立即付款
                    </Button>
                  )}
                  {order.status === "shipped" && (
                    <Button variant="outline" size="sm" onClick={() => handleAction(order, "查看物流")}>
                      <Truck className="w-4 h-4 mr-2" />
                      查看物流
                    </Button>
                  )}
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm" onClick={() => handleAction(order, "确认收货")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      确认收货
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleAction(order, "联系客服")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    联系客服
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction(order, "查看详情")}>
                    查看详情
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
