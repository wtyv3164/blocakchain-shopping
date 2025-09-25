"use client"

import { useState } from "react"
import { CreditScoreCard } from "@/components/credit/credit-score-card"
import { CreditHistory } from "@/components/credit/credit-history"
import { CreditReports } from "@/components/credit/credit-reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreditPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // 模拟用户信用数据
  const userCreditData = {
    userId: "user-123",
    score: 742,
    level: "good" as const,
    trend: "up" as const,
    lastUpdated: "2024-06-15",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <div>
            <h1 className="text-2xl font-bold">信用管理</h1>
            <p className="text-gray-600">管理和查看您的信用记录</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">信用概览</TabsTrigger>
            <TabsTrigger value="history">信用记录</TabsTrigger>
            <TabsTrigger value="reports">统计报表</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <CreditScoreCard
                  userId={userCreditData.userId}
                  score={userCreditData.score}
                  level={userCreditData.level}
                  trend={userCreditData.trend}
                  lastUpdated={userCreditData.lastUpdated}
                />
              </div>
              <div className="lg:col-span-2">
                <CreditReports userType="user" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <CreditHistory userId={userCreditData.userId} />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <CreditReports userType="user" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
