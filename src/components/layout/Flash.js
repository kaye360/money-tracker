import { Style } from 'react-style-tag'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FlashContext } from '../../App'

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
        padding : 1rem;
      }
      .flash {
        padding : 1rem 300px;
        border : 1px solid #333;
        background-color : ${ type === 'success' ? '#C6FCC5' : '#FCC5CF' };
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

      </div>
    </div>
    </>
  )
}