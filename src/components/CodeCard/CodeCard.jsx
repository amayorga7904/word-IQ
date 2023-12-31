import { CardGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { getUser, getToken } from '../../utilities/users-service'
import { ExpendableText } from '../../pages/HistoryHelper'
import axios from 'axios'

// Define the API endpoint for code history
const CODE_HISTORY_API_URL = '/api/codes/history'

// CodeCard component for displaying code history
const CodeCard = ({ codes, title, updateCodeTitle, handleTitleChange, getCodeHistory }) => {

  // Function to handle the deletion of a code entry
  const handleDelete = async (codeId) => {
    try {
      // Get the current user and token
      const currentCoder = getUser()
      const codeToken = getToken()

      // Make a DELETE request to delete the code entry
      await axios.delete(`${CODE_HISTORY_API_URL}/${currentCoder._id}/${codeId}`, {
        headers: {
          Authorization: `Bearer ${codeToken}`,
        },
      })

      // Refresh code history after deletion
      getCodeHistory()
    } catch (error) {
      console.error('Error deleting code:', error)
    }
  }

  return (
    <CardGroup>
      <Card>
        <Row>
          <Col>
            <h1>Code History</h1>
            {Array.isArray(codes) && codes.length > 0 ? (
              <ul>
                {codes.map((code) => (
                  <Card.Body key={code._id}>
                    <li>
                      <Card.Title>
                        <h3>
                          <input
                            type='text'
                            value={title}
                            onChange={handleTitleChange}
                            placeholder='Change Title'
                          />
                          <Button
                            variant='dark'
                            onClick={() => updateCodeTitle(code._id)}
                          >
                            Save
                          </Button>
                        </h3>
                      </Card.Title>
                      <br />
                      <strong>{code.title}</strong>
                      <br />
                      <br />
                      <ExpendableText maxHeight={95}>
                        <strong>Code:</strong> {code.code}<br />
                      </ExpendableText>
                      <ExpendableText maxHeight={95}>
                        <strong>Explanation:</strong> {code.reply}<br />
                      </ExpendableText>
                      <em>Date: {new Date(code.timestamp).toLocaleString()}</em>
                      <br />
                      <Button
                        variant='dark'
                        onClick={() => handleDelete(code._id)}
                      >
                        Delete
                      </Button>
                      <p>_____________________________</p>
                    </li>
                  </Card.Body>
                ))}
              </ul>
            ) : (
              <p>Your Code will be Seen Here</p>
            )}
          </Col>
        </Row>
      </Card>
    </CardGroup>
  )
}

export default CodeCard
