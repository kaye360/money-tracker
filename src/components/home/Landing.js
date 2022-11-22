// 
// Landing Page Component
// 

// Dependencies
import { Style } from 'react-style-tag'
import { Link } from 'react-router-dom'

// Assets
import heroImg from '../../assets/img/hero-img.png'
import landingBg from '../../assets/img/bg-gradient.svg'
import { bg } from '../../assets/css/css-variables'





export default function Landing() {

  return(
  <>
    <Style>
    {`
      .Landing {
        position : relative;
        z-index : 1;

        width : 100%;
        min-height : 100vh;

        background-image : url(${ landingBg });
        background-size : cover;
        background-repeat : no-repeat;
      }

      .Landing .hero-wrapper {
        position : relative;
        z-index : 50;

        display : grid;
        align-items : center;

        min-height : 500px;

        background-image : url(${ heroImg });
        background-repeat : no-repeat;
        background-position : 90% center;
        background-size : 40%;
      }

      .Landing .hero-content {
        padding-left : 5rem;
      }

      .Landing .hero-content > * {
        margin-block : 2rem;
      }

      .Landing .welcome {
        font-size : 3rem;
      }

      .Landing .subheadline {
        font-weight : 600;
        font-size : 1.5rem;
      }

      .Landing p {
        max-width : 40ch;
        font-size : 1.1rem;
      }

      .Landing .cta-primary,
      .Landing .cta-secondary {
        font-weight : 600;
        font-size : 1.2rem;
        color : #000;
      }

      .Landing .hero-btns .cta-primary  {
        background-color : var(--clr-primary-3);
      }

      .Landing .hero-btns .cta-primary:hover  {
        background-color : var(--clr-secondary-3);
      }

      ${ bg }

    `}
    </Style>
    
    <div className="Landing">

      <div className="hero-wrapper">

        <div className="hero-content">
          <h1 className="welcome">Welcome to <span className="font-brand clr-primary">Spendly</span></h1>

          <div className='subheadline'>
            Managing Money, <br />
            Made Simple.
          </div>

          <p>
            Stay on top of your finances with ease. This simple, intuitive app will do all the work for you.
          </p>

          <div className="hero-btns">
            <Link to="/sign-up">
              <button className='cta-primary'>Sign Up</button>
            </Link>
            <Link to="sign-in">
              <button className='cta-secondary'>Sign In</button>
            </Link>
          </div>
        </div>{/* hero-content */}

      </div>{/* hero-wrapper */}

      <div className='bg-circles'></div>
      <div className='bg-square-dots'></div>
    
    </div>{/* Landing */}
    </>
  )
}