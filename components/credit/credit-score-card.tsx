"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle } from "lucide-react"

interface CreditScoreCardProps {
  userId: string
  score: number
  level: "excellent" | "good" | "fair" | "poor"
  trend: "up" | "down" | "stable"
  lastUpdated: string
}

export function CreditScoreCard({ userId, score, level, trend, lastUpdated }: CreditScoreCardProps) {
  const getLevelConfig = (level: string) => {
    switch (level) {
      case "excellent":
        return {
          label: "优秀",
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        }
      case "good":
        return {
          label: "良好",
          color: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
          icon: <Shield className="h-5 w-5 text-blue-600" />,
        }
      case "fair":
        return {
          label: "一般",
          color: "bg-yellow-500",
          textColor: "text-yellow-700",
          bgColor: "bg-yellow-50",
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
        }
      case "poor":
        return {
          label: "较差",
          color: "bg-red-500",
          textColor: "text-red-700",
          bgColor: "bg-red-50",
          icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
        }
      default:
        return {
          label: "未知",
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
          icon: <Shield className="h-5 w-5 text-gray-600" />,
        }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const levelConfig = getLevelConfig(level)
  const progressValue = (score / 850) * 100 // 假设最高分为850

  return (
    <Card className={levelConfig.bgColor}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {levelConfig.icon}
            信用评分
          </CardTitle>
          <Badge className={`${levelConfig.color} text-white`}>{levelConfig.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 信用分数显示 */}
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: levelConfig.color.replace("bg-", "") }}>
            {score}
          </div>
          <div className="text-sm text-gray-600">满分 850 分</div>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>信用等级</span>
            <span className={levelConfig.textColor}>{levelConfig.label}</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>300</span>
            <span>850</span>
          </div>
        </div>

        {/* 趋势和更新时间 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            {getTrendIcon(trend)}
            <span className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}>
              {trend === "up" ? "上升趋势" : trend === "down" ? "下降趋势" : "保持稳定"}
            </span>
          </div>
          <span className="text-gray-500">更新于 {lastUpdated}</span>
        </div>

        {/* 信用建议 */}
        <div className="mt-4 p-3 bg-white rounded-lg border">
          <div className="text-sm font-medium mb-1">信用建议</div>
          <div className="text-xs text-gray-600">
            {level === "excellent" && "您的信用记录优秀，继续保持按时还款的好习惯。"}
            {level === "good" && "您的信用记录良好，建议继续按时还款以提升信用等级。"}
            {level === "fair" && "建议按时还款并减少逾期次数以改善信用记录。"}
            {level === "poor" && "请尽快处理逾期账单，按时还款以恢复信用记录。"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
