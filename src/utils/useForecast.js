/*
Use Forecast Custom Hook
Gets list of forecast entries
*/

// Dependencies
import { useEffect, useState } from "react";

// Utils
import { getForecast } from "../model/forecast.model";





export default function useForecast({ userId }) {

  // 
  // Forecast entries state variables
  // 
  const [forecastEntries, setForecastEntries] = useState([])
  const [forecastError, setForecastError] = useState(false)

  // 
  // load forecast entries from db
  // 
  async function loadForecastEntries({ userId}) {
    try {
      
      if(!userId) throw new Error('No user id specified')

      const res = await getForecast({ userId })
      if(res.error) throw new Error(res.error)

      setForecastEntries( res )
      setForecastError(false)

    } catch (error) {
      
      setForecastError(error.message)
    }
  }

  // 
  // Call loadForecastEntries on render
  // 
  useEffect( () => {
    loadForecastEntries({ userId: userId })
  }, [userId])

  // 
  // Return { [forecastEntries], loadForecastEntries(), [forecastError] }
  // 
  return { forecastEntries, loadForecastEntries, forecastError }
}