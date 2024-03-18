import { ContainerPage, ProductsJSON, ApiForm, ProductCard, Presentation } from "@/components"

function page(): JSX.Element {
  return (
    <ContainerPage>
      <main className='flex flex-col items-center justify-center rounded-lg w-full p-4 bg-slate-700'>
        <section className="flex justify-around w-full p-2 gap-6">
          <ApiForm />
          <Presentation />
        </section>

        <section className="flex justify-around items-start p-2 gap-2 mt-2 w-full h-full">
          <div className="w-1/2 bg-gray-900 rounded-lg p-4 min-h-screen">
            <ProductsJSON />
          </div>
          <div className="w-1/2 bg-gray-900 rounded-lg p-4 min-h-screen">
            <ProductCard />
          </div>
        </section>

      </main>
    </ContainerPage>
  )
}

export default page