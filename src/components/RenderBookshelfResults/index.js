import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RenderBookshelfResults = props => {
  const {bookshelfData} = props
  const {id, rating, authorName, coverPic, title, readStatus} = bookshelfData

  return (
    <Link to={`/books/${id}`} className="link-tag">
      <li className="book-result">
        <img src={coverPic} alt={title} className="pic-shelf" />
        <div className="result-values-container">
          <h1 className="title-shelf">{title}</h1>
          <p className="author-shelf">{authorName}</p>
          <div className="rating-container">
            <p className="author-shelf side-space-shelf">Avg Rating</p>
            <BsFillStarFill className="side-space-shelf star-shelf" />
            <p className="author-shelf">{rating}</p>
          </div>
          <p className="author-shelf">
            Status: <span className="span-ele-shelf">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default RenderBookshelfResults
