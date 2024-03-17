"use client"

import { toast } from 'sonner';

export function ConfirmToast(message: string) {
  return new Promise<boolean>((resolve) => {
    toast(
      <div className='flex flex-col justify-center m-2 gap-6 w-full h-full'>
        <p className='text-sm text-center text-white font-medium w-full px-4'>{message}</p>
        <div className='flex gap-2 h-fit'>
          <button
            className='bg-blue-100 hover:bg-blue-400 active:bg-blue-400 w-full h-fit rounded-md py-2 text-sm font-medium'
            onClick={() => {
              resolve(true)
              toast.dismiss()
            }}>
            Confirmar
          </button>
          <button
            className='bg-red-100 hover:bg-red-400 active:bg-red-400 w-full h-fit rounded-md py-2 text-sm font-medium'
            onClick={() => {
              resolve(false)
              toast.dismiss()
            }}>
            Cancelar
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        style: {
          backgroundColor: '#313357',
          borderColor: '#FFFFFF',
        },
      }
    )
  })
}