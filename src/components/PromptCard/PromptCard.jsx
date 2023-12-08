import { CardGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { getUser, getToken } from '../../utilities/users-service' 
import { ExpendableText } from '../../pages/HistoryHelper'
import axios from 'axios'

const HISTORY_API_URL = '/api/openAi/history'

const PromptCard = ({ prompts, promptTitle, handlePromptTitleChange, updatePromptTitle, getHistory }) => {

  const handleDelete = async (promptId) => {
    try {
      const currentUser = getUser()
      const token = getToken()
      await axios.delete(`${HISTORY_API_URL}/${currentUser._id}/${promptId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getHistory()
    } catch (error) {
      console.error('Error deleting code:', error)
    }
  }

  return (
  <CardGroup>
    <Card>
      <Row>
        <Col>
          <h1>Prompt History</h1>
          {Array.isArray(prompts) && prompts.length > 0 ? (
            <ul>
              {prompts.map((prompt) => (
                <Card.Body key={prompt._id}>
                  <li>
                    <Card.Title>
                      <h3>
                        <input
                          type='text'
                          value={promptTitle}
                          onChange={handlePromptTitleChange}
                          placeholder='Change Title'
                        />
                        <Button 
                          variant='dark' 
                          onClick={() => updatePromptTitle(prompt._id)}
                        >
                          Save
                        </Button>
                      </h3>
                    </Card.Title>
                    <br />
                    <strong>{prompt.title}</strong>
                    <br />
                    <br />
                    <ExpendableText maxHeight={95}>
                      <strong>Prompt:</strong> {prompt.prompt}<br />
                    </ExpendableText>
                    <ExpendableText maxHeight={95}>
                      <strong>Response:</strong> {prompt.response}<br />
                    </ExpendableText>
                    <em>Date: {new Date(prompt.timestamp).toLocaleString()}</em>
                    <br />
                    <Button
                      variant='dark'
                      onClick={() => handleDelete(prompt._id)}
                    >
                      Delete
                    </Button>
                    <p>________________________</p>
                  </li>
                </Card.Body>
              ))}
            </ul>
          ) : (
            <p>Your Prompts will be Seen Here</p>
          )}
        </Col>
      </Row>
    </Card>
  </CardGroup>
  )
}

export default PromptCard