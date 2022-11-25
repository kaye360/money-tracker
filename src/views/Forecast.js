// 
// Forecast View. Coming Soon
// 

// Dependencies
import { useContext } from 'react'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'

// Cusomt Hooks
import useForecast from '../utils/useForecast'

// Components
import ListForecastEntries from '../components/forecast/ListForecastEntries'
import AddForecastEntry from '../components/forecast/AddForecastEntry'



export default function Forecast() {

  const [ user ] = useContext(UserContext)

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
      />

    </div>
    </>
  )
}