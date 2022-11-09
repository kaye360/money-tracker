import { Style } from 'react-style-tag'

export default function Transaction({name, budget, amount, date, isNewTransaction}) {

  return(
    <>
    <Style>
    {`
      .new-transaction {
        animation : new-transaction 1s linear;
      }

      @keyframes new-transaction {
        from {
          background-color : #666;
        }
        to {
          background-color : transparent;
        }
      }
    `}
    </Style>
    
    <div className={ isNewTransaction ? 'new-transaction' : 'transaction' }>
      { 
        `${name} | ${budget} | ${amount} | ${date} || ${isNewTransaction}`
      }
    
    </div>
    </>
  )
}