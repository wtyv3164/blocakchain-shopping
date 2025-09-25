"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, AlertCircle, Shield, LinkIcon } from "lucide-react"
import { storeOrderOnBlockchain, type OrderOnChain } from "@/lib/blockchain"

interface OrderCreationProps {
  orderData: {
    orderId: string
    userId: string
    merchantId: string
    productId: string
    productName: string
    totalAmount: number
    installmentPlan: {
      periods: number
      monthlyPayment: number
      totalInterest: number
    }
  }
  onComplete?: (orderOnChain: OrderOnChain) => void
}

export function OrderCreation({ orderData, onComplete }: OrderCreationProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [orderOnChain, setOrderOnChain] = useState<OrderOnChain | null>(null)
  const [error, setError] = useState<string | null>(null)

  const steps = [
    { name: "验证订单信息", description: "检查订单数据完整性" },
    { name: "生成智能合约", description: "创建分期付款合约" },
    { name: "提交到区块链", description: "将订单数据写入区块链" },
    { name: "等待确认", description: "等待区块链网络确认" },
    { name: "完成上链", description: "订单成功存储到区块链" },
  ]

  const handleCreateOrder = async () => {
    setIsProcessing(true)
    setError(null)
    setProgress(0)
    setCurrentStep(0)

    try {
      // 步骤1: 验证订单信息
      setCurrentStep(0)
      setProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 步骤2: 生成智能合约
      setCurrentStep(1)
      setProgress(40)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 步骤3: 提交到区块链
      setCurrentStep(2)
      setProgress(60)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 步骤4: 等待确认
      setCurrentStep(3)
      setProgress(80)

      // 调用区块链存储函数
      const result = await storeOrderOnBlockchain({
        ...orderData,
        createdAt: Date.now(),
      })

      if (result.status === "failed") {
        throw new Error("区块链交易失败，请重试")
      }

      // 步骤5: 完成上链
      setCurrentStep(4)
      setProgress(100)
      setOrderOnChain(result)
      onComplete?.(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误")
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderOnChain) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            <CardTitle className="text-accent">订单已成功上链</CardTitle>
          </div>
          <CardDescription>您的订单已安全存储到区块链，具有不可篡改的特性</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">订单ID</span>
              <span className="font-mono">{orderOnChain.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">交易哈希</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">
                  {orderOnChain.transactionHash.slice(0, 10)}...{orderOnChain.transactionHash.slice(-8)}
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <LinkIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">区块高度</span>
              <span className="font-mono">{orderOnChain.blockNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">状态</span>
              <Badge className="bg-accent text-accent-foreground">已确认</Badge>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              订单信息已通过区块链技术加密存储，确保数据安全性和透明性。您可以随时查询交易记录。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          区块链订单存证
        </CardTitle>
        <CardDescription>将您的订单信息安全存储到区块链，确保交易透明可追溯</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 订单信息预览 */}
        <div className="space-y-3">
          <h4 className="font-medium">订单信息</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">商品名称</span>
              <span>{orderData.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">订单金额</span>
              <span className="font-medium">¥{orderData.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">分期方案</span>
              <span>
                {orderData.installmentPlan.periods}期 × ¥{orderData.installmentPlan.monthlyPayment}
              </span>
            </div>
          </div>
        </div>

        {/* 处理进度 */}
        {isProcessing && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">上链进度</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      index < currentStep
                        ? "bg-accent text-accent-foreground"
                        : index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : index === currentStep ? (
                      <Clock className="h-3 w-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 操作按钮 */}
        {!isProcessing && !orderOnChain && (
          <Button onClick={handleCreateOrder} className="w-full" disabled={isProcessing}>
            {isProcessing ? "正在上链..." : "确认并上链"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
