// 
// Forecast View. Coming Soon
// 

// Dependencies
import { useContext, useEffect } from 'react'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

// Cusomt Hooks
import useForecast from '../utils/useForecast'

// Components
import ListForecastEntries from '../components/forecast/ListForecastEntries'
import AddForecastEntry from '../components/forecast/AddForecastEntry'



export default function Forecast() {

  // 
  // Get contexts/Navigation
  // 
  const [user] = useContext(UserContext)
  const navigate = useNavigate()

  // 
  // Require login for this page
  // 
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])

  // 
  // Load forecast entries from db
  // 
  const { forecastEntries, loadForecastEntries } = useForecast({ userId : user.id })



  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div>
      <h1>Forecast</h1>

      <AddForecastEntry
        loadForecastEntries={ loadForecastEntries }
      />
    
      <ListForecastEntries
        forecastEntries={ forecastEntries }
        loadForecastEntries={ loadForecastEntries }
      />

    </div>
    </>
  )
}