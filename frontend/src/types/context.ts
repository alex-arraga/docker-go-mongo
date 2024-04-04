import { ProductsApi } from "./api"

export type ProductsContextType = {
  products: ProductsApi[] | null,
  handleCreateProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleUpdateProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleDeleteOneProduct: (e: React.FormEvent<HTMLFormElement>, productId: string) => Promise<void>,
  handleDeleteAllProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export type ProductsProviderType = {
  children: React.ReactNode
}