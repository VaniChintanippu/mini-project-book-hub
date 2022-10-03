import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RenderBookshelfResults = props => {
  const {bookshelfData} = props
  const {id, rating, authorName, coverPic, title, readStatus} = bookshelfData

  return (
    <Link to={`/books/${id}`}>
      <li className="book-result">
        <img src={coverPic} alt={title} />
        <div className="result-values-container">
          <h1 className="title">{title}</h1>
          <p className="author">{authorName}</p>
          <div className="rating-container">
            <p className="author">Avg Rating</p>
            <BsFillStarFill />
            <p className="author">{rating}</p>
          </div>
          <p className="author">Status: {readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default RenderBookshelfResults
