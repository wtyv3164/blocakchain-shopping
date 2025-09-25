"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Store, Eye, EyeOff, Building, Phone, MapPin } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleRegister = async (userType: "consumer" | "merchant") => {
    if (!agreedToTerms) {
      alert("请先同意服务条款和隐私政策")
      return
    }

    setIsLoading(true)
    // 模拟注册过程
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log(`[v0] ${userType} registration attempted`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">注册 ChainPay</CardTitle>
          <CardDescription>创建您的账户，开始安全的区块链分期购物之旅</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="consumer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer" className="gap-2">
                <User className="h-4 w-4" />
                消费者注册
              </TabsTrigger>
              <TabsTrigger value="merchant" className="gap-2">
                <Store className="h-4 w-4" />
                商户注册
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumer" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consumer-firstname">姓名</Label>
                  <Input id="consumer-firstname" placeholder="请输入姓名" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consumer-phone">手机号</Label>
                  <Input id="consumer-phone" placeholder="请输入手机号" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumer-email">邮箱地址</Label>
                <Input id="consumer-email" type="email" placeholder="请输入邮箱地址" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumer-password">密码</Label>
                <div className="relative">
                  <Input
                    id="consumer-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请设置密码（至少8位）"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumer-confirm-password">确认密码</Label>
                <div className="relative">
                  <Input
                    id="consumer-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="请再次输入密码"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="merchant" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="merchant-company">公司名称</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="merchant-company" placeholder="请输入公司名称" className="pl-10" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="merchant-contact">联系人</Label>
                  <Input id="merchant-contact" placeholder="联系人姓名" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="merchant-phone">联系电话</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="merchant-phone" placeholder="联系电话" className="pl-10" required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchant-email">商户邮箱</Label>
                <Input id="merchant-email" type="email" placeholder="请输入商户邮箱" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchant-address">公司地址</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="merchant-address" placeholder="请输入公司地址" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchant-password">密码</Label>
                <div className="relative">
                  <Input
                    id="merchant-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请设置密码（至少8位）"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              我同意
              <Button variant="link" className="p-0 ml-1 h-auto text-sm">
                服务条款
              </Button>
              和
              <Button variant="link" className="p-0 ml-1 h-auto text-sm">
                隐私政策
              </Button>
            </label>
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => handleRegister("consumer")}
            disabled={isLoading || !agreedToTerms}
          >
            {isLoading ? "注册中..." : "创建账户"}
          </Button>

          <div className="mt-4 text-center">
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              区块链技术保障账户安全
            </Badge>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">已有账户？</span>
            <Button variant="link" className="p-0 ml-1 h-auto">
              立即登录
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
