type Props = {
  refreshAction: () => void,
  setPageLoading: (item: boolean) => void,
  PageLoading: boolean
}
export const UserAdd = ({ refreshAction, setPageLoading, PageLoading }: Props) => {
  return (
    <div>
      Add user
    </div>
  )
}