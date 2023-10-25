import { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }

    function validateForm() {
        return email.length > 0 && pass.length > 0 //need to update this to check actual info stored in server
    }

    
    return (
        <div className="auth-form-container">
          <h1>Pantry<span className='ai'>AI</span></h1>
            <form className = "login-form" onSubmit={handleSubmit} autoComplete='off'>
                <p>Login to get started!</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="username" placeholder ="username" id ="username" name="username" autoComplete='off' />
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" autoComplete='off' />
                <button type="submit">Log In</button>
            </form>
            <button > Don't have an account? Register Here. </button>
        </div>
    )
}