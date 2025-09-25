"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, CreditCard, Bell, Lock } from "lucide-react"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  // 模拟用户数据
  const userData = {
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138****8888",
    creditScore: 850,
    memberSince: "2024年1月",
    totalOrders: 15,
    onTimePayments: 14,
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="text-lg">张三</AvatarFallback>
            </Avatar>
            <CardTitle>{userData.name}</CardTitle>
            <CardDescription>{userData.email}</CardDescription>
            <div className="flex justify-center mt-4">
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                已认证用户
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userData.creditScore}</div>
              <div className="text-sm text-muted-foreground">信用评分</div>
              <Badge variant="outline" className="mt-1">
                优秀
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{userData.totalOrders}</div>
                <div className="text-xs text-muted-foreground">总订单</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{userData.onTimePayments}</div>
                <div className="text-xs text-muted-foreground">按时还款</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>管理您的账户信息和偏好设置</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">资料</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-1">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">安全</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">支付</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">通知</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" value={userData.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input id="phone" value={userData.phone} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input id="email" value={userData.email} disabled={!isEditing} />
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={() => setIsEditing(false)}>保存更改</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>编辑资料</Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">密码</h4>
                      <p className="text-sm text-muted-foreground">上次更新：30天前</p>
                    </div>
                    <Button variant="outline" size="sm">
                      更改密码
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">两步验证</h4>
                      <p className="text-sm text-muted-foreground">增强账户安全性</p>
                    </div>
                    <Badge variant="secondary">已启用</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">登录设备</h4>
                      <p className="text-sm text-muted-foreground">管理已登录的设备</p>
                    </div>
                    <Button variant="outline" size="sm">
                      查看设备
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">**** **** **** 1234</h4>
                        <p className="text-sm text-muted-foreground">默认支付方式</p>
                      </div>
                    </div>
                    <Badge>主要</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    添加新的支付方式
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">还款提醒</h4>
                      <p className="text-sm text-muted-foreground">分期还款到期提醒</p>
                    </div>
                    <Badge variant="secondary">已开启</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">订单更新</h4>
                      <p className="text-sm text-muted-foreground">订单状态变更通知</p>
                    </div>
                    <Badge variant="secondary">已开启</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">营销推广</h4>
                      <p className="text-sm text-muted-foreground">优惠活动和新品推荐</p>
                    </div>
                    <Badge variant="outline">已关闭</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
