"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, ShoppingCart, CreditCard } from "lucide-react"

interface CreditReportsProps {
  userType: "user" | "merchant" | "admin"
}

export function CreditReports({ userType }: CreditReportsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // 模拟数据
  const creditTrendData = [
    { month: "1月", score: 720, payments: 15, overdue: 1 },
    { month: "2月", score: 735, payments: 18, overdue: 0 },
    { month: "3月", score: 725, payments: 20, overdue: 2 },
    { month: "4月", score: 740, payments: 22, overdue: 1 },
    { month: "5月", score: 755, payments: 25, overdue: 0 },
    { month: "6月", score: 760, payments: 28, overdue: 0 },
  ]

  const paymentStatusData = [
    { name: "按时还款", value: 85, color: "#10B981" },
    { name: "逾期还款", value: 12, color: "#F59E0B" },
    { name: "严重逾期", value: 3, color: "#EF4444" },
  ]

  const userCreditDistribution = [
    { range: "300-500", count: 120, percentage: 8 },
    { range: "500-600", count: 280, percentage: 18 },
    { range: "600-700", count: 450, percentage: 30 },
    { range: "700-800", count: 520, percentage: 35 },
    { range: "800-850", count: 130, percentage: 9 },
  ]

  const merchantSalesData = [
    { month: "1月", sales: 125000, orders: 45, avgCredit: 720 },
    { month: "2月", sales: 148000, orders: 52, avgCredit: 735 },
    { month: "3月", sales: 162000, orders: 58, avgCredit: 740 },
    { month: "4月", sales: 178000, orders: 63, avgCredit: 745 },
    { month: "5月", sales: 195000, orders: 68, avgCredit: 750 },
    { month: "6月", sales: 210000, orders: 72, avgCredit: 755 },
  ]

  const renderUserReports = () => (
    <div className="space-y-6">
      {/* 个人信用趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            信用分数趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={creditTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={["dataMin - 20", "dataMax + 20"]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 还款状态分布 */}
      <Card>
        <CardHeader>
          <CardTitle>还款状态分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {paymentStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMerchantReports = () => (
    <div className="space-y-6">
      {/* 销售与信用关联分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            销售与客户信用分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={merchantSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="sales" fill="#10B981" name="销售额" />
              <Line yAxisId="right" type="monotone" dataKey="avgCredit" stroke="#3B82F6" name="平均信用分" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 客户信用等级分布 */}
      <Card>
        <CardHeader>
          <CardTitle>客户信用等级分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userCreditDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{item.range} 分</span>
                  <span className="text-sm text-gray-600 ml-2">({item.percentage}%)</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.count} 人</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage * 2}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdminReports = () => (
    <div className="space-y-6">
      {/* 平台信用概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">1,500</div>
                <div className="text-sm text-gray-600">总用户数</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">742</div>
                <div className="text-sm text-gray-600">平均信用分</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">92.5%</div>
                <div className="text-sm text-gray-600">按时还款率</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">¥2.1M</div>
                <div className="text-sm text-gray-600">月交易额</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 用户信用分布 */}
      <Card>
        <CardHeader>
          <CardTitle>平台用户信用分布</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userCreditDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">信用报表</h1>
          <p className="text-gray-600">
            {userType === "user" && "查看您的个人信用记录和趋势分析"}
            {userType === "merchant" && "分析客户信用状况和销售关联数据"}
            {userType === "admin" && "监控平台整体信用状况和风险指标"}
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          导出报表
        </Button>
      </div>

      {/* 时间筛选 */}
      <Card>
        <CardContent className="p-4">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList>
              <TabsTrigger value="week">本周</TabsTrigger>
              <TabsTrigger value="month">本月</TabsTrigger>
              <TabsTrigger value="quarter">本季度</TabsTrigger>
              <TabsTrigger value="year">本年</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* 根据用户类型显示不同报表 */}
      {userType === "user" && renderUserReports()}
      {userType === "merchant" && renderMerchantReports()}
      {userType === "admin" && renderAdminReports()}
    </div>
  )
}
