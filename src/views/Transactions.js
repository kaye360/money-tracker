import { Style } from 'react-style-tag'
import { useContext, useEffect } from 'react'
import { FlashContext, UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { addTransaction } from '../model/transactions.model'

export default function Transactions() {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])




  // Get User transactions
  




  // Users Transactions
  // Array of Objects




  // Add Transaction handler
  async function handleAddTransaction(e) {
    e.preventDefault()

    const name = e.target[0].value
    const amount = e.target[1].value
    const budget = e.target[2].value

    try {
      const res = await addTransaction({
        name,
        amount,
        budget,
        userId : user.id
      })

      if (res.error) throw new Error(res.error)
      
    } catch (error) {
      console.log(error)
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }


  return(
    <>
    <Style>
    {`
      .add-transaction label {
        display : block;
      }

      .add-transaction-label {
        display : block;
      }

    `}
    </Style>
    
    <div className="transactions">
      <h1 className="px1">Transactions</h1>

      <div className='add-transaction'>
        <form onSubmit={ handleAddTransaction }>

          <label>
            <span className='add-transaction-label'>Transaction Name</span>
            <input type="text" name="transactionName" />
          </label>

          <label>
            <span className='add-transaction-label'>Transaction Amount</span>
            <input type="text" name="transactionAmount" />
          </label>

          <label>
            <span className='add-transation-label'>Budget</span>
            <select>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label>

          <div>
            <input type="submit" value="Add transaction" />
          </div>

        </form>
      </div>
    </div>
    </>
  )
}