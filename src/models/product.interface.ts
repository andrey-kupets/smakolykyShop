export interface IProduct {
  _id: string
  title: string
  description: string
  type: string // TODO type enum
  category: string
  price: number
  hasDiscount: boolean
  oldPrice?: number
  tags?: string[]
  photo?: string[]
  docs?: string[]
  stockCount: number
  createdAt: string
  updatedAt: string
}
