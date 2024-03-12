import ContainerPage from '@/components/ContainerPage'
import ProductsJSON from '@/components/ProductsJSON'

function page(): JSX.Element {
  return (
    <ContainerPage>
      <div className='rounded-lg w-full h-full p-2 bg-slate-700'>
        <ProductsJSON />
      </div>
    </ContainerPage>
  )
}

export default page