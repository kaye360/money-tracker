//
// Date/Time utility functions 
//

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