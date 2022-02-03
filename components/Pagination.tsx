type Props = {
  currentPage: number
  maxPage: number
  setElement: React.Dispatch<React.SetStateAction<Element | null>>
}

export const Pagination = ({ currentPage, maxPage, setElement }: Props) => {
  return (
    <>
      {currentPage !== maxPage ? (
        <p ref={setElement} className="text-center dark:text-gray-500 py-4">
          Loading...
        </p>
      ) : null}
    </>
  )
}
