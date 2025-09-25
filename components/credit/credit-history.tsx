"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, XCircle, Clock, Filter } from "lucide-react"

interface CreditRecord {
  id: string
  type: "payment" | "overdue" | "settlement"
  orderId: string
  productName: string
  amount: number
  dueDate: string
  actualDate?: string
  status: "completed" | "overdue" | "pending"
  impact: number // 对信用分的影响
}

interface CreditHistoryProps {
  userId: string
}

export function CreditHistory({ userId }: CreditHistoryProps) {
  const [selectedTab, setSelectedTab] = useState("all")

  // 模拟信用记录数据
  const [records] = useState<CreditRecord[]>([
    {
      id: "1",
      type: "payment",
      orderId: "ORD-2024-001234",
      productName: "iPhone 15 Pro Max",
      amount: 1766.5,
      dueDate: "2024-02-15",
      actualDate: "2024-02-14",
      status: "completed",
      impact: 5,
    },
    {
      id: "2",
      type: "payment",
      orderId: "ORD-2024-001234",
      productName: "iPhone 15 Pro Max",
      amount: 1766.5,
      dueDate: "2024-03-15",
      actualDate: "2024-03-15",
      status: "completed",
      impact: 5,
    },
    {
      id: "3",
      type: "overdue",
      orderId: "ORD-2024-001235",
      productName: "MacBook Air M3",
      amount: 2000,
      dueDate: "2024-03-20",
      actualDate: "2024-03-25",
      status: "overdue",
      impact: -15,
    },
    {
      id: "4",
      type: "settlement",
      orderId: "ORD-2024-001235",
      productName: "MacBook Air M3",
      amount: 2000,
      dueDate: "2024-03-20",
      actualDate: "2024-03-25",
      status: "completed",
      impact: 10,
    },
    {
      id: "5",
      type: "payment",
      orderId: "ORD-2024-001236",
      productName: "iPad Pro",
      amount: 1200,
      dueDate: "2024-04-10",
      status: "pending",
      impact: 0,
    },
  ])

  const getStatusIcon = (status: string, type: string) => {
    if (status === "completed") {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else if (status === "overdue") {
      return <XCircle className="h-4 w-4 text-red-600" />
    } else {
      return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string, type: string) => {
    if (status === "completed") {
      return <Badge className="bg-green-100 text-green-700">已完成</Badge>
    } else if (status === "overdue") {
      return <Badge className="bg-red-100 text-red-700">逾期</Badge>
    } else {
      return <Badge className="bg-yellow-100 text-yellow-700">待处理</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment":
        return "按时还款"
      case "overdue":
        return "逾期记录"
      case "settlement":
        return "逾期结清"
      default:
        return "未知"
    }
  }

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-600"
    if (impact < 0) return "text-red-600"
    return "text-gray-600"
  }

  const filteredRecords = records.filter((record) => {
    if (selectedTab === "all") return true
    if (selectedTab === "positive") return record.impact > 0
    if (selectedTab === "negative") return record.impact < 0
    if (selectedTab === "pending") return record.status === "pending"
    return true
  })

  const totalImpact = records.reduce((sum, record) => sum + record.impact, 0)
  const positiveRecords = records.filter((r) => r.impact > 0).length
  const negativeRecords = records.filter((r) => r.impact < 0).length

  return (
    <div className="space-y-6">
      {/* 统计概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            信用记录统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{records.length}</div>
              <div className="text-sm text-gray-600">总记录数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{positiveRecords}</div>
              <div className="text-sm text-gray-600">正面记录</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{negativeRecords}</div>
              <div className="text-sm text-gray-600">负面记录</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getImpactColor(totalImpact)}`}>
                {totalImpact > 0 ? "+" : ""}
                {totalImpact}
              </div>
              <div className="text-sm text-gray-600">总影响分数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 记录详情 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>信用记录详情</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="positive">正面</TabsTrigger>
              <TabsTrigger value="negative">负面</TabsTrigger>
              <TabsTrigger value="pending">待处理</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status, record.type)}
                      <div>
                        <div className="font-medium">{getTypeLabel(record.type)}</div>
                        <div className="text-sm text-gray-600">
                          {record.productName} - {record.orderId}
                        </div>
                        <div className="text-xs text-gray-500">
                          到期: {record.dueDate}
                          {record.actualDate && ` | 实际: ${record.actualDate}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium">¥{record.amount}</div>
                        <div className={`text-sm ${getImpactColor(record.impact)}`}>
                          {record.impact > 0 ? "+" : ""}
                          {record.impact} 分
                        </div>
                      </div>
                      {getStatusBadge(record.status, record.type)}
                    </div>
                  </div>
                ))}

                {filteredRecords.length === 0 && <div className="text-center py-8 text-gray-500">暂无相关记录</div>}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
