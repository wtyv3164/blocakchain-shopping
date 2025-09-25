"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Package, Shield } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "注册用户",
      description: "活跃消费者和商户",
    },
    {
      icon: Package,
      value: "50,000+",
      label: "商品数量",
      description: "覆盖多个品类",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "按时还款率",
      description: "优秀的信用记录",
    },
    {
      icon: Shield,
      value: "100%",
      label: "交易上链",
      description: "完全透明可追溯",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">平台数据一览</h2>
          <p className="text-lg text-muted-foreground text-pretty">基于区块链技术的透明数据，见证平台的快速发展</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mb-2 text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mb-1 font-semibold">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
