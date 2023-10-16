import React, { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }

    function validateForm(){
        return email.length > 0 && pass.length>0 //need to update this to check actual info stored in server
    }

    
    return (
        <div className="auth-form-container">
            <form className = "login-form" onSubmit={handleSubmit}>
                <label for="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder ="youremail@gmail.com" id ="email" name="email" />
                <label for="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button > Don't have an account? Register Here. </button>
        </div>
    )
}