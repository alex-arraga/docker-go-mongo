"use client"

import { ProductsApi } from "@/types/api"
import { useEffect, useState } from "react"

export function useGetAllProducts() {
  const [products, setProducts] = useState<ProductsApi | null>(null)

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  useEffect((): void => {
    fetch(`${apiURL}/products`, options).then(response => {
      if (!response.ok) {
        throw new Error("Error fetching response")
      }
      return response.json()
    }).then(data => {
      setProducts(data as ProductsApi)
    })
      .catch(err => { console.log("🔴 Error Catch: " + err) })
  }, [])

  return products?.products
}