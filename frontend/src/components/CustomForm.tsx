"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

function CustomForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [response, setResponse] = useState<number | null>(null)
  const [method, setMethod] = useState('POST')

  // Inputs data
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [cost, setCost] = useState(0)

  // Toast
  useEffect(() => {
    if (response === 200) {
      toast.success("Operation success - " + method)
      setResponse(null)
    } else if (response === 500) {
      toast.error("Internal server error")
      setResponse(null)
    }
  }, [response])

  // Submit form data based on the method (PUT, DELETE, POST)
  const handleSubmit = async (e: FormEvent, product: { id?: string, name?: string, cost?: number, brand?: string }) => {
    try {
      e.preventDefault()

      if (method == "POST") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.ok) {
          setResponse(200)
          formRef.current?.reset()
        }
      } else if (method == "PUT") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          method: "PUT",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.ok) {
          setResponse(200)
          formRef.current?.reset()
        }
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })

        setResponse(200)
        formRef.current?.reset()
      }

    } catch (error) {
      console.log(error)
      setResponse(500)
      formRef.current?.reset()
    }
  }

  return (
    <section className="relative flex flex-col justify-center h-full max-w-xs">
      <div>
        {/* Tittle */}
        <h2 className="flex justify-center text-xl">
          {
            method == "POST" ? "Create new Product" :
              method == "PUT" ? "Update product"
                : "Delete product"
          }
        </h2>

        {/* Buttons */}
        <div className="flex flex-1 gap-4 justify-center items-center mt-4">
          <button
            onClick={() => setMethod("POST")}
            className={`rounded-lg p-2 w-full font-medium ${method == "POST" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            POST
          </button>
          <button
            onClick={() => setMethod("PUT")}
            className={`rounded-lg p-2 w-full font-medium ${method == "PUT" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            PUT
          </button>
          <button
            onClick={() => setMethod("DELETE")}
            className={`rounded-lg p-2 w-full font-medium ${method == "DELETE" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            DELETE
          </button>
        </div>
      </div>

      <div>
        <form
          ref={formRef}
          className="relative flex flex-col justify-center h-full max-w-xs"
          onSubmit={(e) => handleSubmit(e, { id, name, cost, brand })}
        >
          <div className="my-4">
            {
              method == "DELETE" ?
                <div className="my-2 gap-6">
                  <p className="text-center text-xs mb-2"><span className="font-medium">Optional:</span> If no id, all products will be deleted.</p>

                  <label className="text-xs text-blue-200">Id</label>
                  <input type="text"
                    className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                    name="id"
                    placeholder="65f36ac3368efb9b77b736d6"
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                : method == "PUT" ?
                  <>
                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Id</label>
                      <input type="text"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="id"
                        placeholder="65f36ac3368efb9b77b736d6"
                        required
                        onChange={(e) => setId(e.target.value)}
                      />
                    </div>

                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Brand</label>
                      <input type="text"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="brand"
                        placeholder="Asus"
                        required
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>

                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Name</label>
                      <input type="text"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="name"
                        placeholder="Notebook VivoBook S"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Cost</label>
                      <input type="number"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="cost"
                        placeholder="ARS $520.000"
                        required
                        onChange={(e) => setCost(Number(e.target.value))}
                      />
                    </div>
                  </>

                  :
                  <>
                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Brand</label>
                      <input type="text"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="brand"
                        placeholder="Asus"
                        required
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>

                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Name</label>
                      <input type="text"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="name"
                        placeholder="Notebook VivoBook S"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="my-2 gap-6">
                      <label className="text-xs text-blue-200">Cost</label>
                      <input type="number"
                        className="w-full bg-slate-500 p-2 block rounded-lg outline-2 outline-sky-600"
                        name="cost"
                        placeholder="ARS $520.000"
                        required
                        onChange={(e) => setCost(Number(e.target.value))}
                      />
                    </div>
                  </>
            }
          </div>

          <button className="flex items-center justify-center w-full h-10 bg-blue-400 hover:bg-blue-600 duration-200 rounded-md">
            {
              method == "POST" ? "Send to create" :
                method == "PUT" ? "Send to update"
                  : "Send to delete"
            }
          </button>
        </form>
      </div>
    </section>
  )
}

export default CustomForm
