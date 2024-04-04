"use client"

import { useEffect, useState } from "react"
import CustomButton from "./CustomButton"
import { MainContainer } from "."

export function NewForm() {
  const [method, setMethod] = useState('POST')

  useEffect(() => { console.log(method) }, [method])

  return (
    <MainContainer>
      <div>
        {/* Dynamics Tittles */}
        <section>
          <h1 className="text-base md:text-xl flex justify-center font-semibold mb-6">
            {
              method == "POST" ? "New Product" :
                method == "PUT" ? "Update Product"
                  : "Delete Product"
            }
          </h1>
        </section>

        {/* Dynamics Buttons */}
        <section className="flex flex-1 gap-4 justify-center items-center text-sm md:text-base">
          <CustomButton method="POST" handleClick={() => setMethod("POST")} />
          <CustomButton method="PUT" handleClick={() => setMethod("PUT")} />
          <CustomButton method="DELETE" handleClick={() => setMethod("DELETE")} />
        </section>
      </div>
    </MainContainer>
  )
}

export default NewForm
