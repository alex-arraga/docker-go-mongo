export type ContainerPageProps = {
  type?: string
  children: React.ReactElement
}

export type CustomButtonProps = {
  method: string,
  handleClick: () => void,
  state: string
}

export type CustomFormProps = {
  method: string
}