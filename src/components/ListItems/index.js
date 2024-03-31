const ListItems = ({each, answertumb}) => {
  const {imageUrl, thumbnailUrl} = each
  const filter = () => {
    answertumb(imageUrl)
  }
  return (
    <li>
      <button onClick={filter}>
        <img src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}
export default ListItems
