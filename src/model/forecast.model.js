// 
// Forecast Model
// All functions that require GET or POST fetches from DB relating to Forecasts
// 

// Config
import { ForecastAPIURL } from "../config/config";

// Utils
import { postReqOptions, getData } from "../utils/fetch";

// 
// Add a Users Forecast Entry
// 
// Return newly added forecast entry
// 
export async function addForecastEntry({ name, amount, type, repeat, date, userId }) {

  if( amount === 0 ) throw new Error('Amount must be greater than zero.')

  if( !name || !amount || !type || !repeat ) {
    throw new Error('Please fill out all fields.')
  }

  return getData({
    url : `${ForecastAPIURL}/add`,
    fetchOptions : postReqOptions({ name, amount, type, repeat, date, userId })
  })
}

// 
// Get Users Forecast Entries
// 
// Return list of users forecast entries as array of obj 
// [{name, amount, type, repeat_amount, starting_date, forecast_id}]
// 
export async function getForecast({ userId }) {

  return getData({
    url : `${ForecastAPIURL}/get/${userId}`
  })

}