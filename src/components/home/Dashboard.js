import { Style } from 'react-style-tag'

export default function Dashboard() {

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
      <h2>Dashboard</h2>
    
    </div>
    </>
  )
}