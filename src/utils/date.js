//
// Date/Time utility functions 
//

import moment from "moment/moment"

//
// Parse Date function
// Data a datetime string and convert it to YYYY-MM or English words
// returns obj { asNumber, asWords }
//
export function parseMonth(month='2022-11') {

  let monthInWords = month
  month = month.split('-').slice(0, 2).join('-')
  
  monthInWords = new Date(monthInWords.split('-').slice(0,2)).toString().split(' ')
  monthInWords = [monthInWords[1], monthInWords[3]].join(' ')

  return { asNumber : month, asWords : monthInWords }
  
}

// 
// Check if a year is a leap year
// 
export function isLeapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

// 
// Generate list of days
// 
// Returns list of days as array
// 
export function generateCalendar ({ amountOfDays = 0 } = {}) {

  const days = []
  const dateStart = moment()
  const dateEnd = moment().add(amountOfDays, 'days')

  while (dateEnd.diff(dateStart, 'days') > 0) {
   days.push(dateStart.format('MMM D YYYY'))
   dateStart.add(1, 'days')
  }

  return days
 }

// 
// Check if 2 dates fall on the same weekday
// 
// return BOOL
// 
export function isSameWeeklyDay({ currentDay, compareDay }) {

  currentDay = moment(currentDay).format('ddd')
  compareDay = moment(compareDay).format('ddd')
  return currentDay === compareDay
}

// 
// Check if date falls on same biweekly week day
// 
// Return BOOL
// 
export function isSameBiweeklyDay({ currentDay, startDay }) {

  const validDates = generateValidBiweeklyDates({ startDay })
  currentDay = moment(currentDay).format('MMM D YYYY')

  return validDates.includes(currentDay)
}

// 
// Generate List of valid BiWeekly dates
// 
// Return array of valid days as text string : ex: "Nov 16 2020"
// 
export function generateValidBiweeklyDates({ startDay }) {

  startDay = moment(startDay)
  let endDay = moment().add(31, 'days')
  let dayRange = startDay.diff(endDay, 'days')
  let validBiweeklyDates = [startDay.format('MMM D YYYY')]

  while (dayRange <= 0) {
    validBiweeklyDates.push( startDay.add(14, 'days').format('MMM D YYYY') )
    dayRange += 14
  } 

  return validBiweeklyDates
}

// 
// Check if date is same monthly day
// 
// compareDay = starting_point day
// 
// Check if bill/pay day = compare day as numbers Ex: (15 = 15)th of month
// Account for months with only 30 
// Account for february
// 
// Return BOOL
// 
export function isSameMonthlyDay({ currentDay, compareDay }) {

  currentDay = moment(currentDay).format('MMM D YYYY')
  compareDay = moment(compareDay).format('MMM D YYYY')
  
  const currentDayAsNumber = parseInt( moment(currentDay).format('D') )
  const currentMonth = moment(currentDay).format('MMM')
  const currentYear = parseInt( moment(currentDay).format('YYYY') )
  const compareDayAsNumber = parseInt( moment(compareDay).format('D') )
  const monthsWith30days = ['Apr', 'Jun', 'Sep', 'Nov']

  if(currentDayAsNumber === compareDayAsNumber) return true

  if( compareDayAsNumber === 31 && // If bill/paycheck is on the 31st
      currentDayAsNumber === 30 && // And we are on the last day (30)
      monthsWith30days.includes(currentMonth) // Of a month with only 30 days
    ) {
    return true
  }

  const lastDayOfFeb = isLeapYear(currentYear) ? 29 : 28

  if(
    currentMonth === 'Feb' && // If we are in feb
    currentDayAsNumber === lastDayOfFeb &&  // And on the last day of feb
    ( (compareDayAsNumber === 30) || (compareDayAsNumber === 31)  ) // And the bill is on the 31st
  ) {
    return true
  }

  return false

}

// 
// Check if bill/pay day is on the 15th or last day of the month
// 
// Account for months with only 30 days and February
// 
// Return BOOL
// 
export function isSameBimonthlyDay({ currentDay }) {

  const monthsWith30days = ['Apr', 'Jun', 'Sep', 'Nov']
  currentDay = moment(currentDay).format('MMM D YYYY')
  const currentMonth = moment(currentDay).format('MMM')
  const currentYear = moment(currentDay).format('YYYY')
  const currentDayAsNumber = parseInt( moment(currentDay).format('D') )

  if(currentDayAsNumber === 15 || currentDayAsNumber === 31) return true

  if( 
    monthsWith30days.includes(currentMonth) &&
    currentDayAsNumber === 30
  ) {
    return true
  }

  const lastDayOfFeb = isLeapYear(currentYear) ? 29 : 28
  
  if(
    currentMonth === 'Feb' &&
    currentDayAsNumber === lastDayOfFeb
  ) {
    return true
  }

  return false
}