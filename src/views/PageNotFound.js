import { Style } from 'react-style-tag'

export default function PageNotFound() {

  return(
    <>
    <Style>
    {`
      .page-not-found {
        min-height : 75vh;
      }
    `}
    </Style>
    
    <div className='page-not-found'>
      <h1>404</h1>
    
    </div>
    </>
  )
}