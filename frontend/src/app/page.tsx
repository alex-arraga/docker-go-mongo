import { MainContainer, ProductsJSON, ProductCard, Presentation } from "@/components"
import NewForm from "@/components/NewForm"

function page(): JSX.Element {
  return (
    <MainContainer type="page">
      <main className='flex flex-col items-center justify-center rounded-lg w-full'>
        <section className="flex flex-col-reverse md:flex-row justify-around w-full h-full p-2 gap-4">
          <NewForm />
          <Presentation />
        </section>

        <section className="flex flex-col md:flex-row justify-around items-start p-2 gap-4 w-full h-full">
          <div className="w-full md:max-w-md bg-gray-900 rounded-lg p-4 h-full min-h-[calc(25vh)] max-h-[calc(100vh-10rem)] overflow-y-auto">
            <ProductsJSON />
          </div>
          <div className="w-full bg-gray-900 rounded-lg p-4 h-full min-h-[calc(25vh)] max-h-[calc(100vh-10rem)] overflow-y-auto">
            <ProductCard />
          </div>
        </section>

      </main>
    </MainContainer>
  )
}

export default page