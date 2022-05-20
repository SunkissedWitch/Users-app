// import { useNavigate } from "react-router-dom";
import { HomeButton } from './Buttons/HomeButton'

export const NotFound = () => {
  return(
    <div className='column-orient'>
      <p>
        There is no existing page
      </p>
      <HomeButton color="primary" size="lg" title="Return to home page" />
    </div>
  )
}