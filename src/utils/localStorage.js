// 
// LocalStorgage related functions
// 


//
// Set User Login Session with tokem
//
export function setLoginSession(user) {
  localStorage.setItem('spendlyUser', JSON.stringify(user))
}

// 
// Get User Login Session with tokin
// returns obj { id, name, token }
// 
export function getLoginSession() {
  const user = localStorage.getItem('spendlyUser')
  return user ? JSON.parse(user) : false;
}

//
// Clear user login Session
//
export function endLoginSession() {
  localStorage.removeItem('spendlyUser')
}