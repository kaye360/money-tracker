import { Style } from 'react-style-tag'

export default function Footer() {

  return(
    <>
    <Style>
    {`
    footer {
      grid-column : 1 / span 2;
      background-color : #333;
      color : #eee;
      text-align : center;
    }
    `}
    </Style>
    
    <footer>
    <h1>Footer</h1>
    
    </footer>
    </>
  )
}