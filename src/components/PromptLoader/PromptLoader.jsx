import { Spinner } from 'react-bootstrap'

const PromptLoader = ({ loading, responseContent }) => {
  return (
    <div>
        <h3>Sound Smarter with the Click of a Button!</h3>
        <h6>Ask me How!</h6>
        <br />
        <p>
          {
            loading ? 
            <Spinner 
            animation='grow' 
            /> : 
            responseContent || '( ⌐▨_▨)'
          }
        </p>
    </div>
  )
}

export default PromptLoader