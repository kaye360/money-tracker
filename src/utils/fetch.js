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
