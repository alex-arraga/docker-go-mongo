"use client"

import { ConfirmToast } from "@/components"
import { ProductsApi } from "@/types/api"
import { ProductsContextType, ProductsProviderType } from "@/types/context"
import { createContext, useContext, useEffect, useState } from "react"

export const ProductsContext = createContext<ProductsContextType | null>(null)

export const useProductsContext = () => {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error("ProductsContext must be inside of a context")
    } return context
}

export const ProductsProvider = ({ children }: ProductsProviderType) => {
    const apiURL = process.env.BACKEND_URL
    const [products, setProducts] = useState<ProductsApi[]>([])

    // Form data
    const [newProduct, setNewProduct] = useState({ name: '', brand: '', cost: 0 })
    const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', brand: '', cost: 0 })

    const options = (method: string, data?: {}) => {
        switch (method) {
            case "GET":
                return {
                    method: "GET",
                    credential: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

            case "POST": {
                return {
                    method: "POST",
                    credential: "include",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            }
            case "PUT": {
                return {
                    method: "PUT",
                    credential: "include",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            }
            case "DELETE": {
                return {
                    method: "DELETE",
                    credential: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            }
        }
    }

    // Get all products
    useEffect(() => {
        fetch(`${apiURL}/products`, options("GET")).then(response => {
            if (!response.ok) {
                throw new Error("Error fetching response")
            }
            return response.json()
        }).then(data => {
            setProducts(data as ProductsApi[])
        })
            .catch(err => {
                console.log("🔴 Error Catch: " + err)
            })
    }, [apiURL, options])


    // Create Product
    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiURL}/products`, options("POST", newProduct))
            const data = await response.json() as ProductsApi
            setProducts([data, ...products])
            setNewProduct({ name: '', brand: '', cost: 0 })
        } catch (error) {
            console.log("Error creating new product", error)
        }
    }

    // Update product
    const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await fetch(`${apiURL}/products/${updateProduct.id}`, options("PUT", updateProduct))
            products.map((product) => {
                if (product.id === updateProduct.id) {
                    return { ...product, name: updateProduct.name, brand: updateProduct.brand, cost: updateProduct.cost }
                }

                return product
            })
            setUpdateProduct({ id: '', name: '', brand: '', cost: 0 })
        } catch (error) {
            console.log("Error updating product", error)
        }
    }

    // Delete a product
    const handleDeleteOneProduct = async (e: React.FormEvent<HTMLFormElement>, productId: string) => {
        e.preventDefault()

        try {
            await fetch(`${apiURL}/products/${productId}`, options("DELETE"))
            products.filter((product) => product.id !== productId)
        } catch (error) {
            console.log("Error deleting one product", error)
        }
    }

    // Delete all products
    const handleDeleteAllProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const userConfirm = await ConfirmToast("¿Confirma que quiere eliminar todos los productos?")
            if (userConfirm) {
                await fetch(`${apiURL}/products`, options("DELETE"))
            }
        } catch (error) {
            console.log("Error deleting one product", error)
        }
    }


    // Provider
    return <ProductsContext.Provider value={{
        products,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteOneProduct,
        handleDeleteAllProduct
    }}>
        {children}
    </ProductsContext.Provider>
}