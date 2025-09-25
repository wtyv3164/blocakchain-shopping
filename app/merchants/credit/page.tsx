"use client"

import { CreditReports } from "@/components/credit/credit-reports"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MerchantCreditPage() {
  const router = useRouter()

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
            <h1 className="text-2xl font-bold">客户信用分析</h1>
            <p className="text-gray-600">分析客户信用状况，优化销售策略</p>
          </div>
        </div>

        <CreditReports userType="merchant" />
      </div>
    </div>
  )
}
