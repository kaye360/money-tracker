// 
// Basic Component
// Just makes it easier to copy/paste and have style already set up
// 

// Dependencies
import { Style } from 'react-style-tag'

// Utils
import { generateCalendar, getTodaysEntries} from '../../utils/date'
import ForecastEntry from './ForecastEntry'




export default function ListForecastEntries({ amountOfDays = 30, forecastEntries, loadForecastEntries }) {

  // 
  // Calendar
  // 
  // List of Days as text String. ex: "Nov 09 2022"
  // 
  const calendar = generateCalendar({ amountOfDays })

  

  return(
    <>
    <Style>
    {`
      .forecast-single-day {
        padding : 2rem 0.5rem;
      }

      .forecast-single-day:nth-child(2n-1) {
        background-color : var(--clr-primary-1);
      }

      .forecast-entry-form {
        display : flex;
      }

      .forecast-entry {
        margin-block : 0.5rem;
      }

      .forecast-entry-paycheck {
        color : hsl(119, 90%, 30%);;
      }

      .forecast-entry-bill {
        color : hsl(349, 90%, 50%);
      }

      .forecast-entry-paycheck .forecast-entry-amount::before {
        content : '+';
      }

      .forecast-entry-bill .forecast-entry-amount::before {
        content : '-';
      }

      .forecast-entry-edit {
        margin : 0;
        padding : 0;
        display : none;
      }

      .forecast-entry:hover .forecast-entry-edit {
        display : inline;
      }
    `}
    </Style>
    
    <div className='forecast-days-wrapper'>
      {
        calendar.map( (day) =>{

          const entriesToday = getTodaysEntries({day, forecastEntries})
          
          return (
            <div className='forecast-single-day' key={ day }>
            {day} <br />

            {
            entriesToday.map( entry => {
              return(
                <ForecastEntry 
                  entry={ entry } 
                  loadForecastEntries={ loadForecastEntries }
                />
              )
            })

            }
            

          </div>
          )
        })
      }
    </div>
    </>
  )
}