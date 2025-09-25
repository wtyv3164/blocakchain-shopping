import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ChainPay</span>
            </div>
            <p className="text-sm text-muted-foreground">
              基于区块链技术的安全透明分期购物平台，为用户提供可信赖的购物体验。
            </p>
            <Badge variant="secondary" className="w-fit">
              区块链赋能
            </Badge>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">产品服务</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  商品购买
                </Link>
              </li>
              <li>
                <Link href="/installment" className="hover:text-foreground transition-colors">
                  分期服务
                </Link>
              </li>
              <li>
                <Link href="/blockchain" className="hover:text-foreground transition-colors">
                  区块链存证
                </Link>
              </li>
              <li>
                <Link href="/credit" className="hover:text-foreground transition-colors">
                  信用评分
                </Link>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div className="space-y-4">
            <h4 className="font-semibold">商户服务</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/merchants/register" className="hover:text-foreground transition-colors">
                  商户入驻
                </Link>
              </li>
              <li>
                <Link href="/merchants/dashboard" className="hover:text-foreground transition-colors">
                  商户后台
                </Link>
              </li>
              <li>
                <Link href="/merchants/analytics" className="hover:text-foreground transition-colors">
                  数据分析
                </Link>
              </li>
              <li>
                <Link href="/merchants/support" className="hover:text-foreground transition-colors">
                  技术支持
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">帮助支持</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ChainPay. 保留所有权利。基于区块链技术构建。</p>
        </div>
      </div>
    </footer>
  )
}
