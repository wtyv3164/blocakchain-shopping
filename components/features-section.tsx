"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Package, Search, FileText, Smartphone, BarChart3, Clock, Bell } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      category: "用户与商品",
      icon: Users,
      color: "bg-primary/10 text-primary",
      items: [
        {
          icon: Users,
          title: "用户注册认证",
          description: "消费者和商户快速注册，简化KYC流程，身份信息安全绑定",
        },
        {
          icon: Package,
          title: "商品展示管理",
          description: "商户上传商品信息，平台审核上架，支持多媒体展示",
        },
        {
          icon: Search,
          title: "智能搜索",
          description: "按分类、价格、品牌等多维度搜索，快速找到心仪商品",
        },
      ],
    },
    {
      category: "区块链核心",
      icon: FileText,
      color: "bg-accent/10 text-accent",
      items: [
        {
          icon: FileText,
          title: "订单存证",
          description: "订单信息写入区块链，包含商品、金额、分期期数等关键数据",
        },
        {
          icon: BarChart3,
          title: "智能合约",
          description: "自动执行分期方案，记录还款计划和已还款项，无需人工干预",
        },
        {
          icon: Clock,
          title: "交易查询",
          description: "用户和商户可随时查看链上交易历史和当前状态",
        },
      ],
    },
    {
      category: "分期支付",
      icon: Smartphone,
      color: "bg-chart-2/10 text-chart-2",
      items: [
        {
          icon: Smartphone,
          title: "分期选择",
          description: "购买时选择3期、6期等方案，系统自动计算每期还款金额",
        },
        {
          icon: BarChart3,
          title: "在线支付",
          description: "对接多种支付通道，支持首期支付和后续分期还款",
        },
        {
          icon: Bell,
          title: "还款提醒",
          description: "到期前通过短信和平台消息提醒用户按时还款",
        },
      ],
    },
  ]

  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            核心功能
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">完整的区块链分期购物解决方案</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            从用户注册到商品管理，从区块链存证到分期支付，提供端到端的完整服务
          </p>
        </div>

        <div className="grid gap-12 lg:gap-20">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.color}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {category.items.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <feature.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h4 className="mb-2 font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
