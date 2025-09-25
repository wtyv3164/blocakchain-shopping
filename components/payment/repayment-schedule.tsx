"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock, AlertTriangle, CreditCard } from "lucide-react"

interface RepaymentItem {
  period: number
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
  paidDate?: string
}

interface RepaymentScheduleProps {
  orderId: string
  totalAmount: number
  monthlyAmount: number
  periods: number
  startDate: string
}

export function RepaymentSchedule({ orderId, totalAmount, monthlyAmount, periods, startDate }: RepaymentScheduleProps) {
  const [schedule, setSchedule] = useState<RepaymentItem[]>(() => {
    // 生成还款计划
    const items: RepaymentItem[] = []
    const start = new Date(startDate)

    for (let i = 1; i <= periods; i++) {
      const dueDate = new Date(start)
      dueDate.setMonth(start.getMonth() + i)

      // 模拟一些已还款和逾期的状态
      let status: "paid" | "pending" | "overdue" = "pending"
      let paidDate: string | undefined

      if (i <= 2) {
        status = "paid"
        paidDate = new Date(dueDate.getTime() - 86400000).toISOString().split("T")[0]
      } else if (i === 3 && dueDate < new Date()) {
        status = "overdue"
      }

      items.push({
        period: i,
        dueDate: dueDate.toISOString().split("T")[0],
        amount: monthlyAmount,
        status,
        paidDate,
      })
    }

    return items
  })

  const handlePayment = (period: number) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.period === period ? { ...item, status: "paid", paidDate: new Date().toISOString().split("T")[0] } : item,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-700">已还款</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-700">逾期</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-700">待还款</Badge>
    }
  }

  const paidCount = schedule.filter((item) => item.status === "paid").length
  const overdueCount = schedule.filter((item) => item.status === "overdue").length
  const paidAmount = paidCount * monthlyAmount

  return (
    <div className="space-y-6">
      {/* 还款概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            还款概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{paidCount}</div>
              <div className="text-sm text-gray-600">已还期数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">¥{paidAmount}</div>
              <div className="text-sm text-gray-600">已还金额</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{periods - paidCount - overdueCount}</div>
              <div className="text-sm text-gray-600">待还期数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
              <div className="text-sm text-gray-600">逾期期数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 还款计划详情 */}
      <Card>
        <CardHeader>
          <CardTitle>还款计划详情</CardTitle>
          <p className="text-sm text-gray-600">订单号: {orderId}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule.map((item) => (
              <div
                key={item.period}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  item.status === "overdue"
                    ? "border-red-200 bg-red-50"
                    : item.status === "paid"
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <div className="font-medium">第 {item.period} 期</div>
                    <div className="text-sm text-gray-600">
                      到期日期: {item.dueDate}
                      {item.paidDate && <span className="ml-2 text-green-600">(已于 {item.paidDate} 还款)</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">¥{item.amount}</div>
                    {getStatusBadge(item.status)}
                  </div>

                  {item.status === "pending" || item.status === "overdue" ? (
                    <Button
                      size="sm"
                      onClick={() => handlePayment(item.period)}
                      className={item.status === "overdue" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      <CreditCard className="h-3 w-3 mr-1" />
                      立即还款
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 还款提醒设置 */}
      <Card>
        <CardHeader>
          <CardTitle>还款提醒</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">短信提醒</div>
                <div className="text-sm text-gray-600">还款日前3天发送短信提醒</div>
              </div>
              <Badge className="bg-green-100 text-green-700">已开启</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">邮件提醒</div>
                <div className="text-sm text-gray-600">还款日前1天发送邮件提醒</div>
              </div>
              <Badge className="bg-green-100 text-green-700">已开启</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">微信提醒</div>
                <div className="text-sm text-gray-600">还款日当天发送微信消息提醒</div>
              </div>
              <Badge className="bg-gray-100 text-gray-700">未开启</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
