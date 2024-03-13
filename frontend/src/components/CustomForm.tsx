"use client"

import { FormEvent, useState } from "react"

function CustomForm() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [cost, setCost] = useState(0)

  const handleSubmit = async (e: FormEvent, product: { name: string, cost: number, brand: string }) => {
    try {
      e.preventDefault()

      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json"
        }
      })

      await response.json()
      return "Operation success"

    } catch (error) {
      console.log(error)
      return "An error has ocurred"
    }
  }

  return (
    <form
      className="relative flex flex-col justify-center h-full max-w-xs"
      onSubmit={(e) => handleSubmit(e, { name, cost, brand })}
    >
      <h2 className="flex justify-center text-xl">
        Create new Product
      </h2>
      <section className="my-4">
        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Brand</label>
          <input type="text"
            className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
            name="brand"
            placeholder="Asus"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Name</label>
          <input type="text"
            className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
            name="name"
            placeholder="Notebook VivoBook S"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-2 gap-6">
          <label className="text-xs text-blue-200">Cost</label>
          <input type="number"
            className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
            name="cost"
            placeholder="ARS $520.000"
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
      </section>

      <button className="flex items-center justify-center w-full h-10 bg-blue-400 hover:bg-blue-600 duration-200 rounded-md">
        Send to create
      </button>
    </form>
  )
}

export default CustomForm
