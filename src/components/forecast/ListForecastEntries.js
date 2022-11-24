// 
// Basic Component
// Just makes it easier to copy/paste and have style already set up
// 

// Dependencies
import { Style } from 'react-style-tag'
import { getUpcomingDaysAsWords } from '../../utils/date'




export default function ListForecastEntries({ amountOfDays = 30, forecastEntries }) {

  const days = getUpcomingDaysAsWords({ amountOfDays })


  return(
    <>
    <Style>
    {`
      .forecast-single-day {
        padding : 2rem 0.5rem;
      }

      .forecast-single-day:nth-child(2n) {
        background-color : var(--clr-primary-1);
      }
    `}
    </Style>
    
    <div className='forecast-days-wrapper'>
      {
        days.map( (day) =>{
          
          const forecastOnCurrentDay = forecastEntries.filter( entry => {

            console.log(entry.starting_date)
            
            const entryToDate = new Date(entry.starting_date).toString().split(' ').splice(1,3).join(' ')
            return entryToDate === day && entry

          })

          return (
            <div className='forecast-single-day' key={ day }>
            {day} <br />
            {
            forecastOnCurrentDay && 
              forecastOnCurrentDay.map( entry => {
                return( 
                <div key={entry.forecast_id}>
                  {entry.name}: {entry.amount} {entry.type}
                </div>
              )})
            } <br />

          </div>
          )
        })
      }
    </div>
    </>
  )
}