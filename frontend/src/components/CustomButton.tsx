import { CustomButtonProps } from '@/types/components'

export function CustomButton({ method, handleClick, state }: CustomButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`rounded-lg p-2 w-full font-medium hover:bg-indigo-400 duration-300 ${method == state ? "bg-indigo-600" : "bg-slate-800"}`}>
      {method}
    </button>
  )
}

export default CustomButton
