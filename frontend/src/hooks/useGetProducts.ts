"use client"

import { ProductsApi } from "@/types/api"
import { useEffect, useState } from "react"

export function useGetAllProducts() {
  const [products, setProducts] = useState<ProductsApi | null>(null)

  const apiURL = process.env.BACKEND_URL
  const options = {
    method: "GET",
    credential: "include",
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
  }, [apiURL, options])

  return products?.products
}