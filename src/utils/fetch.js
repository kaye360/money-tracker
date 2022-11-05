
export function postReqOptions(data) {
  
  const postReqOptions = {
    method : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body : JSON.stringify(data)
  }

  return postReqOptions
}
