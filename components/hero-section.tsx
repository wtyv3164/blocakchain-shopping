"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, CreditCard, TrendingUp, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 lg:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement */}
          <div className="mb-8 flex justify-center">
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <Zap className="h-4 w-4 text-accent" />
              全新区块链分期购物体验
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance lg:text-6xl">
            安全透明的
            <span className="text-primary"> 区块链分期 </span>
            购物平台
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground text-pretty">
            基于区块链技术，为消费者和商户提供安全、透明、便捷的分期购物服务。
            每笔交易都有链上记录，信用评分公开透明，让购物更安心。
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2">
              开始购物
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              商户入驻
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">区块链存证</h3>
              <p className="text-sm text-muted-foreground">
                所有订单和交易记录上链存储，确保数据不可篡改，交易透明可追溯
              </p>
            </Card>

            <Card className="p-6 text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-semibold">智能分期</h3>
              <p className="text-sm text-muted-foreground">
                智能合约自动执行分期计划，支持3期、6期等多种方案，还款提醒及时
              </p>
            </Card>

            <Card className="p-6 text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="mb-2 font-semibold">信用评分</h3>
              <p className="text-sm text-muted-foreground">基于链上还款记录的信用评分系统，良好信用享受更多分期优惠</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
      </div>
    </section>
  )
}
