// 
// Basic Component
// Just makes it easier to copy/paste and have style already set up
// 

// Dependencies
import { Style } from 'react-style-tag'
import { getUpcomingDaysAsWords } from '../../utils/date'




export default function ListForecastEntries({ amountOfDays = 30 }) {

  const days = getUpcomingDaysAsWords({ amountOfDays : amountOfDays })

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
          return (
            <div className='forecast-single-day' key={ day }>
            {day} 
          </div>
          )
        })
      }
    </div>
    </>
  )
}