import * as usersService from '../../utilities/users-service'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

const handleChange = (evt) => {
    setCredentials({ 
      ...credentials, 
      [evt.target.name]: evt.target.value 
    })
    setError('')
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    try {
      const user = await usersService.login(credentials)
      setUser(user)
    } catch {
      setError('Log In Failed - Try Again')
    }
  }

  return (
    <div>
      <div className='form-container'>
        <form 
          autoComplete='off' 
          onSubmit={handleSubmit}
        >
          <label>Email</label>
          <input 
            type='text' 
            name='email' 
            value={credentials.email} 
            onChange={handleChange} 
            required 
          />
          <label>Password</label>
          <input 
            type='password' 
            name='password' 
            value={credentials.password} 
            onChange={handleChange} 
            required 
          />
          <Button 
            variant='dark' 
            type='submit'
          >
            LOG IN
          </Button>
        </form>
      </div>
      <p className='error-message'>&nbsp;{error}</p>
    </div>
  )
}

export default LoginForm