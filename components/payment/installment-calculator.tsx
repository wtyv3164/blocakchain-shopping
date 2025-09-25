"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, CreditCard, Calendar, AlertCircle } from "lucide-react"

interface InstallmentPlan {
  periods: number
  monthlyAmount: number
  totalAmount: number
  interestRate: number
  processingFee: number
}

interface InstallmentCalculatorProps {
  productPrice: number
  onPlanSelect: (plan: InstallmentPlan) => void
}

export function InstallmentCalculator({ productPrice, onPlanSelect }: InstallmentCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<InstallmentPlan | null>(null)
  const [plans, setPlans] = useState<InstallmentPlan[]>([])

  useEffect(() => {
    // 计算不同分期方案
    const calculatePlans = () => {
      const planOptions = [
        { periods: 3, interestRate: 0.05, processingFee: 20 },
        { periods: 6, interestRate: 0.08, processingFee: 30 },
        { periods: 12, interestRate: 0.12, processingFee: 50 },
        { periods: 24, interestRate: 0.18, processingFee: 80 },
      ]

      return planOptions.map((option) => {
        const totalInterest = productPrice * option.interestRate
        const totalAmount = productPrice + totalInterest + option.processingFee
        const monthlyAmount = totalAmount / option.periods

        return {
          periods: option.periods,
          monthlyAmount: Math.round(monthlyAmount * 100) / 100,
          totalAmount: Math.round(totalAmount * 100) / 100,
          interestRate: option.interestRate,
          processingFee: option.processingFee,
        }
      })
    }

    setPlans(calculatePlans())
  }, [productPrice])

  const handlePlanSelect = (plan: InstallmentPlan) => {
    setSelectedPlan(plan)
    onPlanSelect(plan)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">分期付款方案</h3>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.periods}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPlan?.periods === plan.periods ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{plan.periods}期分期</span>
                  </div>
                  {plan.periods === 6 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      推荐
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">¥{plan.monthlyAmount}/月</div>
                  <div className="text-sm text-gray-500">总计 ¥{plan.totalAmount}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>利率: {(plan.interestRate * 100).toFixed(1)}%</span>
                  <span>手续费: ¥{plan.processingFee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{plan.periods}个月</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              分期详情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>商品价格:</span>
              <span>¥{productPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>利息费用:</span>
              <span>¥{(selectedPlan.totalAmount - productPrice - selectedPlan.processingFee).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>手续费:</span>
              <span>¥{selectedPlan.processingFee}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>总计:</span>
              <span>¥{selectedPlan.totalAmount}</span>
            </div>
            <div className="flex justify-between text-blue-600 font-medium">
              <span>每月还款:</span>
              <span>¥{selectedPlan.monthlyAmount}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
