/*
View list of Users Transactions

REQUIRED Paramaters passed through:

loadTransactions
  -> from useTransactions hook. Used to get updated transaction list from DB

isNewTransaction
  -> used to apply a css flash/fade effect on a newly added transition

transactions
  -> from useTransactions hook. List of users Transactions
  
budgets
  -> fron useBudgets hook. List of users Transactions
*/

// Dependencies
import React from 'react'
import { Style } from 'react-style-tag'

// Components
import Transaction from './Transaction'





export default function ViewTransactions({ loadTransactions, isNewTransaction, transactions, budgets, maxCount = false }) {




  return(
    <>
    <Style>
    {`
      .transactions-table {
        width : 100%;
      }

      .transactions-table td {
        min-width : 100px;
        padding : 0.5rem 0.4rem;
      }

      .transactions-table tr:nth-child(2n) {
        background-color : #f4f4f4;
      }

      .transactions-table-head {
        background-color : #f0f0f0;
      }

      .transactions-table input:not([type=submit]) {
        width : 100px;
      }
    `}
    </Style>
    
    <div className='view-transactions my2'>
      <h2 className='my1'>
        { maxCount ? 'Recent' : 'All' } Transactions
      </h2>


      <table className='transactions-table'>

        <thead>
          <tr className='transaction-grid-row transactions-table-head'>

            <td>Date</td>
            <td>Name</td>
            <td>Budget</td>
            <td>Amount</td>
            <td>Action</td>

          </tr>
        </thead>

        <tbody>
          {
            maxCount && 
            transactions.map( (transaction, index) => {
              return(
                <React.Fragment key={ index }>
                { 
                index < maxCount
                  && <Transaction 
                      name={ transaction.name }
                      budget={ transaction.budget }
                      amount={ transaction.amount }
                      date={ transaction.date }
                      transactionId={ transaction.transaction_id }
                      key={ transaction.transaction_id }

                      isNewTransaction = { transaction.transaction_id === isNewTransaction }
                      loadTransactions={ loadTransactions }
                      budgets={ budgets }
                      />

                }
                    
                  </React.Fragment>
                )
              }
            )

          }
          {
            !maxCount &&
            transactions.map( (transaction) => {
              return(
                <Transaction 
                    name={ transaction.name }
                    budget={ transaction.budget }
                    amount={ transaction.amount }
                    date={ transaction.date }
                    transactionId={ transaction.transaction_id }
                    key={ transaction.transaction_id }

                    isNewTransaction = { transaction.transaction_id === isNewTransaction }
                    loadTransactions={ loadTransactions }
                    budgets={ budgets }
                    />
                )
            })
          }
        </tbody>
      </table>

      {
        transactions.length === 0 && 'You dont\'t have any transactions yet'
      }

      </div>
    </>
  )
}