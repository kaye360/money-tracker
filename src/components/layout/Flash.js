import { Style } from 'react-style-tag'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FlashContext } from '../../App'
import iconClose from '../../assets/img/icon-close.svg'

export default function Flash() {

  const [flash, setFlash] = useContext(FlashContext)
  const { type, message, link, linkText } = flash

  useEffect( () => {
    setTimeout( () => setFlash(false), 5000 )
  }, [setFlash])

  return(
    <>
    <Style>
    {`
      .flash-wrapper {
        position : fixed;
        inset : 0 0 50% 0;
        z-index : 9999;

        display : grid;
        place-items : center;
      }

      .flash {
        --animation-duration : 4s;

        position : relative;
        z-index : 99999;
        padding : 1rem;
        width : 100%;
        max-width : 600px;
        border : 1px solid #aaa;
        background-color : ${ type === 'success' ? 'var(--clr-success-light)' : 'var(--clr-error-light)' };

        animation : flash var(--animation-duration) ease-in-out both;
      }

      .flash::after {
        content : '';
        position : absolute;
        bottom : 0;
        left : 0;

        width : 0%;
        height : 5px;

        background-color : ${ type === 'success' ? 'var(--clr-success-dark)' : 'var(--clr-error-dark)' };

        animation : flash-after var(--animation-duration) linear both;
      }

      .flash-close {
        position : absolute;
        inset : 50% 1rem auto auto;
        z-index : 99999;
        transform : translateY(-50%);
      }
  
      @keyframes flash {
        from { transform : translateY(-1000px); }
        10% { transform : translateY(100px); }
        15% { transform : translateY(0); }
        80% { opacity : 1; }
        to { transform : translateY(0); opacity : 0; }
      }

      @keyframes flash-after {
        from { width : 0%; }
        to { width : 100%; }
      }


    `}
    </Style>
    
    <div className='flash-wrapper'>
      <div className='flash'>
        <p>
          { message }
        </p>

        {
        link && linkText &&
          <p>
            <Link to={ link } > { linkText } k</Link>
          </p>
        }

        <div className='flash-close'>
          <button onClick={ () => setFlash(false) }>
            <img src={ iconClose }  alt="Close" />
          </button>
        </div>

      </div>
    </div>
    </>
  )
}