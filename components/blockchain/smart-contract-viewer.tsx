"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code, FileText, Activity, Shield, ExternalLink } from "lucide-react"
import { BLOCKCHAIN_CONFIG, INSTALLMENT_CONTRACT_ABI } from "@/lib/blockchain"

export function SmartContractViewer() {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)

  // 模拟合约状态数据
  const contractStats = {
    totalOrders: 1234,
    activeContracts: 567,
    totalVolume: 12345678,
    successRate: 98.5,
  }

  const recentActivity = [
    {
      id: "1",
      action: "createOrder",
      orderId: "ORDER_001",
      timestamp: Date.now() - 300000,
      status: "success",
    },
    {
      id: "2",
      action: "makePayment",
      orderId: "ORDER_002",
      timestamp: Date.now() - 600000,
      status: "success",
    },
    {
      id: "3",
      action: "createOrder",
      orderId: "ORDER_003",
      timestamp: Date.now() - 900000,
      status: "pending",
    },
  ]

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (hours > 0) {
      return `${hours}小时前`
    } else {
      return `${minutes}分钟前`
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-accent text-accent-foreground">成功</Badge>
      case "pending":
        return <Badge variant="secondary">处理中</Badge>
      case "failed":
        return <Badge variant="destructive">失败</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* 合约概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            智能合约概览
          </CardTitle>
          <CardDescription>ChainPay 分期付款智能合约运行状态和统计信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{contractStats.totalOrders}</div>
              <div className="text-sm text-muted-foreground">总订单数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{contractStats.activeContracts}</div>
              <div className="text-sm text-muted-foreground">活跃合约</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-2">¥{contractStats.totalVolume.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">总交易额</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3">{contractStats.successRate}%</div>
              <div className="text-sm text-muted-foreground">成功率</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">合约地址:</span>
              <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                {BLOCKCHAIN_CONFIG.contractAddress.slice(0, 10)}...{BLOCKCHAIN_CONFIG.contractAddress.slice(-8)}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-transparent"
              onClick={() =>
                window.open(`${BLOCKCHAIN_CONFIG.explorerUrl}/address/${BLOCKCHAIN_CONFIG.contractAddress}`, "_blank")
              }
            >
              <ExternalLink className="h-3 w-3" />
              在浏览器中查看
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 合约详情 */}
      <Tabs defaultValue="functions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="functions" className="gap-2">
            <Code className="h-4 w-4" />
            合约函数
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            最近活动
          </TabsTrigger>
          <TabsTrigger value="abi" className="gap-2">
            <FileText className="h-4 w-4" />
            ABI接口
          </TabsTrigger>
        </TabsList>

        <TabsContent value="functions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">智能合约函数</CardTitle>
              <CardDescription>查看合约提供的所有公开函数和接口</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {INSTALLMENT_CONTRACT_ABI.map((func, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedFunction === func.name ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedFunction(selectedFunction === func.name ? null : func.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{func.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {func.name === "createOrder" && "创建新的分期付款订单"}
                          {func.name === "makePayment" && "执行分期付款"}
                          {func.name === "getOrderDetails" && "查询订单详细信息"}
                        </p>
                      </div>
                      <Badge variant="secondary">{func.type}</Badge>
                    </div>

                    {selectedFunction === func.name && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <h5 className="text-sm font-medium mb-2">输入参数:</h5>
                          <div className="space-y-1">
                            {func.inputs.map((input, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <code className="bg-muted px-2 py-1 rounded text-xs">{input.type}</code>
                                <span>{input.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">返回值:</h5>
                          <div className="space-y-1">
                            {func.outputs.map((output, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <code className="bg-muted px-2 py-1 rounded text-xs">{output.type}</code>
                                <span>{output.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">最近活动</CardTitle>
              <CardDescription>智能合约的最新交互记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">订单: {activity.orderId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(activity.status)}
                      <span className="text-sm text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ABI接口定义</CardTitle>
              <CardDescription>智能合约的应用程序二进制接口</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  ABI定义了与智能合约交互的标准接口，开发者可以使用此接口集成ChainPay功能。
                </AlertDescription>
              </Alert>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{JSON.stringify(INSTALLMENT_CONTRACT_ABI, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
