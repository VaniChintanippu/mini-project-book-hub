import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookshelvesList from '../BookshelvesList'
import RenderBookshelfResults from '../RenderBookshelfResults'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  empty: 'EMPTY',
}

class Bookshelves extends Component {
  state = {
    bookshelvesLabel: 'All',
    bookshelvesValue: 'ALL',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    bookshelfData: [],
  }

  componentDidMount() {
    this.getBookshelfData()
  }

  getBookshelfData = async () => {
    const {bookshelvesValue, searchInput} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelvesValue}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
      }))

      if (updatedData.length !== 0) {
        this.setState({
          apiStatus: apiStatusConstants.success,
          bookshelfData: updatedData,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.empty})
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="Rings" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickTryAgain = () => {
    this.getBookshelfData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661942080/Group_7522_gdsj57.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>

      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderEmptyView = () => {
    const {searchInput} = this.state
    return (
      <div className="empty-view">
        <img
          src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1664709055/Group_jdvley.png"
          alt="no books"
        />
        <p className="empty-para">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {bookshelfData} = this.state

    return (
      <ul className="results-container render-view">
        {bookshelfData.map(book => (
          <RenderBookshelfResults bookshelfData={book} key={book.id} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.empty:
        return this.renderEmptyView()
      default:
        return null
    }
  }

  changeShelfLabel = id => {
    bookshelvesList.map(book =>
      book.id === id
        ? this.setState({
            bookshelvesLabel: book.label,
            bookshelvesValue: book.value,
          })
        : null,
    )
    this.getBookshelfData()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    this.getBookshelfData()
  }

  render() {
    const {bookshelvesLabel, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="bookshelf-bg-container">
        <Header />

        <div className="bookshelf-bottom-container">
          <div className="bookshelf-bottom-container-2">
            <div className="bookshelves-list-container">
              <h1 className="shelf-heading">Bookshelves</h1>
              <ul className="shelves-list-container">
                {bookshelvesList.map(bookshelves => (
                  <BookshelvesList
                    key={bookshelves.id}
                    bookshelvesDetails={bookshelves}
                    changeShelfLabel={this.changeShelfLabel}
                  />
                ))}
              </ul>
            </div>
            <div className="bookshelf-results-container">
              <div className="shelf-heading-search-container">
                <h1 className="results-heading">{bookshelvesLabel} Books</h1>
                <div className="search-container">
                  <input
                    type="search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                  <button
                    type="button"
                    testid="searchButton"
                    onClick={this.onClickSearch}
                    className="search-icon-shelf"
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
              <div className="render-view">{this.renderView()}</div>
            </div>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
