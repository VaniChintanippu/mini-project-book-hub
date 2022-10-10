import './index.css'

const BookshelvesList = props => {
  const {bookshelvesDetails, changeShelfLabel, activeShelvesId} = props
  const {id, label} = bookshelvesDetails
  const onChangeLabel = () => {
    changeShelfLabel(id)
  }
  const activeClassname =
    activeShelvesId === id ? 'shelf-button active' : 'shelf-button'
  return (
    <li className="list">
      <button className={activeClassname} type="button" onClick={onChangeLabel}>
        {label}
      </button>
    </li>
  )
}

export default BookshelvesList
