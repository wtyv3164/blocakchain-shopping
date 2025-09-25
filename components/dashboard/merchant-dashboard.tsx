"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import Link from "next/link"

interface MerchantDashboardProps {
  merchantId: string
}

export function MerchantDashboard({ merchantId }: MerchantDashboardProps) {
  // 模拟商户数据
  const [merchantData] = useState({
    name: "科技数码专营店",
    totalSales: 1250000,
    monthlyGrowth: 15.8,
    totalOrders: 342,
    activeProducts: 28,
    avgCreditScore: 745,
    salesData: [
      { month: "1月", sales: 180000, orders: 45 },
      { month: "2月", sales: 220000, orders: 58 },
      { month: "3月", sales: 195000, orders: 52 },
      { month: "4月", sales: 240000, orders: 63 },
      { month: "5月", sales: 280000, orders: 72 },
      { month: "6月", sales: 315000, orders: 82 },
    ],
    recentOrders: [
      {
        id: "ORD-2024-001240",
        customerName: "李四",
        productName: "iPhone 15 Pro Max",
        amount: 9999,
        installments: 6,
        status: "active",
        date: "2024-06-12",
        creditScore: 780,
      },
      {
        id: "ORD-2024-001239",
        customerName: "王五",
        productName: "MacBook Air M3",
        amount: 12999,
        installments: 12,
        status: "completed",
        date: "2024-06-10",
        creditScore: 720,
      },
      {
        id: "ORD-2024-001238",
        customerName: "赵六",
        productName: "iPad Pro",
        amount: 8999,
        installments: 6,
        status: "processing",
        date: "2024-06-08",
        creditScore: 690,
      },
    ],
    topProducts: [
      { name: "iPhone 15 Pro Max", sales: 45, revenue: 449550 },
      { name: "MacBook Air M3", sales: 32, revenue: 415968 },
      { name: "iPad Pro", sales: 28, revenue: 251972 },
      { name: "AirPods Pro", sales: 67, revenue: 134000 },
    ],
    riskAlerts: [
      {
        id: "1",
        type: "overdue",
        title: "逾期风险提醒",
        message: "客户张三的订单 ORD-2024-001235 已逾期3天",
        severity: "high",
      },
      {
        id: "2",
        type: "credit",
        title: "信用评分下降",
        message: "客户李四的信用评分下降至650分，建议关注",
        severity: "medium",
      },
    ],
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-700">分期中</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700">已完成</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-700">处理中</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">未知</Badge>
    }
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-blue-600"
    if (score >= 550) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* 商户欢迎区域 */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">欢迎回来，{merchantData.name}！</h1>
        <p className="text-green-100">管理您的商品销售和客户信用</p>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">¥{merchantData.totalSales.toLocaleString()}</div>
                <div className="text-sm text-gray-600">总销售额</div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />+{merchantData.monthlyGrowth}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{merchantData.totalOrders}</div>
                <div className="text-sm text-gray-600">总订单数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{merchantData.activeProducts}</div>
                <div className="text-sm text-gray-600">在售商品</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{merchantData.avgCreditScore}</div>
                <div className="text-sm text-gray-600">客户平均信用分</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 销售趋势图表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                销售趋势分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales">
                <TabsList>
                  <TabsTrigger value="sales">销售额</TabsTrigger>
                  <TabsTrigger value="orders">订单量</TabsTrigger>
                </TabsList>
                <TabsContent value="sales">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={merchantData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="orders">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={merchantData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* 最近订单 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>最近订单</CardTitle>
                <Link href="/merchants/orders">
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {merchantData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{order.productName}</div>
                      <div className="text-sm text-gray-600">
                        客户: {order.customerName} • {order.installments}期分期
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.date} • {order.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">¥{order.amount.toLocaleString()}</div>
                      <div className={`text-sm ${getCreditScoreColor(order.creditScore)}`}>
                        信用分: {order.creditScore}
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/merchants/products">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  商品管理
                </Button>
              </Link>
              <Link href="/merchants/orders">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  订单管理
                </Button>
              </Link>
              <Link href="/merchants/credit">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  客户信用分析
                </Button>
              </Link>
              <Link href="/merchants/reports">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  销售报表
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 热销商品 */}
          <Card>
            <CardHeader>
              <CardTitle>热销商品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {merchantData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">销量: {product.sales}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">¥{product.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 风险提醒 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                风险提醒
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {merchantData.riskAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.severity === "high" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"
                    }`}
                  >
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{alert.message}</div>
                    <Button size="sm" variant="outline" className="mt-2 h-6 text-xs bg-transparent">
                      处理
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
