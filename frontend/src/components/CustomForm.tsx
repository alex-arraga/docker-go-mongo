"use client"

import { CustomFormProps } from '@/types/components'
import { useProductsContext } from '@/app/context/ProductsContext'
import { useEffect, useState } from 'react'

export function CustomForm({ method }: CustomFormProps) {
  const [formatingCost, setFormatingCost] = useState('')

  const {
    handleCreateProduct,
    newProduct,
    setNewProduct,
    handleUpdateProduct,
    updateProduct,
    setUpdateProduct,
    deleteProduct,
    setDeleteProduct,
    handleDeleteAllProduct,
    handleDeleteOneProduct
  } = useProductsContext()

  // Func to add "." every 3 numbers
  const formatNumber = (num: number) => {
    if (!num) return ''
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  // Format the number if newProduct.cost changing
  useEffect(() => {
    if (!isNaN(newProduct.cost)) {
      const costFormated = formatNumber(newProduct.cost);
      setFormatingCost(costFormated);
    }
  }, [newProduct.cost])

  return (
    method === "POST" ?
      <form onSubmit={handleCreateProduct}>
        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Brand</label>
          <input type="text"
            value={newProduct.brand}
            className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
            name="brand"
            placeholder="Asus"
            required
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
        </div>

        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Name</label>
          <input type="text"
            value={newProduct.name}
            className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
            name="name"
            placeholder="Notebook A5 Pro"
            required
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>

        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Cost</label>
          <div className='relative'>
            <span className={`${formatingCost === '' ? "hidden" : "block absolute bottom-2 left-2"}`}>
              $
            </span>
            <input type="text"
              value={formatingCost}
              className={`w-full bg-slate-500 ${formatingCost !== '' ? "p-2 pl-5" : "p-2"} block rounded-lg outline-2 outline-sky-600`}
              name="cost"
              placeholder="$20.000"
              required
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, '')
                setNewProduct({ ...newProduct, cost: value === '' ? 0 : Number(value) })
              }}
            />
          </div>
        </div>

        <button className="flex items-center justify-center w-full h-10 mt-6 bg-blue-400 hover:bg-blue-600 duration-200 rounded-md">
          Send to create
        </button>
      </form>

      : method === "PUT" ?
        <form onSubmit={handleUpdateProduct}>
          <div className="my-2 gap-6">
            <label className="text-xs text-blue-200">Id</label>
            <input type="text"
              value={updateProduct.id}
              className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
              name="id"
              placeholder="65f36ac3368efb9b77b736d6"
              required
              onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
            />
          </div>

          <div className="my-2 gap-6">
            <label className="text-xs text-blue-200">Brand</label>
            <input type="text"
              value={updateProduct.brand}
              className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
              name="brand"
              placeholder="Asus"
              required
              onChange={(e) => setUpdateProduct({ ...updateProduct, brand: e.target.value })}
            />
          </div>

          <div className="my-2 gap-6">
            <label className="text-xs text-blue-200">Name</label>
            <input type="text"
              value={updateProduct.name}
              className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
              name="name"
              placeholder="Notebook VivoBook S"
              required
              onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
            />
          </div>

          <div className="my-2 gap-6">
            <label className="text-xs text-blue-200">Cost</label>
            <input type="number"
              value={updateProduct.cost === 0 ? '' : updateProduct.cost}
              className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
              name="cost"
              placeholder="$20.000"
              required
              onChange={(e) => setUpdateProduct({ ...updateProduct, cost: Number(e.target.value) })}
            />
          </div>

          <button className="flex items-center justify-center w-full h-10 mt-6 bg-blue-400 hover:bg-blue-600 duration-200 rounded-md">
            Send to update
          </button>
        </form>

        :

        <form onSubmit={deleteProduct.id !== '' ? handleDeleteOneProduct : handleDeleteAllProduct}>
          <div className="mt-6 mb-2 gap-6">
            <p className="text-center text-sm mb-2">All products will be deleted if you dont enter an Id</p>

            <label className="text-xs text-blue-200">Id</label>
            <input type="text"
              value={deleteProduct.id}
              className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
              name="id"
              placeholder="65f36ac3368efb9b77b736d6"
              onChange={(e) => setDeleteProduct({ ...deleteProduct, id: e.target.value })}
            />
          </div>

          <button className="flex items-center justify-center w-full h-10 mt-6 bg-blue-400 hover:bg-blue-600 duration-200 rounded-md">
            Send to delete
          </button>
        </form>
  )
}

export default CustomForm
