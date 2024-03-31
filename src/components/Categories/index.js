const Categories = ({each, changeList}) => {
  const {tabId, displayText} = each
  const filter = () => {
    changeList(tabId)
  }
  return (
    <li>
      <button onClick={filter}>
        <p>{displayText}</p>
      </button>
    </li>
  )
}
export default Categories
