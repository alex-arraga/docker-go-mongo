export type ProductsApi = {
  id: string
  name: string
  cost: number
  brand: string
}

export type CustomFetchButtonProps = {
  style: string,
  text: string,
  urlFetch: string,
  methodFetch: string,
  dataFetch?: {
    name: string,
    cost: number,
    brand: string
  },
  idFetch?: string
}