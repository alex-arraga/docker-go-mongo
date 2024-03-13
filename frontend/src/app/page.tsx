import { ContainerPage, ProductsJSON, CustomForm } from "@/components"

function page(): JSX.Element {
  return (
    <ContainerPage>
      <main className='rounded-lg w-full h-auto p-4 bg-slate-700'>
        <CustomForm />
        <ProductsJSON />
      </main>
    </ContainerPage>
  )
}

export default page