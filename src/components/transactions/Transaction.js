import { Style } from 'react-style-tag'

export default function Transaction({name, budget, amount, date}) {

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div>
      { 
        `${name} | ${budget} | ${amount} | ${date}`
      }
    
    </div>
    </>
  )
}