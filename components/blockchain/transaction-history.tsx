"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ExternalLink, Filter, Download } from "lucide-react"
import { BLOCKCHAIN_CONFIG, type BlockchainTransaction } from "@/lib/blockchain"

// 模拟交易历史数据
const mockTransactions: BlockchainTransaction[] = [
  {
    id: "tx_1",
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 1234567,
    timestamp: Date.now() - 3600000, // 1小时前
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    to: "0x1234567890123456789012345678901234567890",
    value: 9999,
    gasUsed: 45000,
    status: "confirmed",
  },
  {
    id: "tx_2",
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    blockNumber: 1234566,
    timestamp: Date.now() - 7200000, // 2小时前
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    to: "0x1234567890123456789012345678901234567890",
    value: 1667,
    gasUsed: 32000,
    status: "confirmed",
  },
  {
    id: "tx_3",
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
    blockNumber: 0,
    timestamp: Date.now() - 300000, // 5分钟前
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    to: "0x1234567890123456789012345678901234567890",
    value: 2399,
    gasUsed: 0,
    status: "pending",
  },
]

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载交易历史
    const loadTransactions = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    loadTransactions()
  }, [])

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-accent text-accent-foreground">已确认</Badge>
      case "pending":
        return <Badge variant="secondary">待确认</Badge>
      case "failed":
        return <Badge variant="destructive">失败</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("zh-CN")
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const openInExplorer = (hash: string) => {
    window.open(`${BLOCKCHAIN_CONFIG.explorerUrl}/tx/${hash}`, "_blank")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            区块链交易记录
          </CardTitle>
          <CardDescription>查看您的所有区块链交易历史，包括订单创建和分期付款记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索交易哈希或交易ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              导出
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">加载交易记录中...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>交易哈希</TableHead>
                  <TableHead>区块高度</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>发送方</TableHead>
                  <TableHead>接收方</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>Gas费用</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-sm">{formatAddress(tx.hash)}</TableCell>
                    <TableCell>{tx.blockNumber || "-"}</TableCell>
                    <TableCell className="text-sm">{formatTimestamp(tx.timestamp)}</TableCell>
                    <TableCell className="font-mono text-sm">{formatAddress(tx.from)}</TableCell>
                    <TableCell className="font-mono text-sm">{formatAddress(tx.to)}</TableCell>
                    <TableCell>¥{tx.value}</TableCell>
                    <TableCell>{tx.gasUsed.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openInExplorer(tx.hash)} className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isLoading && filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "未找到匹配的交易记录" : "暂无交易记录"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 区块链网络信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">网络信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">网络名称</span>
              <span>{BLOCKCHAIN_CONFIG.networkName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">链ID</span>
              <span>{BLOCKCHAIN_CONFIG.chainId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">合约地址</span>
              <span className="font-mono text-xs">{formatAddress(BLOCKCHAIN_CONFIG.contractAddress)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">区块浏览器</span>
              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={() => window.open(BLOCKCHAIN_CONFIG.explorerUrl, "_blank")}
              >
                查看浏览器
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
