import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RenderBookshelfResults = props => {
  const {bookshelfData} = props
  const {id, rating, authorName, coverPic, title, readStatus} = bookshelfData

  return (
    <Link to={`/books/${id}`} className="link-tag">
      <li className="book-result">
        <img src={coverPic} alt={title} className="pic" />
        <div className="result-values-container">
          <h1 className="title">{title}</h1>
          <p className="author">{authorName}</p>
          <div className="rating-container">
            <p className="author side-space">Avg Rating</p>
            <BsFillStarFill className="side-space star" />
            <p className="author">{rating}</p>
          </div>
          <p className="author">
            Status: <span className="span-ele">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default RenderBookshelfResults
