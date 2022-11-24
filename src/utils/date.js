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
// Generate list of days
// 
// Returns list of days as array
// 
export function getUpcomingDaysAsWords ({ amountOfDays = 0 } = {}) {

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
export function isSameWeeklyDay({ currentDay, compareDay }) {

  currentDay = moment(currentDay).format('ddd')
  compareDay = moment(compareDay).format('ddd')
  return currentDay === compareDay
}

// 
// Check if 2 dates fall on same every other weekday
// 
export function isSameBiWeeklyDay({ currentDay, compareDay, startDay }) {
  
  currentDay = moment(currentDay).format('MMM D YYYY')
  compareDay = moment(compareDay).format('MMM D YYYY')
  startDay = moment(startDay)
  let endDay = moment().add(31, 'days')
  let dayRange = startDay.diff(endDay, 'days')

  let compareDayList = [startDay.format('MMM D YYYY')]

  while (dayRange <= 0) {
    compareDayList.push( startDay.add(14, 'days').format('MMM D YYYY') )
    dayRange += 14
  } 

  console.log(compareDayList)

  return compareDayList.find( compareDay => compareDay === currentDay )
}