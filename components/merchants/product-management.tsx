"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, Upload, Package } from "lucide-react"

export function ProductManagement() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  // 模拟商户商品数据
  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB",
      category: "手机数码",
      price: 9999,
      stock: 50,
      status: "已上架",
      sales: 123,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "MacBook Air M3 13英寸",
      category: "电脑办公",
      price: 8999,
      stock: 25,
      status: "已上架",
      sales: 67,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "AirPods Pro 第三代",
      category: "影音娱乐",
      price: 1899,
      stock: 0,
      status: "缺货",
      sales: 234,
      createdAt: "2024-01-05",
    },
    {
      id: "4",
      name: "iPad Air 第五代",
      category: "平板电脑",
      price: 4399,
      stock: 15,
      status: "待审核",
      sales: 0,
      createdAt: "2024-01-20",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已上架":
        return <Badge className="bg-accent text-accent-foreground">已上架</Badge>
      case "待审核":
        return <Badge variant="secondary">待审核</Badge>
      case "缺货":
        return <Badge variant="destructive">缺货</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">商品管理</h1>
          <p className="text-muted-foreground">管理您的商品信息、库存和销售数据</p>
        </div>
        <Button onClick={() => setIsAddingProduct(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          添加商品
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="gap-2">
            <Package className="h-4 w-4" />
            商品列表
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <Plus className="h-4 w-4" />
            添加商品
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>商品列表</CardTitle>
              <CardDescription>查看和管理您的所有商品</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商品名称</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>库存</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>销量</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>¥{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{product.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>添加新商品</CardTitle>
              <CardDescription>填写商品信息，提交审核后即可上架销售</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">商品名称</Label>
                  <Input id="product-name" placeholder="请输入商品名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">商品分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">手机数码</SelectItem>
                      <SelectItem value="computer">电脑办公</SelectItem>
                      <SelectItem value="appliance">家用电器</SelectItem>
                      <SelectItem value="fashion">服饰鞋包</SelectItem>
                      <SelectItem value="sports">运动户外</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">商品价格</Label>
                  <Input id="product-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-original-price">原价（可选）</Label>
                  <Input id="product-original-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock">库存数量</Label>
                  <Input id="product-stock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">商品描述</Label>
                <Textarea id="product-description" placeholder="请详细描述商品特点、规格等信息" rows={4} />
              </div>

              <div className="space-y-2">
                <Label>商品图片</Label>
                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">上传图片</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">建议上传4张商品图片，支持JPG、PNG格式，单张不超过2MB</p>
              </div>

              <div className="space-y-2">
                <Label>分期选项</Label>
                <div className="grid grid-cols-4 gap-4">
                  {["3期免息", "6期免息", "12期免息", "24期低息"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input type="checkbox" id={option} className="rounded" />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">提交审核</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  保存草稿
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
