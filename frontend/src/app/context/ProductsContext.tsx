"use client"

import { ConfirmToast } from "@/components"
import { ProductsApi } from "@/types/api"
import { ProductsContextType, ProductsProviderType } from "@/types/context"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export const ProductsContext = createContext<ProductsContextType | null>(null)

export const useProductsContext = () => {
	const context = useContext(ProductsContext)
	if (!context) {
		throw new Error("ProductsContext must be inside of a context")
	} return context
}

export const ProductsProvider = ({ children }: ProductsProviderType) => {
	const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

	useEffect(() => {
		console.log({
			"ENV": process.env.NEXT_PUBLIC_BACKEND_URL,
			"apiURL": apiURL,
			"✅ products": products,
			"✅ newProduct": newProduct,
			"✅ updateProduct": updateProduct,
			"✅ deleteProduct": deleteProduct
		})
	}, [])

	const [isFetching, setIsFetching] = useState(false)
	const [clientResponse, setClientResponse] = useState<number | null>(null)

	// Form data
	const [products, setProducts] = useState<ProductsApi[]>([])
	const [newProduct, setNewProduct] = useState({ name: '', brand: '', cost: 0 })
	const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', brand: '', cost: 0 })
	const [deleteProduct, setDeleteProduct] = useState({ id: '' })

	const options = (method: string, data?: {}): RequestInit | undefined => {
		switch (method) {
			case "GET":
				return {
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					}
				}

			case "POST": {
				return {
					method: "POST",
					credentials: "include",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				}
			}
			case "PUT": {
				return {
					method: "PUT",
					credentials: "include",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				}
			}
			case "DELETE": {
				return {
					method: "DELETE",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					}
				}
			}
		}
	}

	// Get all products
	useEffect(() => {
		if (!isFetching) {
			fetch(`${apiURL}/products`, options("GET"))
				.then(response => {
					if (!response.ok) {
						throw new Error("Error fetching response")
					}
					return response.json()
				})
				.then(data => {
					setProducts(data.products as ProductsApi[])
				})
				.catch(err => {
					console.log("❗Error fetching: " + err)
				})
		}
	}, [apiURL, isFetching])


	// Create Product
	const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsFetching(true)

		try {
			const response = await fetch(`${apiURL}/products`, options("POST", newProduct))
			if (response.ok) {
				setNewProduct({ name: '', brand: '', cost: 0 })
				setClientResponse(200)
			} else {
				throw new Error("Response is not OK")
			}
		} catch (error) {
			console.log("Error creating new product", error)
			setClientResponse(500)
		}
		finally {
			setIsFetching(false)
		}
	}

	// Update product
	const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsFetching(true)

		try {
			const response = await fetch(`${apiURL}/products/${updateProduct.id}`, options("PUT", updateProduct))
			if (response.ok) {
				setClientResponse(200)
			}
			products.map((product) => {
				if (product.id === updateProduct.id) {
					return { ...product, name: updateProduct.name, brand: updateProduct.brand, cost: updateProduct.cost }
				}

				return product
			})
			setUpdateProduct({ id: '', name: '', brand: '', cost: 0 })
		} catch (error) {
			console.log("Error updating product", error)
			setClientResponse(500)
		}
		finally {
			setIsFetching(false)
		}
	}

	// Delete a product
	const handleDeleteOneProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsFetching(true)

		try {
			const response = await fetch(`${apiURL}/products/${deleteProduct.id}`, options("DELETE"))
			if (response.ok) {
				setClientResponse(200)
			}
			products.filter((product) => product.id !== deleteProduct.id)
			setDeleteProduct({ id: '' })
		} catch (error) {
			console.log("Error deleting one product", error)
			setClientResponse(500)
		}
		finally {
			setIsFetching(false)
		}
	}

	// Delete all products
	const handleDeleteAllProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsFetching(true)

		try {
			const userConfirm = await ConfirmToast("¿Confirma que quiere eliminar todos los productos?")
			if (userConfirm) {
				const response = await fetch(`${apiURL}/products`, options("DELETE"))
				if (response.ok) {
					setClientResponse(200)
				}
			}
		} catch (error) {
			console.log("Error deleting one product", error)
			setClientResponse(500)
		}
		finally {
			setIsFetching(false)
		}
	}

	// Toast response
	useEffect(() => {
		console.log("Client response:", clientResponse)
		if (clientResponse === 200) {
			toast.success("Operation success")
			setClientResponse(null)
		} else if (clientResponse === 500) {
			toast.error("Error: Please try again")
			setClientResponse(null)
		}
	}, [clientResponse])


	// Provider
	return <ProductsContext.Provider value={{
		products,
		setProducts,
		newProduct,
		setNewProduct,
		updateProduct,
		setUpdateProduct,
		deleteProduct,
		setDeleteProduct,
		handleCreateProduct,
		handleUpdateProduct,
		handleDeleteOneProduct,
		handleDeleteAllProduct
	}}>
		{children}
	</ProductsContext.Provider>
}