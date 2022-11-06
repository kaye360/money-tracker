import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { UserContext } from '../../App'

export default function Dashboard() {

  const user = useContext(UserContext)[0]

  return(
    <>
    <Style>
    {`
      .dashboard {
        min-height : 300px;
        border : 1px solid #eee;
      }
    `}
    </Style>
    
    <div className='dashboard'>
      <h2 className='mb3'>Dashboard</h2>
    
      <p>Welcome { user.name }</p>
    </div>
    </>
  )
}