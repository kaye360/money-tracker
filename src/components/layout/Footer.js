import { Style } from 'react-style-tag'

export default function Footer() {

  return(
    <>
    <Style>
    {`
    footer {
      margin-left : 250px;
      grid-column : 1 / span 2;
      background-color : var(--clr-primary-7);
      color : #eee;
      text-align : center;
    }
    `}
    </Style>
    
    <footer className='py3 text-center'>
      <p>
        Made by <a href="https://joshkaye.ca">Josh</a> with React =) 
      </p>
      <p>
        View the <a href="https://github.com/kaye360/money-tracker">Github Repo</a>
      </p>
    </footer>
    </>
  )
}