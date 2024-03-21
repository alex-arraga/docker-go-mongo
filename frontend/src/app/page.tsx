import { ContainerPage, ProductsJSON, ApiForm, ProductCard, Presentation } from "@/components"

function page(): JSX.Element {
  return (
    <ContainerPage>
      <main className='flex flex-col items-center justify-center rounded-lg w-full'>
        <section className="flex justify-around w-full p-2 gap-4">
          <ApiForm />
          <Presentation />
        </section>

        <section className="flex justify-around items-start p-2 gap-4 w-full h-full">
          <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 h-full min-h-screen max-h-screen overflow-y-auto">
            <ProductsJSON />
          </div>
          <div className="w-full bg-gray-900 rounded-lg p-4 h-full min-h-screen max-h-screen overflow-y-auto">
            <ProductCard />
          </div>
        </section>

      </main>
    </ContainerPage>
  )
}

export default page