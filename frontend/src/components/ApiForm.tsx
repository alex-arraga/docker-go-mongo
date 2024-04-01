"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { ConfirmToast } from "./CustomToast"

function ApiForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [response, setResponse] = useState<number | null>(null)
  const [method, setMethod] = useState('POST')

  // Inputs data
  const [id, setId] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [brand, setBrand] = useState<string | undefined>('')
  const [cost, setCost] = useState<number | undefined>(0)

  // Toast
  useEffect(() => {
    if (response === 200) {
      toast.success("Operation success - " + method)
      setResponse(null)
    } else if (response === 500) {
      toast.error("Internal server error")
      setResponse(null)
    }
  }, [response, method])

  // Submit form data based on the method (PUT, DELETE, POST)
  const handleSumbit = async (e: FormEvent, product: { id?: string, name?: string, cost?: number, brand?: string }) => {
    try {
      e.preventDefault()

      let urlApi = process.env.NEXT_PUBLIC_API_URL
      let options = {
        method: method,
        body: JSON.stringify(product),
        credential: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }

      const sendingFetch = async (send: boolean) => {
        if (send) {
          const response = await fetch(`${urlApi}/products`, options)
          if (response.ok) {
            setResponse(200)
            formRef.current?.reset()
          }
        }
      }

      if (method == "PUT" || method == "DELETE" && id) {
        urlApi += `/${id}`
        sendingFetch(true)
        setId(undefined)
      }

      if (method == "DELETE" && !id) {
        const userConfirm = await ConfirmToast("¿Confirma que quiere eliminar todos los productos?")
        if (userConfirm) {
          sendingFetch(true)
        }
      }

      if (method == "POST") {
        sendingFetch(true)
      }

    } catch (error) {
      console.log(error)
      setResponse(500)
    }
  }

  return (
    <section className="relative flex flex-col justify-center h-auto w-full md:max-w-md bg-slate-900 border-2 border-blue-300 p-4 rounded-lg">
      <div>
        {/* Tittle */}
        <h1 className="text-base md:text-xl flex justify-center font-semibold mb-6">
          {
            method == "POST" ? "New Product" :
              method == "PUT" ? "Update Product"
                : "Delete Product"
          }
        </h1>

        {/* Buttons */}
        <div className="flex flex-1 gap-4 justify-center items-center text-sm md:text-base">
          <button
            onClick={() => {
              setMethod("POST")
              setId(undefined)
            }}
            className={`rounded-lg p-2 w-full font-medium ${method == "POST" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            POST
          </button>
          <button
            onClick={() => {
              setMethod("PUT")
              setId(undefined)
            }}
            className={`rounded-lg p-2 w-full font-medium ${method == "PUT" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            PUT
          </button>
          <button
            onClick={() => {
              setMethod("DELETE")
              setId(undefined)
            }}
            className={`rounded-lg p-2 w-full font-medium ${method == "DELETE" ? "bg-indigo-400" : "bg-slate-800"}`}
          >
            DELETE
          </button>
        </div>
      </div >

      {/* Form */}
      <div>
        <form
          ref={formRef}
          className="relative flex flex-col justify-center min-h-56 max-h-none h-full w-full"
          onSubmit={(e) => handleSumbit(e, { id, name, cost, brand })}
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
    </section >
  )
}

export default ApiForm
