import { ContainerPage, ProductsJSON, ApiForm, ProductCard } from "@/components"

function page(): JSX.Element {
  return (
    <ContainerPage>
      <main className='rounded-lg w-full h-auto p-4 bg-slate-700'>
        <ApiForm />
        <ProductsJSON />
        <ProductCard />
      </main>
    </ContainerPage>
  )
}

export default page