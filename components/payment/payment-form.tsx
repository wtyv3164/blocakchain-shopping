"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, QrCode, Shield, Lock } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface PaymentFormProps {
  amount: number
  installmentPlan?: {
    periods: number
    monthlyAmount: number
    totalAmount: number
  }
  onPaymentSubmit: (paymentData: any) => void
}

export function PaymentForm({ amount, installmentPlan, onPaymentSubmit }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "银行卡支付",
      icon: <CreditCard className="h-4 w-4" />,
      description: "支持各大银行借记卡和信用卡",
    },
    {
      id: "alipay",
      name: "支付宝",
      icon: <Smartphone className="h-4 w-4" />,
      description: "使用支付宝扫码或账户余额支付",
    },
    {
      id: "wechat",
      name: "微信支付",
      icon: <QrCode className="h-4 w-4" />,
      description: "使用微信扫码或钱包余额支付",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // 模拟支付处理
    setTimeout(() => {
      const paymentData = {
        method: selectedMethod,
        amount: installmentPlan ? installmentPlan.monthlyAmount : amount,
        totalAmount: installmentPlan ? installmentPlan.totalAmount : amount,
        installmentPlan,
        cardData: selectedMethod === "card" ? cardData : null,
        timestamp: new Date().toISOString(),
      }

      onPaymentSubmit(paymentData)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          安全支付
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 支付金额信息 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            {installmentPlan ? (
              <>
                <div className="flex justify-between">
                  <span>首期付款:</span>
                  <span className="font-medium">¥{installmentPlan.monthlyAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>分期总额:</span>
                  <span>¥{installmentPlan.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>分期期数:</span>
                  <span>{installmentPlan.periods}期</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span>支付金额:</span>
                <span className="font-medium">¥{amount}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* 支付方式选择 */}
        <div>
          <Label className="text-base font-medium mb-3 block">选择支付方式</Label>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex items-center gap-3 flex-1">
                  {method.icon}
                  <div>
                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                      {method.name}
                    </Label>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 银行卡信息表单 */}
        {selectedMethod === "card" && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="cardNumber">卡号</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  maxLength={19}
                />
              </div>
              <div>
                <Label htmlFor="cardName">持卡人姓名</Label>
                <Input
                  id="cardName"
                  placeholder="张三"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">有效期</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 安全提示 */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <Lock className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-800 font-medium">安全保障</p>
            <p className="text-blue-600">您的支付信息通过SSL加密传输，我们不会存储您的银行卡信息</p>
          </div>
        </div>

        {/* 提交按钮 */}
        <Button onClick={handleSubmit} disabled={isProcessing} className="w-full" size="lg">
          {isProcessing ? "处理中..." : `确认支付 ¥${installmentPlan ? installmentPlan.monthlyAmount : amount}`}
        </Button>
      </CardContent>
    </Card>
  )
}
