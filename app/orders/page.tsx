import { OrderList } from "@/components/consumer/order-list"
import { OrderFilters } from "@/components/consumer/order-filters"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">我的订单</h1>
            <p className="text-muted-foreground">查看和管理您的购买订单</p>
          </div>

          <OrderFilters />
          <OrderList />
        </div>
      </div>
    </div>
  )
}
