// 
// Flash Message Component
// Used to send error or success messages to the user in a small modal
// 

// Dependencies
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext } from '../../App'

// Assets
import iconClose from '../../assets/img/icon-close.svg'





export default function Flash() {
  
  // 
  // Get flash
  // 
  const [flash, setFlash] = useContext(FlashContext)
  const { type, message, link, linkText } = flash

  // 
  // Run Flash
  // 
  useEffect( () => {

    const flashTimeout = setTimeout( () => setFlash(false), 5000 )
    return () => { clearTimeout(flashTimeout) }
    
  }, [setFlash])




  
  return(
    <>
    <Style>
    {`

      .flash {
        --animation-duration : 5s;

        position : fixed;
        inset : auto 1rem 1rem auto;
        z-index : 99999;

        padding : 1rem;
        width : 100%;
        max-width : 600px;

        border : 1px solid ${ type === 'success' ? 'var( --clr-success-dark )' : 'var( --clr-error-dark )' };
        background-color : #fff;
        box-shadow : 5px 5px 10px hsl(151, 90%, 4%, 0.2);

        animation : flash var(--animation-duration) ease-in-out both;
      }

      // Timeout Bar
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

      .flash-close-btn {
        position : absolute;
        inset : 50% 1rem auto auto;
        z-index : 99999;
        transform : translateY(-50%);
      }
  
      @keyframes flash {
        from { transform : translateX( calc(100% + 1rem) ); }
        10% { transform : translateX(-25px); }
        15% { transform : translateX(0); }
        80% { opacity : 1; }
        to { opacity : 0; }
      }

      @keyframes flash-after {
        from { width : 0%; }
        80% { width : 100%; }
        to { width : 100%; }
      }


    `}
    </Style>
    
    {
    flash &&
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

        <div className='flash-close-btn'>
          <button onClick={ () => setFlash(false) }>
            <img src={ iconClose }  alt="Close" />
          </button>
        </div>

      </div>
    }
    </>
  )
}