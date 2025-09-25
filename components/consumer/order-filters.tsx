"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OrderFilters() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("all")

  const statusOptions = [
    { value: "all", label: "全部订单", count: 25 },
    { value: "pending", label: "待付款", count: 2 },
    { value: "paid", label: "已付款", count: 8 },
    { value: "shipped", label: "已发货", count: 6 },
    { value: "delivered", label: "已送达", count: 7 },
    { value: "completed", label: "已完成", count: 2 },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status.value)}
                className="flex items-center gap-2"
              >
                {status.label}
                <Badge variant="secondary" className="text-xs">
                  {status.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">时间范围:</span>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="week">最近一周</SelectItem>
                <SelectItem value="month">最近一月</SelectItem>
                <SelectItem value="quarter">最近三月</SelectItem>
                <SelectItem value="year">最近一年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
