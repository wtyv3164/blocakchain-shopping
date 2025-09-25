"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingCart,
  CreditCard,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Wallet,
  Shield,
  Bell,
} from "lucide-react"
import Link from "next/link"

interface UserDashboardProps {
  userId: string
}

export function UserDashboard({ userId }: UserDashboardProps) {
  // 模拟用户数据
  const [userData] = useState({
    name: "张三",
    creditScore: 742,
    creditLevel: "good",
    totalOrders: 12,
    activeInstallments: 3,
    totalSpent: 45600,
    nextPayment: {
      amount: 1766.5,
      dueDate: "2024-07-15",
      orderId: "ORD-2024-001234",
    },
    recentOrders: [
      {
        id: "ORD-2024-001236",
        productName: "iPad Pro 12.9英寸",
        amount: 8999,
        status: "processing",
        date: "2024-06-10",
        installments: 6,
      },
      {
        id: "ORD-2024-001235",
        productName: "MacBook Air M3",
        amount: 12999,
        status: "completed",
        date: "2024-05-20",
        installments: 12,
      },
      {
        id: "ORD-2024-001234",
        productName: "iPhone 15 Pro Max",
        amount: 9999,
        status: "active",
        date: "2024-04-15",
        installments: 6,
      },
    ],
    notifications: [
      {
        id: "1",
        type: "payment",
        title: "还款提醒",
        message: "您有一笔¥1,766.5的还款将于3天后到期",
        time: "2小时前",
        urgent: true,
      },
      {
        id: "2",
        type: "credit",
        title: "信用分数更新",
        message: "您的信用分数已更新为742分，较上月提升了17分",
        time: "1天前",
        urgent: false,
      },
      {
        id: "3",
        type: "order",
        title: "订单状态更新",
        message: "您的订单 ORD-2024-001236 已发货",
        time: "2天前",
        urgent: false,
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

  const getCreditLevelColor = (level: string) => {
    switch (level) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const creditProgress = (userData.creditScore / 850) * 100

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">欢迎回来，{userData.name}！</h1>
        <p className="text-blue-100">管理您的分期购物和信用记录</p>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userData.totalOrders}</div>
                <div className="text-sm text-gray-600">总订单数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userData.activeInstallments}</div>
                <div className="text-sm text-gray-600">进行中分期</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">¥{userData.totalSpent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">累计消费</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${getCreditLevelColor(userData.creditLevel)}`}>
                  {userData.creditScore}
                </div>
                <div className="text-sm text-gray-600">信用分数</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 下次还款提醒 */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Clock className="h-5 w-5" />
                下次还款提醒
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-800">¥{userData.nextPayment.amount}</div>
                  <div className="text-sm text-orange-600">到期日期: {userData.nextPayment.dueDate}</div>
                  <div className="text-xs text-orange-500">订单号: {userData.nextPayment.orderId}</div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">立即还款</Button>
              </div>
            </CardContent>
          </Card>

          {/* 信用分数概览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                信用分数概览
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{userData.creditScore}</span>
                <Badge className="bg-blue-100 text-blue-700">良好</Badge>
              </div>
              <Progress value={creditProgress} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>300</span>
                <span>850</span>
              </div>
              <div className="flex justify-between">
                <Link href="/credit">
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </Link>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  较上月 +17
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 最近订单 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>最近订单</CardTitle>
                <Link href="/orders">
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{order.productName}</div>
                      <div className="text-sm text-gray-600">
                        {order.date} • {order.installments}期分期
                      </div>
                      <div className="text-xs text-gray-500">{order.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">¥{order.amount.toLocaleString()}</div>
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
              <Link href="/products">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  浏览商品
                </Button>
              </Link>
              <Link href="/repayment">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  还款管理
                </Button>
              </Link>
              <Link href="/blockchain">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  区块链记录
                </Button>
              </Link>
              <Link href="/credit">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  信用管理
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 通知中心 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                通知中心
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.urgent ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {notification.urgent ? (
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{notification.message}</div>
                        <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                      </div>
                    </div>
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
