"use client"

import { useProductsContext } from "@/app/context/ProductsContext"
import { useId } from "react"

export function ProductCard() {
	const { products } = useProductsContext()
	const id = useId()

	return (
		<section>
			<ul className='relative grid xl:grid-cols-2 w-full gap-6 rounded-lg'>
				{
					products && products.length > 0 ?
						products?.map((product) => (
							<li key={product.id + id} className='flex flex-col w-full bg-slate-800 shadow-md shadow-blue-900 rounded-lg p-4 gap-2'>
								<h3 className='text-xl font-medium'>{product.brand + " " + product.name}</h3>
								<p className='text-cyan-100'>{product.cost ? "$ " + product.cost.toLocaleString() : ""}</p>
								<p className='text-sm'>ID: {product.id}</p>
							</li>
						))

						:
						<li>
							<p className='absolute top-0 w-full text-sm md:text-base text-center'>There is no product</p>
						</li>
				}
			</ul>
		</section>
	)
}

export default ProductCard