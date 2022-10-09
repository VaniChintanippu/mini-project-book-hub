import {
  AiOutlineTwitter,
  AiOutlineGoogle,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

import './index.css'

const Footer = () => (
  <div className="foot-container">
    <div className="icon-container">
      <AiOutlineGoogle className="icon" />
      <AiOutlineTwitter className="icon" />
      <AiOutlineInstagram className="icon" />
      <AiFillYoutube className="icon-youtube" />
    </div>
    <p className="footer">Contact us</p>
  </div>
)

export default Footer
