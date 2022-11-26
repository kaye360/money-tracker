// 
// Data Fetching Utility functions 
// 

// 
// Generate second argument to a POST fetch request
// Returns obj{ method, headers, data }
//
export function postReqOptions(data) {
  
  const postReqOptions = {
    method : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body : JSON.stringify(data)
  }

  return postReqOptions
}

// 
// Get data from DB
// 
// Paramters:
// url is required. URL to fetch data from 
// fetchOptions is optional. Used for POST requests.
// 
// Returns JSON data {}
// 
export async function getData({ url, fetchOptions = {} }) {
  
  const res = await fetch(url, fetchOptions)
  if(!res.ok) throw new Error(`Error Fetching Data from ${url}`)

  const resJSON = await res.json()
  if(resJSON.error) throw new Error(resJSON.error)

  return resJSON
}