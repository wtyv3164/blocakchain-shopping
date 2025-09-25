"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Store, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (userType: "consumer" | "merchant") => {
    setIsLoading(true)
    // 模拟登录过程
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log(`[v0] ${userType} login attempted`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">登录 ChainPay</CardTitle>
          <CardDescription>选择您的身份类型并登录账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="consumer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer" className="gap-2">
                <User className="h-4 w-4" />
                消费者
              </TabsTrigger>
              <TabsTrigger value="merchant" className="gap-2">
                <Store className="h-4 w-4" />
                商户
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumer" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="consumer-email">邮箱地址</Label>
                <Input id="consumer-email" type="email" placeholder="请输入您的邮箱" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumer-password">密码</Label>
                <div className="relative">
                  <Input
                    id="consumer-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
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
              <Button className="w-full" onClick={() => handleLogin("consumer")} disabled={isLoading}>
                {isLoading ? "登录中..." : "消费者登录"}
              </Button>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  享受安全分期购物体验
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="merchant" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="merchant-email">商户邮箱</Label>
                <Input id="merchant-email" type="email" placeholder="请输入商户邮箱" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchant-password">密码</Label>
                <div className="relative">
                  <Input
                    id="merchant-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
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
              <Button className="w-full" onClick={() => handleLogin("merchant")} disabled={isLoading}>
                {isLoading ? "登录中..." : "商户登录"}
              </Button>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  管理您的商品和订单
                </Badge>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">还没有账户？</span>
            <Button variant="link" className="p-0 ml-1 h-auto">
              立即注册
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
