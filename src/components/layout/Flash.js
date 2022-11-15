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
        inset : 0;
        z-index : 9999;

        display : grid;
        place-items : center;
        background-color : hsla(0, 0%, 0%, 0.678);
        padding : 1rem;

        animation : flash-wrapper 5s ease-in-out both;
      }

      .flash {
        position : relative;
        z-index : 99999;
        padding : 1rem;
        width : 100%;
        max-width : 600px;
        border : 1px solid #333;
        background-color : ${ type === 'success' ? '#C6FCC5' : '#FCC5CF' };

        animation : flash 5s ease-in-out both;
      }

      .flash-close {
        position : absolute;
        inset : 50% 1rem auto auto;
        z-index : 99999;
        transform : translateY(-50%);
      }
  
      @keyframes flash-wrapper {
        from { opacity :0; }
        10% { opacity : 1; }
        80% { opacity  : 1; }
        to { opacity : 0; }
      }

      @keyframes flash {
        from { opacity : 1; }
        75% { opacity : 1; }
        to { opacity : 0; }
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