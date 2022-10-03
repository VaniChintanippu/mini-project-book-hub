import './index.css'

const BookshelvesList = props => {
  const {bookshelvesDetails, changeShelfLabel} = props
  const {id, label} = bookshelvesDetails
  const onChangeLabel = () => {
    changeShelfLabel(id)
  }
  return (
    <li className="list">
      <button className="shelf-button" type="button" onClick={onChangeLabel}>
        {label}
      </button>
    </li>
  )
}

export default BookshelvesList
