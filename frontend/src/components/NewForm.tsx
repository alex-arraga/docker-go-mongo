"use client"

import { useEffect, useState } from "react"
import CustomButton from "./CustomButton"
import { CustomForm, MainContainer } from "."

export function NewForm() {
  const [method, setMethod] = useState('POST')

  useEffect(() => { console.log(method) }, [method])

  return (
    <MainContainer>
      <div>
        {/* Dynamics Titles */}
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
          <CustomButton method="POST" handleClick={() => setMethod("POST")} state={method} />
          <CustomButton method="PUT" handleClick={() => setMethod("PUT")} state={method} />
          <CustomButton method="DELETE" handleClick={() => setMethod("DELETE")} state={method} />
        </section>

        {/* Dynamic Form */}
        <section>
          <CustomForm method={method} />
        </section>
      </div>
    </MainContainer>
  )
}

export default NewForm
