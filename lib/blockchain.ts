// 区块链相关工具函数和类型定义

export interface BlockchainTransaction {
  id: string
  hash: string
  blockNumber: number
  timestamp: number
  from: string
  to: string
  value: number
  gasUsed: number
  status: "pending" | "confirmed" | "failed"
}

export interface OrderOnChain {
  orderId: string
  userId: string
  merchantId: string
  productId: string
  productName: string
  totalAmount: number
  installmentPlan: {
    periods: number
    monthlyPayment: number
    totalInterest: number
  }
  createdAt: number
  transactionHash: string
  blockNumber?: number
  status: "pending" | "confirmed" | "failed"
}

export interface SmartContract {
  address: string
  abi: any[]
  name: string
  version: string
}

// 模拟区块链网络配置
export const BLOCKCHAIN_CONFIG = {
  networkName: "ChainPay Network",
  chainId: 8888,
  rpcUrl: "https://rpc.chainpay.network",
  explorerUrl: "https://explorer.chainpay.network",
  contractAddress: "0x1234567890123456789012345678901234567890",
}

// 模拟智能合约ABI
export const INSTALLMENT_CONTRACT_ABI = [
  {
    name: "createOrder",
    type: "function",
    inputs: [
      { name: "orderId", type: "string" },
      { name: "userId", type: "address" },
      { name: "merchantId", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "periods", type: "uint8" },
    ],
    outputs: [{ name: "success", type: "bool" }],
  },
  {
    name: "makePayment",
    type: "function",
    inputs: [
      { name: "orderId", type: "string" },
      { name: "paymentAmount", type: "uint256" },
    ],
    outputs: [{ name: "success", type: "bool" }],
  },
  {
    name: "getOrderDetails",
    type: "function",
    inputs: [{ name: "orderId", type: "string" }],
    outputs: [
      { name: "userId", type: "address" },
      { name: "merchantId", type: "address" },
      { name: "totalAmount", type: "uint256" },
      { name: "paidAmount", type: "uint256" },
      { name: "periods", type: "uint8" },
      { name: "status", type: "uint8" },
    ],
  },
]

// 生成模拟交易哈希
export function generateTransactionHash(): string {
  return "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
}

// 生成模拟区块号
export function generateBlockNumber(): number {
  return Math.floor(Math.random() * 1000000) + 1000000
}

// 模拟区块链交易
export async function simulateBlockchainTransaction(operation: string, data: any): Promise<BlockchainTransaction> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

  const transaction: BlockchainTransaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    hash: generateTransactionHash(),
    blockNumber: generateBlockNumber(),
    timestamp: Date.now(),
    from: "0x" + Math.random().toString(16).substr(2, 40),
    to: BLOCKCHAIN_CONFIG.contractAddress,
    value: data.amount || 0,
    gasUsed: Math.floor(Math.random() * 100000) + 21000,
    status: Math.random() > 0.1 ? "confirmed" : "failed", // 90% 成功率
  }

  console.log(`[v0] Blockchain transaction simulated: ${operation}`, transaction)
  return transaction
}

// 将订单数据上链
export async function storeOrderOnBlockchain(
  orderData: Omit<OrderOnChain, "transactionHash" | "blockNumber" | "status">,
): Promise<OrderOnChain> {
  const transaction = await simulateBlockchainTransaction("createOrder", {
    orderId: orderData.orderId,
    userId: orderData.userId,
    merchantId: orderData.merchantId,
    amount: orderData.totalAmount,
    periods: orderData.installmentPlan.periods,
  })

  const orderOnChain: OrderOnChain = {
    ...orderData,
    transactionHash: transaction.hash,
    blockNumber: transaction.blockNumber,
    status: transaction.status,
  }

  return orderOnChain
}

// 查询链上订单信息
export async function getOrderFromBlockchain(orderId: string): Promise<OrderOnChain | null> {
  // 模拟查询延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 这里应该从实际区块链查询，现在返回模拟数据
  const mockOrder: OrderOnChain = {
    orderId,
    userId: "user_123",
    merchantId: "merchant_456",
    productId: "product_789",
    productName: "iPhone 15 Pro Max",
    totalAmount: 9999,
    installmentPlan: {
      periods: 6,
      monthlyPayment: 1667,
      totalInterest: 0,
    },
    createdAt: Date.now() - 86400000, // 1天前
    transactionHash: generateTransactionHash(),
    blockNumber: generateBlockNumber(),
    status: "confirmed",
  }

  return mockOrder
}
