"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Search, Menu, Shield, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">ChainPay</span>
          <Badge variant="secondary" className="text-xs">
            区块链分期
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            首页
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            商品
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            控制台
          </Link>
          <Link href="/blockchain" className="text-sm font-medium hover:text-primary transition-colors">
            区块链
          </Link>
          <Link href="/merchants" className="text-sm font-medium hover:text-primary transition-colors">
            商户入驻
          </Link>
          <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
            我的订单
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
          </Button>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <LayoutDashboard className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="hidden sm:flex">
              登录
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              注册
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
