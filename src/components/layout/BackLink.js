// 
// Back Link
// 

// Dependencies
import { Style } from 'react-style-tag'
import { Link } from 'react-router-dom'

import iconBack from '../../assets/img/icon-back-arrow.svg'

export default function BackLink({ path, title }) {

  return(
    <>
    <Style>
    {`
      .BackLink {
        width : fit-content;
        border-bottom : 1px solid #eee;
      }
    `}
    </Style>
    
    <div className='BackLink ml1 py05'>
        <Link to={ `/${path}`} >
          <img src={ iconBack } alt='Back' className='mr05' />
          Back to {title}
        </Link>
      </div>
    </>
  )
}