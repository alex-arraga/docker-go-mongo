import { CustomButtonProps } from '@/types/HomePage'

export function CustomButton({ method, handleClick }: CustomButtonProps) {
  return (
    <button onClick={handleClick} className="rounded-lg p-2 w-full font-medium hover:bg-indigo-400 duration-300 bg-slate-800">
      {method}
    </button>
  )
}

export default CustomButton
