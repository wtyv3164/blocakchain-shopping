"use client"

import { useState } from "react"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { MerchantDashboard } from "@/components/dashboard/merchant-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"user" | "merchant">("user")

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <div>
              <h1 className="text-2xl font-bold">控制台</h1>
              <p className="text-gray-600">管理您的账户和业务数据</p>
            </div>
          </div>
        </div>

        {/* 用户类型切换 */}
        <Tabs value={userType} onValueChange={(value) => setUserType(value as "user" | "merchant")}>
          <TabsList className="mb-6">
            <TabsTrigger value="user">用户控制台</TabsTrigger>
            <TabsTrigger value="merchant">商户控制台</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <UserDashboard userId="user-123" />
          </TabsContent>

          <TabsContent value="merchant">
            <MerchantDashboard merchantId="merchant-456" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
