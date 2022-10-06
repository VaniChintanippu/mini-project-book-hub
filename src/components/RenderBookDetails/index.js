import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RenderBookDetails = props => {
  const {bookDetails} = props
  const {
    rating,
    authorName,
    coverPic,
    title,
    readStatus,
    aboutAuthor,
    aboutBook,
  } = bookDetails

  return (
    <div>
      <div className="image-container">
        <img src={coverPic} alt={title} className="picture" />
        <div className="values-container">
          <h1 className="title">{title}</h1>
          <p className="author">{authorName}</p>
          <div className="rating-container">
            <p className="author space">Avg Rating</p>
            <BsFillStarFill className="space star" />
            <p className="author">{rating}</p>
          </div>
          <p className="author">
            Status: <span>{readStatus}</span>
          </p>
        </div>
      </div>
      <hr />
      <h1 className="about-auth">About Author</h1>
      <p className="about-auth-para">{aboutAuthor}</p>
      <h1 className="about-auth">About Book</h1>
      <p className="about-auth-para">{aboutBook}</p>
    </div>
  )
}

export default RenderBookDetails
