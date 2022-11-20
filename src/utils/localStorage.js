

export function setLoginSession(user) {
  localStorage.setItem('spendlyUser', JSON.stringify(user))
}





export function getLoginSession() {
  const user = localStorage.getItem('spendlyUser')
  return user ? JSON.parse(user) : false;
}





export function endLoginSession() {
  localStorage.removeItem('spendlyUser')
}