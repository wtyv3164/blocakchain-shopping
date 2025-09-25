import { ProductDetail } from "@/components/products/product-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductDetail productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
