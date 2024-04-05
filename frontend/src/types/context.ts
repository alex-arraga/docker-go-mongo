import { SetStateAction } from "react"
import { ProductsApi } from "./api"

export type ProductsContextType = {
  products: ProductsApi[] | null,
  setProducts: React.Dispatch<SetStateAction<ProductsApi[]>>,
  newProduct: {
    name: string;
    brand: string;
    cost: number;
  },
  setNewProduct: React.Dispatch<SetStateAction<{
    name: string;
    brand: string;
    cost: number;
  }>>,
  updateProduct: {
    id: string;
    name: string;
    brand: string;
    cost: number;
  },
  setUpdateProduct: React.Dispatch<SetStateAction<{
    id: string;
    name: string;
    brand: string;
    cost: number;
  }>>,
  deleteProduct: { id: string },
  setDeleteProduct: React.Dispatch<SetStateAction<{
    id: string;
  }>>,
  handleCreateProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleUpdateProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleDeleteOneProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleDeleteAllProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export type ProductsProviderType = {
  children: React.ReactNode
}