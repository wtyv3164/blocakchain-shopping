import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TransactionHistory } from "@/components/blockchain/transaction-history"
import { SmartContractViewer } from "@/components/blockchain/smart-contract-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Code } from "lucide-react"

export default function BlockchainPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">区块链中心</h1>
          <p className="text-muted-foreground">查看您的区块链交易记录和智能合约信息</p>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions" className="gap-2">
              <Activity className="h-4 w-4" />
              交易记录
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <Code className="h-4 w-4" />
              智能合约
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-6">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="contracts" className="mt-6">
            <SmartContractViewer />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
