import { useState } from 'react'

const Login = () => {
    return (
        <form className='login-form'>
            <div className = 'form-control'>
                <label> Username </label>
                <input type = 'text' placeholder = 'Username' />
            </div>
            <div className = 'form-control'>
                <label> Password </label>
                <input type = 'text' placeholder = 'Password' />
            </div>

            <input type='submit' value='Submit' className = 'btn btn-block' />
        </form>
    )
}

export default Login
